export interface Seo {
  title?: string
  description?: string
}

export type ButtonColor = 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral'

export interface PageLink {
  label?: string
  to?: string
  color?: ButtonColor
  size?: string
}

export interface HeroImage {
  src: string
  alt: string
}

export interface HeroSection {
  links?: PageLink[]
  images?: HeroImage[]
}

export interface ExperienceItem {
  position: string
  date: string
  company: {
    name: string
    logo: string
    url: string
    color: string
  }
  highlights?: string[]
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface StackCategory {
  label: string
  items: { name: string, icon?: string }[]
  description?: string
}

export interface Testimonial {
  quote: string
  author: {
    name: string
    description: string
    avatar: {
      src: string
      srcset?: string
    }
  }
}

export interface FaqCategory {
  title: string
  questions: FaqQuestion[]
}

export interface FaqQuestion {
  label: string
  content: string
}

export interface PageData {
  seo?: Seo
  title?: string
  description?: string
  hero?: HeroSection
  about?: {
    title: string
    description: string
  }
  services?: ServiceItem[]
  stack?: StackCategory[]
  experience?: {
    title: string
    items: ExperienceItem[]
  }
  testimonials?: Testimonial[]
  blog?: {
    title: string
    description: string
  }
  faq?: {
    title: string
    description: string
    categories: FaqCategory[]
  }
  links?: PageLink[]
  content?: string
  images?: { src: string, alt: string }[]
}

export interface BlogPost {
  title: string
  description: string
  date: string
  image: string
  minRead: number
  author: {
    name: string
    avatar: {
      src: string
      alt: string
    }
  }
  body: string
  path: string
}

export interface ProjectItem {
  title: string
  description: string
  image: string
  url: string
  tags: string[]
  date: string
}

export interface SpeakingEvent {
  title: string
  date: string
  location: string
  url?: string
  category: 'Conference' | 'Live talk' | 'Podcast'
}

export interface SpeakingData {
  seo?: Seo
  title: string
  description: string
  links?: PageLink[]
  events: SpeakingEvent[]
}
