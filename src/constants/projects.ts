import type { Project } from '../types/project'

// Adicione novos cases aqui. Links não confirmados devem permanecer null.
export const projects: Project[] = [
  {
    id: 'andre-dias', name: 'André Dias Studio', category: 'Beleza & cuidado', context: 'Projeto real',
    description: 'Presença digital desenvolvida para um salão, com apresentação de serviços, equipe, galeria e recursos de gerenciamento.',
    image: '/projects/andre-dias-studio.png', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    highlights: ['Responsividade', 'Integração com WhatsApp', 'Painel administrativo', 'Gerenciamento de conteúdo'],
    url: 'https://andre-dias-studio.vercel.app/', github: null, imageWidth: 1899, imageHeight: 909, imagePosition: '50% 0%',
  },
  {
    id: 'aura', name: 'Aura — Estética & Bem-Estar', category: 'Estética & bem-estar', context: 'Projeto demonstrativo',
    description: 'Experiência digital premium criada para demonstrar uma solução profissional para negócios de estética e bem-estar.',
    image: '/projects/aura-estetica.png', technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['UX/UI e microinterações', 'Tratamentos e modal', 'Formulário', 'WhatsApp contextual', 'Acessibilidade e responsividade'],
    url: 'https://aura-estetica-profissional.vercel.app/', github: null, imageWidth: 1903, imageHeight: 911, imagePosition: '50% 0%',
  },
  {
    id: 'bella', name: 'Loja Bella', category: 'Comércio local', context: 'Projeto demonstrativo',
    description: 'Site institucional criado para demonstrar uma solução acessível e profissional para pequenos negócios.',
    image: '/projects/loja-bella.png', technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Layout responsivo', 'Apresentação comercial', 'Produtos em destaque', 'WhatsApp e presença digital'],
    url: 'https://loja-bella-essencial.vercel.app/', github: null, imageWidth: 400, imageHeight: 250, imagePosition: '50% 0%',
  },
  {
    id: 'brasa-73', name: 'BRASA 73 — Burger & Grill', category: 'Hamburgueria', context: 'Projeto demonstrativo',
    description: 'Catálogo digital para hamburgueria com busca, filtros por categoria, personalização de produtos, carrinho persistente e geração estruturada do pedido para WhatsApp.',
    image: '/projects/brasa-73.png', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlights: ['Catálogo digital', 'Busca', 'Filtros por categoria', 'Personalização de produtos', 'Carrinho', 'Persistência local', 'Pedido via WhatsApp', 'Design responsivo'],
    url: 'https://brasa-73.vercel.app/', github: null, imageWidth: 1901, imageHeight: 1077, imagePosition: '50% 0%',
  },
]
