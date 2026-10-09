// Contatos oficiais. URLs dos projetos ficam em projects.ts.
export const site: { name: string; whatsapp: string | null; linkedin: string | null; github: string | null } = {
  name: 'Eugênio Prado',
  whatsapp: '5511999839063', // DDI + DDD + número, somente dígitos.
  linkedin: 'https://www.linkedin.com/in/eug%C3%AAnio-prado-51106728a/', // URL HTTPS completa.
  github: 'https://github.com/eugenioprado-dev', // URL HTTPS completa.
}

export const whatsappUrl = site.whatsapp && /^\d{10,15}$/.test(site.whatsapp)
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá, Eugênio! Vi seu portfólio e gostaria de conversar sobre um projeto.')}`
  : null

export const navigation = [
  ['projetos', 'Projetos'], ['servicos', 'Serviços'], ['tecnologias', 'Tecnologias'],
  ['sobre', 'Sobre'], ['contato', 'Contato'],
] as const
