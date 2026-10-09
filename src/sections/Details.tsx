import { QuoteLink } from '../components/ui/QuoteLink'
import { FiLayout, FiLayers, FiGrid, FiCalendar, FiCode, FiMonitor, FiDatabase, FiTool } from 'react-icons/fi'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services, technologies, steps } from '../constants/content'
const serviceIcons = [FiLayout, FiLayers, FiGrid, FiCalendar, FiCode]
const technologyIcons = [FiMonitor, FiCode, FiDatabase, FiTool]

export function Services() {
  return <section id="servicos" className="section section-surface" tabIndex={-1} aria-label="Serviços"><div className="container">
    <SectionHeading number="02" label="O que posso construir" title="O próximo passo do seu negócio." description="Da primeira presença online a uma solução personalizada. O ponto de partida é entender o que você precisa." />
    <div className="services-grid">{services.map((service, index) => { const Icon = serviceIcons[index]; return <article className="service-card" key={service.title} data-reveal><Icon className="service-icon" aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p><span>{service.detail}</span></article> })}
      <div className="service-cta" data-reveal><p className="eyebrow">Vamos encontrar o caminho</p><h3>Cada negócio tem seu momento.</h3><p>O escopo e o investimento são definidos a partir da sua necessidade.</p><QuoteLink /></div>
    </div>
    <div className="service-pricing" data-reveal><div><p>Projetos a partir de <strong>R$ 600</strong></p><span>O investimento final varia conforme o escopo e as funcionalidades do projeto.</span></div><QuoteLink /></div>
  </div></section>
}
export function Technologies() {
  return <section id="tecnologias" className="section container" tabIndex={-1} aria-label="Tecnologias"><SectionHeading number="03" label="Minha base técnica" title="Boas ideias. Ferramentas certas." description="Tecnologias que fazem parte do meu desenvolvimento e da minha evolução contínua." />
    <div className="technology-grid">{technologies.map((group, index) => { const Icon = technologyIcons[index]; return <article className="technology-group" key={group.title} data-reveal><Icon aria-hidden="true" /><h3>{group.title}</h3><p>{group.subtitle}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article> })}</div>
  </section>
}
export function Process() {
  return <section className="section section-surface" aria-label="Como trabalho"><div className="container"><SectionHeading number="04" label="Como trabalho" title="Clareza em cada etapa." description="Um processo organizado para conectar a sua necessidade à entrega, com espaço para conversar e refinar." />
    <ol className="process-grid">{steps.map(([title, description], index) => <li key={title} data-reveal><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
  </div></section>
}
export function About() {
  return <section id="sobre" className="section container about" tabIndex={-1} aria-labelledby="about-title"><div data-reveal><p className="eyebrow"><span>05 /</span> Por trás do trabalho</p><h2 id="about-title">Tecnologia com propósito.<br /><em>Olhar para pessoas.</em></h2><div className="about-signature">Eugênio Prado<span>Desenvolvedor Web</span></div></div>
    <div className="about-copy" data-reveal><p>Sou Eugênio Prado, estudante de <strong>Análise e Desenvolvimento de Sistemas</strong> e desenvolvedor focado na criação de experiências web modernas e funcionais.</p><p>Desenvolvo projetos front-end utilizando React, TypeScript e Tailwind CSS, além de estudar e desenvolver soluções com C#, .NET e bancos de dados.</p><p>Meu foco é transformar necessidades de negócios em interfaces organizadas, responsivas e fáceis de usar. Aprender continuamente faz parte de como construo e evoluo cada projeto.</p><div className="about-note"><span /> Atenção ao visual. Cuidado com a experiência.</div></div>
  </section>
}
