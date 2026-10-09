import { FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { site, whatsappUrl } from '../constants/site'
import { QuoteLink } from '../components/ui/QuoteLink'

export function Contact() {
  const channels = [
    { label: 'Conversar sobre um projeto', url: whatsappUrl, icon: FaWhatsapp, platform: 'WhatsApp' },
    { label: 'Conectar no LinkedIn', url: site.linkedin, icon: FiLinkedin, platform: 'LinkedIn' },
    { label: 'Ver meus repositórios', url: site.github, icon: FiGithub, platform: 'GitHub' },
  ]
  return <section id="contato" className="container contact-section" tabIndex={-1} aria-labelledby="contact-title">
    <div className="contact-panel" data-reveal>
      <div className="contact-intro">
        <p className="eyebrow"><span>06 /</span> Vamos conversar</p>
        <h2 id="contact-title">Tem um projeto<br /><em>em mente?</em></h2>
        <p className="contact-description">Conte um pouco sobre o que você precisa e vamos conversar sobre a melhor solução para o seu negócio.</p>
        <QuoteLink className="button button-primary contact-quote" />
      </div>
      <div className="contact-channels">
        <span className="availability"><i /> Disponível para novos projetos</span>
        {channels.map(({ label, url, icon: Icon, platform }) => url && <a key={platform} className="contact-link" href={url} target="_blank" rel="noopener noreferrer">
          <Icon aria-hidden="true" /><span>{label}</span><FiArrowUpRight aria-hidden="true" />
          <span className="sr-only"> — {platform} (abre em nova aba)</span>
        </a>)}
      </div>
    </div>
  </section>
}
