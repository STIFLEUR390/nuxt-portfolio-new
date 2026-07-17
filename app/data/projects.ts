import type { PageData, ProjectItem } from '~/data/types'

export const projectsPage: PageData = {
  seo: {
    title: 'Projects',
    description: 'I\'ve worked on a variety of projects, focusing on creating intuitive digital experiences where thoughtful design meets clean code.'
  },
  title: 'Designing Interfaces, Building Experiences.',
  description: 'I\'ve worked on a variety of projects, focusing on creating intuitive digital experiences where thoughtful design meets clean code. Here are some highlights I\'m proud of, showcasing my process from concept to execution.',
  links: [
    { label: 'Let\'s talk', color: 'neutral' },
    { label: 'Email me' }
  ]
}

export const projects: ProjectItem[] = [
  {
    title: 'Bloom Finance App Redesign',
    description: 'Led the complete UX/UI overhaul and front-end implementation for a personal finance platform, focusing on data visualization clarity and improving user onboarding flow. Resulted in a 32% increase in user retention.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['UX Design', 'UI Design'],
    date: '2024'
  },
  {
    title: 'EcoTrack Sustainability App',
    description: 'Created a mobile-first application to help users track and reduce their environmental impact. Translated complex sustainability metrics into an accessible and motivating user interface.',
    image: 'https://images.unsplash.com/photo-1613858749733-3a3e456e3d9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: '#',
    tags: ['UX Research', 'UI Design', 'Mobile App'],
    date: '2023'
  },
  {
    title: 'Internal Developer Hub (Nuxt Team)',
    description: 'Designed and built key components for an internal documentation and tooling hub for Nuxt developers, focusing on improving developer experience and streamlining access to resources.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['Developer Tools', 'UX Design', 'Nuxt', 'Design System', 'Internal Tools'],
    date: '2024'
  },
  {
    title: 'Wavelength Music Streaming Service',
    description: 'Designed and developed the user interface for an indie music streaming service, focusing on discovery features and creating a unique, engaging listening experience using custom audio visualizations.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    url: '#',
    tags: ['UI Design', 'Front-End Dev', 'Animation'],
    date: '2023'
  }
]
