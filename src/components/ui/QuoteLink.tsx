import type { MouseEventHandler } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { whatsappUrl } from '../../constants/site'

export function QuoteLink({ className = 'text-link', onClick }: { className?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return <a className={className} href={whatsappUrl ?? '#contato'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined} onClick={onClick}>
    Solicitar orçamento <FiArrowUpRight aria-hidden="true" />
    {whatsappUrl && <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>}
  </a>
}
