import { Header } from './components/layout/Header'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Services, Technologies, Process, About } from './sections/Details'
import { Contact } from './sections/Contact'
import { useReveal } from './hooks/useReveal'
import { site, whatsappUrl } from './constants/site'
import { FiArrowUp, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const currentYear = new Date().getFullYear()

export default function App() {
  useReveal()
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" tabIndex={-1}>
      <Hero /><Projects /><Services /><Technologies /><Process /><About /><Contact />
    </main>
    <footer className="container footer">
      <a className="brand" href="#inicio">ep<span>.</span><span className="brand-name">{site.name}</span></a>
      <p>© {currentYear} · Feito com intenção, do início ao fim.</p>
      <div className="footer-socials">{site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (abre em nova aba)"><FiLinkedin aria-hidden="true" /></a>}{site.github && <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (abre em nova aba)"><FiGithub aria-hidden="true" /></a>}</div>
      <a className="back-top" href="#inicio">Voltar ao topo <FiArrowUp aria-hidden="true" /></a>
    </footer>
    {whatsappUrl && <a className="floating-contact" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp (abre em nova aba)"><FaWhatsapp /></a>}
  </>
}
