import type { Project } from '../types/project'

// Adicione novos cases aqui. Links não confirmados devem permanecer null.
export const projects: Project[] = [
  {
    id: 'patas-e-cia', name: 'Patas & Cia', category: 'Pet Shop / Sistema de Agendamento', context: 'Projeto demonstrativo',
    description: 'Plataforma completa para pet shop com agendamento online e painel administrativo.',
    image: '/projects/patas-e-cia.png', technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel'],
    imageWidth: 1904, imageHeight: 1079, imagePosition: '50% 0%',
    highlights: ['Agendamento em múltiplas etapas', 'Validação de conflitos de horário', 'Painel administrativo', 'Gestão de serviços e profissionais', 'Responsividade', 'Acessibilidade básica'],
    url: 'https://patas-e-cia-azure.vercel.app/', github: null,
    details: {
      problem: 'Pequenos pet shops muitas vezes dependem exclusivamente de WhatsApp para organizar horários, serviços e profissionais, dificultando o controle da agenda e aumentando o risco de conflitos.',
      solution: 'Foi desenvolvida uma aplicação web completa que permite ao cliente realizar o agendamento de forma guiada e oferece ao estabelecimento um painel administrativo para acompanhar e gerenciar a operação.',
      features: ['Fluxo de agendamento em múltiplas etapas', 'Seleção de serviço', 'Seleção de profissional', 'Seleção de data e horário', 'Cadastro de dados do tutor', 'Cadastro do pet', 'Revisão antes da confirmação', 'Validação de conflitos de horário', 'Painel administrativo protegido', 'Listagem e gerenciamento de agendamentos', 'Alteração de status', 'Gestão de serviços', 'Gestão de profissionais', 'Relacionamento entre profissionais e serviços', 'Histórico preservado', 'Responsividade', 'Acessibilidade básica'],
      security: ['Supabase', 'Autenticação administrativa', 'Row Level Security', 'RPCs protegidas', 'Separação entre acesso público e administrativo', 'Agendamentos protegidos contra leitura pública', 'Catálogo público somente para leitura', 'Funções administrativas restritas a usuários autenticados com role admin'],
      deployment: 'Vercel',
      result: 'Uma solução full-stack voltada para pequenos negócios que demonstra como digitalizar o processo de agendamento, reduzir dependência de atendimento manual e centralizar a gestão operacional.',
    },
  },
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

projects.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
