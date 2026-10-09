import { useState } from 'react'
import { FiArrowUpRight, FiImage, FiGithub } from 'react-icons/fi'
import { projects } from '../constants/projects'
import type { Project } from '../types/project'
import { SectionHeading } from '../components/ui/SectionHeading'

function ProjectImage({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)
  return <div className="project-image">
    <div className="image-toolbar" aria-hidden="true"><span /><span /><span /><i>{project.name}</i></div>
    <div className="image-viewport">
      {failed
        ? <div className="image-unavailable"><FiImage aria-hidden="true" /><span>Prévia visual indisponível</span><small>{project.name}</small></div>
        : <img src={project.image} alt={`Página inicial do site ${project.name}`} loading="lazy" decoding="async"
            width={project.imageWidth} height={project.imageHeight} style={{ objectPosition: project.imagePosition ?? '50% 0%' }}
            onError={() => setFailed(true)} />}
    </div>
  </div>
}

export function Projects() {
  return <section id="projetos" className="section container" tabIndex={-1} aria-label="Projetos em destaque">
    <SectionHeading number="01" label="Trabalhos selecionados" title="Ideias que ganharam forma." description="Um olhar sobre como design e desenvolvimento se encontram em soluções para negócios." />
    <div className="projects-list">{projects.map((project, index) => <article className="project" key={project.id} data-reveal>
      {project.url
        ? <a className="project-preview" href={project.url} target="_blank" rel="noopener noreferrer"
            aria-label={`Ver ${project.name} ao vivo (abre em nova aba)`}>
            <ProjectImage project={project} />
            <span className="project-live">Ver projeto ao vivo <FiArrowUpRight aria-hidden="true" /></span>
          </a>
        : <div className="project-preview"><ProjectImage project={project} /></div>}
      <div className="project-content">
        <div className="project-meta"><span className="project-number">0{index + 1}</span><span className={project.context === 'Projeto real' ? 'context context-real' : 'context'}>{project.context}</span></div>
        <p className="eyebrow project-category">{project.category}</p>
        <h3>{project.name}</h3><p className="project-description">{project.description}</p>
        <ul className="highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
        <ul className="tags" aria-label="Tecnologias do projeto">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
        {project.github && <div className="project-links"><a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link"><FiGithub aria-hidden="true" /> {project.id === 'brasa-73' ? <>Ver código no GitHub<span className="sr-only"> (nova aba)</span></> : <>Código<span className="sr-only"> no GitHub (nova aba)</span></>}</a></div>}
      </div>
    </article>)}</div>
  </section>
}
