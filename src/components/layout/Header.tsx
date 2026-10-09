import { QuoteLink } from '../ui/QuoteLink'
import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { navigation } from '../../constants/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id === 'inicio' ? '' : entry.target.id)
    }), { rootMargin: '-15% 0px -65% 0px' })
    const observedSections = [['inicio'], ...navigation]
    observedSections.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    const media = window.matchMedia('(min-width: 1024px)')
    const resize = () => { if (media.matches) setOpen(false) }
    media.addEventListener('change', resize)
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); media.removeEventListener('change', resize) }
  }, [])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const regions = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.floating-contact')]
    regions.forEach(region => region?.setAttribute('inert', ''))
    panel.current?.querySelector('a')?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const links = panel.current?.querySelectorAll<HTMLAnchorElement>('a')
        const last = links?.[links.length - 1]
        if (event.shiftKey && document.activeElement === toggle.current) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.current?.focus() }
      }
    }
    document.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = previous; regions.forEach(region => region?.removeAttribute('inert')); document.removeEventListener('keydown', keydown) }
  }, [open])
  function navigate(id: string) {
    setOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }
  return <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container nav-wrap">
      <a href="#inicio" className="brand" aria-label="Eugênio Prado, início" tabIndex={open ? -1 : undefined}>ep<span>.</span><span className="brand-name">Eugênio Prado</span></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      <div ref={panel} id="navigation" className={`nav-panel ${open ? 'is-open' : ''}`}>
        <nav aria-label="Navegação principal">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => navigate(id)}>{label}</a>)}</nav>
        <QuoteLink className="button button-small button-outline" onClick={() => { setOpen(false); toggle.current?.focus() }} />
      </div>
    </div>
  </header>
}
