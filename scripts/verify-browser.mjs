import { spawn } from 'node:child_process'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const executable = process.env.BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const profile = await mkdtemp(join(tmpdir(), 'portfolio-browser-'))
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true })
let socket
try {
  const endpoint = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Chrome startup timed out')), 15000)
    browser.once('error', reject)
    browser.stderr.on('data', chunk => {
      const match = chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/)
      if (match) { clearTimeout(timeout); resolve(match[1]) }
    })
  })
  socket = new WebSocket(endpoint)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let nextId = 1
  const pending = new Map()
  const errors = []
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    if (message.id) {
      const handler = pending.get(message.id)
      if (handler) {
        pending.delete(message.id)
        if (message.error) handler.reject(new Error(JSON.stringify(message.error)))
        else handler.resolve(message.result)
      }
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails)
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry)
  }
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = nextId++
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)) }, 15000)
    pending.set(id, { resolve: result => { clearTimeout(timeout); resolve(result) }, reject: error => { clearTimeout(timeout); reject(error) } })
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  const command = (method, params) => send(method, params, sessionId)
  await command('Page.enable')
  await command('Runtime.enable')
  await command('Log.enable')
  const evaluate = async expression => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  const results = []
  for (const width of [320, 375, 425, 768, 1024, 1440]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
    await command('Page.navigate', { url: process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/' })
    await evaluate(`new Promise(resolve => {
      const timer = setInterval(() => { if (document.querySelector('#contato')) { clearInterval(timer); resolve(true) } }, 50)
    })`)
    const report = await evaluate(`(async () => {
      const sections = [...document.querySelectorAll('main section')]
      for (const section of sections) { section.scrollIntoView(); await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))) }
      await Promise.all([...document.querySelectorAll('.project-image img')].map(img => img.decode().catch(() => {})))
      window.scrollTo(0, 0)
      const overflow = [...document.querySelectorAll('body *')].filter(el => {
        if (!el.getClientRects().length || el.classList.contains('skip-link')) return false
        const r = el.getBoundingClientRect()
        return r.right > innerWidth + 1 || r.left < -1
      }).map(el => el.className || el.tagName)
      const brokenAnchors = [...document.querySelectorAll('a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#' || (a.hash && a.origin === location.origin && !document.getElementById(a.hash.slice(1)))).map(a => a.outerHTML)
      const externalLinks = [...document.querySelectorAll('a[href^="https:"]')]
      const invalidExternalLinks = externalLinks.filter(a => a.target !== '_blank' || !a.rel.includes('noopener') || !a.rel.includes('noreferrer')).length
      const whatsappLinks = externalLinks.filter(a => new URL(a.href).hostname === 'wa.me')
      const whatsappValid = whatsappLinks.length >= 5 && whatsappLinks.every(a => {
        const url = new URL(a.href)
        return url.pathname === '/5511999839063' && url.searchParams.get('text') === 'Ol\u00e1, Eug\u00eanio! Vi seu portf\u00f3lio e gostaria de conversar sobre um projeto.'
      })
      const images = [...document.querySelectorAll('.project-image img')].map(img => ({ loaded: img.complete && img.naturalWidth > 0, width: img.naturalWidth, height: img.naturalHeight }))
      const reducedMotion = [...document.querySelectorAll('.orbital, .hero-copy, .hero-art')].every(el => getComputedStyle(el).animationName === 'none')
      const projectLinks = document.querySelectorAll('.project-preview[href]').length
      const projectKeyboard = [...document.querySelectorAll('.project-preview[href]')].every(a => { a.focus({ preventScroll: true }); return document.activeElement === a && getComputedStyle(a).outlineStyle !== 'none' })
      return { invalidExternalLinks, whatsappValid, reducedMotion, images, projectLinks, projectKeyboard, width: innerWidth, pageWidth: document.documentElement.scrollWidth, overflow, brokenAnchors, h1: document.querySelectorAll('h1').length, demos: [...document.querySelectorAll('.context')].filter(el => el.textContent === 'Projeto demonstrativo').length, missingImages: document.querySelectorAll('.image-unavailable').length }
    })()`)
    if (width < 1024) {
      await evaluate(`document.querySelector('.menu-toggle').click()`)
      await evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`)
      report.menuOpen = await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true' && document.body.style.overflow === 'hidden' && document.querySelector('main').inert && document.activeElement === document.querySelector('nav a')`)
      await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      await evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`)
      report.escape = await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false' && document.body.style.overflow !== 'hidden' && document.activeElement === document.querySelector('.menu-toggle')`)
      await evaluate(`document.querySelector('.menu-toggle').click()`)
      await evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`)
      await evaluate(`document.querySelector('nav a[href="#servicos"]').click()`)
      await evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`)
      report.navigation = await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false' && !document.querySelector('main').inert && document.activeElement.id === 'servicos'`)
    }
    await evaluate('window.scrollTo(0, 0)')
    if (width === 375 || width === 1440) {
      const screenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
      const path = join(profile, `portfolio-${width}.png`)
      await writeFile(path, Buffer.from(screenshot.data, 'base64'))
      report.screenshot = path
      const clip = await evaluate("(() => { const r = document.querySelector('.project').getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height, scale: 1 } })()")
      const detail = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip })
      const detailPath = join(profile, `project-${width}.png`)
      await writeFile(detailPath, Buffer.from(detail.data, 'base64'))
      report.projectScreenshot = detailPath
    }
    results.push(report)
  }
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
  await command('Page.navigate', { url: process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/' })
  await evaluate(`new Promise(resolve => { const timer = setInterval(() => { if(document.querySelector('#contato')) { clearInterval(timer); resolve(true) } }, 50) })`)
  const reveal = await evaluate(`(async () => {
    for (const el of document.querySelectorAll('[data-reveal]')) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' })
      await new Promise(resolve => setTimeout(resolve, 70))
    }
    return document.querySelectorAll('.reveal-pending').length
  })()`)
  console.log(JSON.stringify({ results, runtimeErrors: errors, unrevealedAfterScroll: reveal }, null, 2))
  const failed = errors.length || reveal || results.some(r => r.invalidExternalLinks || !r.whatsappValid || !r.reducedMotion || !r.projectKeyboard || r.projectLinks !== 4 || r.images.length !== 4 || r.images.some(img => !img.loaded) || r.missingImages || r.overflow.length || r.brokenAnchors.length || r.h1 !== 1 || r.demos !== 3 || r.pageWidth > r.width || r.menuOpen === false || r.escape === false || r.navigation === false)
  if (failed) process.exitCode = 1
  await send('Browser.close')
} finally {
  socket?.close()
  browser.kill()
}
