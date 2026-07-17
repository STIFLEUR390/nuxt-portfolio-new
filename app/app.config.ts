export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1480&auto=format&fit=crop',
      light: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1480&auto=format&fit=crop',
      alt: 'Hérold H. - Full-Stack Developer'
    },
    meetingLink: 'https://cal.com/herold',
    email: 'herold@example.com',
    cvUrl: '/cv-herold-dev.pdf',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} Hérold H. · Full-Stack Developer`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/heroldev',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://linkedin.com/in/heroldev',
      'target': '_blank',
      'aria-label': 'LinkedIn'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/heroldev',
      'target': '_blank',
      'aria-label': 'X (Twitter)'
    }]
  }
})
