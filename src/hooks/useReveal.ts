import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches || !('IntersectionObserver' in window)) return
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.06 })
    elements.forEach(element => { element.classList.add('reveal-pending'); observer.observe(element) })
    const revealAll = () => elements.forEach(element => element.classList.remove('reveal-pending'))
    query.addEventListener('change', revealAll)
    return () => { observer.disconnect(); revealAll(); query.removeEventListener('change', revealAll) }
  }, [])
}
