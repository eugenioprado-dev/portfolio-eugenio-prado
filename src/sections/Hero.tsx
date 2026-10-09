import { QuoteLink } from '../components/ui/QuoteLink'
import { FiArrowDown } from 'react-icons/fi'

export function Hero() {
  return <section id="inicio" className="hero container" tabIndex={-1} aria-labelledby="hero-title">
    <div className="hero-top"><p className="eyebrow">Eugênio Prado <span>/ Desenvolvedor Web</span></p><span className="availability"><i /> Disponível para novos projetos</span></div>
    <div className="hero-content">
      <div className="hero-copy"><h1 id="hero-title">Transformo ideias em <em>experiências digitais.</em></h1>
        <p className="hero-description">Desenvolvo sites modernos, responsivos e pensados para ajudar negócios a construírem uma presença profissional na internet.</p>
        <div className="actions"><a className="button button-primary" href="#projetos">Ver projetos <FiArrowDown aria-hidden="true" /></a><QuoteLink className="button button-outline" /></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="art-cross cross-one">+</div><div className="art-cross cross-two">+</div><div className="monogram">ep<span>.</span></div><span className="art-caption">IDEIA → EXPERIÊNCIA</span><span className="art-coordinate">DESIGN + DESENVOLVIMENTO</span></div>
    </div>
    <div className="hero-bottom"><span>Estratégia no conceito. Cuidado em cada detalhe.</span><a href="#projetos">Explore o trabalho <FiArrowDown aria-hidden="true" /></a></div>
  </section>
}
