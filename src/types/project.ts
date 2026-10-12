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
  details?: {
    problem: string
    solution: string
    features: string[]
    security: string[]
    deployment: string
    result: string
  }
}
