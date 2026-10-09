export interface Project {
  id: string
  name: string
  category: string
  context: 'Projeto real' | 'Projeto demonstrativo'
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  imagePosition?: string
  technologies: string[]
  highlights: string[]
  url: string | null
  github: string | null
}
