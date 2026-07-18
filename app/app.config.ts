export default defineAppConfig({
  global: {
    picture: {
      src: '/profile.png',
      alt: 'Franck Hérold TAMTO TAMKO - Full-Stack Developer'
    },
    meetingLink: 'https://cal.com/heroldtamko',
    email: 'heroldtamko39@gmail.com',
    cvUrl: '/cv.pdf',
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
    },
    pageSection: {
      slots: {
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
      }
    },
    toast: {
      defaultVariants: {
        color: 'neutral'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} Franck Hérold TAMTO TAMKO · Full-Stack Developer`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/STIFLEUR390',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://linkedin.com/in/heroldtamko',
      'target': '_blank',
      'aria-label': 'LinkedIn'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/STIFLEUR390',
      'target': '_blank',
      'aria-label': 'X (Twitter)'
    }]
  }
})
