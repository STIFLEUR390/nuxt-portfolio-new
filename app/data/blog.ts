import type { BlogPost } from '~/data/types'

const _posts: BlogPost[] = [
  {
    title: 'From Mockup to Market: My End-to-End Product Design Process',
    description: 'A detailed breakdown of my iterative design methodology, from initial research to final handoff, with practical tips for designers at every stage.',
    date: '2025-04-23',
    image: 'https://images.pexels.com/photos/1050312/pexels-photo-1050312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    minRead: 8,
    author: {
      name: 'Emma Thompson',
      avatar: {
        src: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Emma Thompson'
      }
    },
    body: `Creating successful digital products isn't about following a rigid formula—it's about developing a flexible framework that adapts to the unique challenges of each project. After refining my approach across dozens of products, I've developed a process that consistently delivers results while leaving room for creativity and iteration.

In this article, I'll walk through my end-to-end design process, from initial discovery to developer handoff, using my recent work on the EcoTrack application as a case study.

## Phase 1: Discovery & Research

Every great product starts with understanding the problem it's trying to solve. For EcoTrack, our challenge was creating an engaging way for users to track their environmental impact without feeling overwhelmed by guilt or complex data.

### User Interviews

I began by conducting interviews with 12 potential users across different demographics, focusing on their current habits and attitudes toward sustainability. These conversations revealed a crucial insight: most people wanted to make environmentally friendly choices but felt paralyzed by the complexity of calculating their impact.

> "I care about the environment, but I have no idea if using a paper bag is actually better than plastic, or if my reusable water bottle makes any difference." — Interview participant

### Competitive Analysis

Next, I analyzed existing sustainability apps, creating a feature comparison matrix to identify gaps and opportunities. Most competitors focused on carbon footprint calculations but failed to provide actionable guidance or positive reinforcement.

### Defining Success

Before opening Figma, I collaborated with stakeholders to define clear success metrics:

- Increase daily active usage by 40%
- Improve user-reported understanding of environmental impact
- Drive measurable behavior changes in at least two sustainability categories

## Phase 2: Ideation & Conceptualization

With a solid understanding of the problem space, I moved into the creative phase of the process.

### Sketching

I always start with pen and paper, rapidly exploring different approaches without the constraints of digital tools. For EcoTrack, I filled three sketchbooks with concepts ranging from gamified experiences to data-heavy dashboards.

### Information Architecture

Based on research insights, I developed a user-centered information architecture that prioritized simplicity and actionable information:

1. **Dashboard** — Personalized overview with immediate impact insights
2. **Daily Tracker** — Simple logging of activities with immediate feedback
3. **Impact Journey** — Visualization of progress over time
4. **Action Center** — Customized recommendations based on user behavior

### Design Principles

I established four core design principles to guide all decisions:

- **Simplify complexity** — Translate environmental impact into understandable units
- **Celebrate progress** — Focus on positive reinforcement rather than guilt
- **Enable informed choices** — Provide context for decision-making
- **Design for habit formation** — Create satisfying interaction loops

## Phase 3: Prototyping & Testing

With the conceptual framework in place, I moved into the iterative cycle of prototyping and testing.

### Low-Fidelity Wireframes

I created wireframes focusing on user flows and information hierarchy, deliberately keeping the visual design minimal to focus feedback on functionality and structure.

### User Testing (Round 1)

Testing wireframes with 8 participants revealed several key insights:

- Users wanted more immediate feedback when logging activities
- The impact visualization wasn't intuitive for most users
- People were confused by technical environmental terminology

### Mid-Fidelity Prototypes

Based on testing feedback, I refined the concept and developed interactive prototypes with more visual detail, focusing on:

- Simplified data visualization using familiar metaphors
- Immediate positive reinforcement for logged activities
- Progressive disclosure of more complex environmental information

### User Testing (Round 2)

A second round of testing showed significant improvements in usability, but highlighted new challenges:

- Users wanted to compare their impact with friends or community averages
- Weekly summaries were more motivating than daily statistics
- The onboarding process felt too lengthy

## Phase 4: Visual Design & Refinement

With the core experience validated, I moved into high-fidelity visual design.

### Visual Language

I developed a visual language that balanced approachability with credibility:

- A nature-inspired color palette with clear functional color coding
- Custom iconography that simplified complex concepts
- Typography that prioritized readability across devices
- Micro-interactions that provided satisfaction and reinforcement

### Design System

To ensure consistency and facilitate development, I created a comprehensive design system including:

- Component library with documented states and behaviors
- Responsive layout guidelines
- Animation specifications
- Accessibility standards

### Final Prototype

The final prototype brought together all elements into a cohesive experience, which we tested with a broader user group before moving to development.

## Phase 5: Implementation & Iteration

The design process doesn't end when development begins—it evolves.

### Developer Collaboration

I worked closely with developers throughout implementation, participating in code reviews and adjusting designs to address technical constraints while preserving the core experience.

### Analytics Implementation

We integrated analytics to track our success metrics, setting up dashboards to monitor key interactions and user journeys.

### Post-Launch Iteration

After launch, we established a regular cycle of analysis and iteration:

- Weekly reviews of user feedback and behavior data
- Bi-weekly design sprints to address emerging issues
- Monthly feature planning based on usage patterns

## Results & Learnings

Six months after launch, EcoTrack has exceeded our initial success metrics:

- 52% increase in daily active usage
- 78% of users report better understanding of their environmental impact
- Average user has adopted 3.4 new sustainable habits

The most valuable lesson from this project was the importance of making abstract concepts tangible. By translating complex environmental data into personal, actionable insights, we created an experience that not only educated users but empowered them to make meaningful changes.

## Conclusion

Effective product design is never a linear journey—it's a continuous cycle of learning and refinement. By staying focused on user needs while maintaining a flexible approach to problem-solving, we can create products that not only meet business objectives but genuinely improve people's lives.

I'd love to hear about your own design process and how you approach similar challenges. Feel free to reach out with questions or share your experiences in the comments below.`,
    path: '/blog/from-mockup-to-market'
  },
  {
    title: 'The Psychology of Color in UI Design',
    description: 'Exploring how strategic color choices can influence user behavior, evoke emotions, and enhance the overall user experience of digital products.',
    date: '2025-03-15',
    image: 'https://images.pexels.com/photos/40799/paper-colorful-color-loose-40799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    minRead: 5,
    author: {
      name: 'Emma Thompson',
      avatar: {
        src: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Emma Thompson'
      }
    },
    body: `Color is one of the most powerful tools in my design arsenal, yet I find it's often reduced to mere aesthetics or brand guidelines. After conducting a series of A/B tests for the Wavelength music app redesign, I've gathered some fascinating insights about how color psychology directly impacts user behavior.

## The Science Behind Color Perception

Our brains process color before we even consciously register what we're looking at. Studies show that people make a subconscious judgment about a product within 90 seconds of viewing it, and up to 90% of that assessment is based on color alone.

This isn't just marketing hype—it's grounded in evolutionary biology. Our ancestors needed to quickly distinguish between ripe and unripe fruit, safe and dangerous environments, and friendly and hostile faces. Today, those same neural pathways activate when we encounter color in digital interfaces.

## Color Associations Across Cultures

While some color associations are nearly universal (blue = calm/trust), others vary significantly by culture. When designing for a global audience, understanding these differences is crucial.

**Blue** consistently ranks as the most popular color globally and is associated with trust, stability, and professionalism. It's no coincidence that Facebook, Twitter/X, LinkedIn, and countless banks use blue as their primary color.

**Green** universally connects to nature, growth, and environmental themes. However, its financial associations are strong in Western cultures (think "green light" = go, money) while in some Middle Eastern contexts, green carries profound religious significance.

**Red** triggers the most complex responses. In Western contexts, it can signal danger, urgency, or passion—which is why it works well for sale announcements and error states. In Eastern cultures, particularly China, red symbolizes luck, prosperity, and celebration.

## Applying Color Psychology in UI Design

### Establishing Visual Hierarchy

Color is one of our most effective tools for guiding user attention. Use contrast intentionally:

- High-contrast elements draw immediate attention (primary CTAs)
- Mid-contrast elements support the main action (secondary buttons)
- Low-contrast elements fade into the background (tertiary info, metadata)

### Creating Emotional Resonance

The overall color scheme of your app sets an emotional tone before a user reads a single word. A fintech app with a bright, playful palette might feel untrustworthy, while a meditation app with high-saturation colors might feel jarring rather than calming.

### Enhancing Usability

Beyond aesthetics, color serves a critical functional role:

- **Wayfinding**: Color-coded sections help users navigate
- **Feedback**: Green for success, yellow for warnings, red for errors
- **Data visualization**: Accessible color palettes ensure charts are readable by everyone

## Practical Tips for Designers

1. **Start with purpose, not preference**: Choose your primary color based on the emotional response you want to evoke, not because you personally like the color.

2. **Consider accessibility from the start**: Ensure your palette meets WCAG contrast ratios. Tools like Stark and Contrast can help.

3. **Test your palette in context**: A color that looks beautiful in isolation might create accessibility issues or visual tension in a full interface.

4. **Use color consistently**: Establish clear rules for what each color means in your system and stick to them across every screen.

5. **Remember that neutral ≠ boring**: A well-crafted neutral palette can be more sophisticated and versatile than an overly colorful one.

## Conclusion

Color psychology is not about following rigid rules—it's about understanding the principles and applying them thoughtfully to serve your users and your product's goals. The best color decisions are invisible to users; they simply feel right. As designers, our job is to make those decisions with intention, backed by an understanding of how color shapes perception and behavior.`,
    path: '/blog/psychology-of-color-in-ui-design'
  },
  {
    title: 'How I Built My Design System from Scratch',
    description: 'A practical guide to creating your own design system, from initial audit to implementation, and the lessons learned along the way.',
    date: '2025-03-05',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    minRead: 6,
    author: {
      name: 'Emma Thompson',
      avatar: {
        src: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Emma Thompson'
      }
    },
    body: `After years of starting each project with a blank Figma file, I finally took the plunge and created my own comprehensive design system. The process was both challenging and incredibly rewarding, and I wanted to share my approach for other designers considering the same journey.

## Why Build a Design System?

Before diving into the how, let's talk about the why. A design system is more than just a component library—it's a single source of truth that brings together design language, reusable components, and guidelines. The benefits are substantial:

- **Consistency at scale**: No more hunting down mismatched buttons or wondering which shade of blue to use
- **Faster iteration**: Reusable components mean less time rebuilding and more time designing
- **Better collaboration**: Developers and designers speak the same language
- **Smoother handoffs**: Clear documentation reduces back-and-forth

## Step 1: The Audit

I started by conducting a comprehensive visual audit of my recent projects. I created a spreadsheet cataloging every UI element I used across five major projects:

- Button variants (primary, secondary, ghost, danger)
- Form elements (inputs, selects, checkboxes, toggles)
- Typography scales (headings, body, captions)
- Spacing values (margins, padding, gaps)
- Color usage (every hex value I'd used)
- Icon styles and sizes

The audit revealed I was using 47 distinct shades of blue across my projects. Forty-seven! That was my wake-up call.

## Step 2: Establishing Foundations

### Color System

I started with a minimal, intentional color palette:

- **Primary**: A single blue (#2563EB)
- **Neutral scale**: 9 shades from white to near-black
- **Semantic colors**: Green (success), amber (warning), red (error)
- **Accent**: One complementary color

### Typography

I chose a single typeface family (Inter) and established clear sizing rules:

- Display: 48px/32px/24px for major headings
- Heading: 20px/18px/16px for section titles
- Body: 16px for paragraphs, 14px for supporting text
- Small: 12px for labels and metadata

### Spacing

I adopted an 8px baseline grid, which gave me a consistent spacing scale: 4, 8, 16, 24, 32, 48, 64px.

## Step 3: Building Components

With foundations in place, I moved to components. I started small and scaled up:

1. Core primitives: Button, Input, Badge, Avatar
2. Composite components: Card, Modal, Dropdown
3. Layout components: Container, Grid, Stack
4. Page-level components: Header, Footer, Sidebar

## Step 4: Documentation

A design system is only useful if people can use it. I created documentation covering:

- **When to use each component** (including when NOT to use it)
- **Behavior specifications** (hover states, transitions, error handling)
- **Code examples** in Vue.js
- **Accessibility requirements**

## Lessons Learned

1. **Start smaller than you think you need**: It's easier to add than to trim
2. **Design tokens first**: Define your foundations before touching components
3. **Document decisions, not just elements**: Explain the reasoning behind each choice
4. **Build for adoption**: Make it easy for others to contribute and suggest improvements

My design system is now living document that continues to evolve with each project. It's been one of the most impactful investments I've made in my design practice.`,
    path: '/blog/how-i-built-my-own-design-system-from-scratch'
  },
  {
    title: 'The Case for Slow Design in a Fast-Paced Digital World',
    description: 'Why designing digital experiences that encourage users to slow down and engage deeply can lead to more meaningful interactions and better outcomes.',
    date: '2025-01-28',
    image: 'https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    minRead: 7,
    author: {
      name: 'Emma Thompson',
      avatar: {
        src: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Emma Thompson'
      }
    },
    body: `In a digital ecosystem obsessed with speed, "slow design" might sound counterintuitive. But when every app is fighting for milliseconds of attention, the ones that earn genuine engagement are often the ones that respect users' time and attention the most.

## The Speed Trap

We've been conditioned to believe that faster is always better. Faster load times, faster checkout flows, faster content consumption. And for many use cases—looking up a phone number, checking the weather, paying a bill—speed is genuinely a feature.

But there's a growing body of research suggesting that when it comes to meaningful engagement, speed can be the enemy of satisfaction.

## What is Slow Design?

Slow design isn't about making things sluggish or inefficient. It's a philosophy that prioritizes:

- **Intention over impulse**: Designing interactions that encourage thoughtful engagement rather than reflexive tapping
- **Depth over breadth**: Creating fewer, more meaningful features instead of surface-level functionality
- **Delight over density**: Leaving space for beauty and discovery rather than cramming in information

## Principles of Slow Design

### 1. Purposeful Pacing

Not every interaction needs to be instantaneous. Introducing intentional micro-pauses can:

- Signal importance ("this action matters, please confirm")
- Build anticipation ("your result is being prepared")
- Create rhythm in the user experience

### 2. Progressive Disclosure

Instead of showing everything at once, reveal information progressively:

- Start with the essential, then layer in detail
- Let users choose their depth of engagement
- Respect that not every user needs every feature on day one

### 3. Meaningful Micro-interactions

Each animation, transition, and haptic response should communicate something:

- A subtle bounce when a task is completed
- A satisfying ripple when a button is pressed
- A graceful transition between states

### 4. White Space as Feature

Generous spacing isn't wasted space—it's cognitive breathing room. It:

- Reduces visual noise and decision fatigue
- Creates hierarchy and improves scanability
- Signals confidence and quality

## Case Study: Redesigning a Habit Tracker

When I redesigned a popular habit tracking app, I applied slow design principles to an area that was causing user burnout: the daily check-in process.

### The Problem

The original design encouraged rapid, automatic check-ins. Users would tap through their habits in seconds, barely registering what they were doing. Engagement was high, but meaningful behavior change was low.

### The Solution

I redesigned the check-in to include:

- A brief, beautiful transition between each habit (adding ~1.5 seconds to the flow)
- A reflective prompt after completing a streak ("How did this habit make you feel today?")
- Weekly review screens that visualized progress and invited reflection

### The Results

- Overall daily active usage dropped 15%
- But goal completion rates increased 40%
- User satisfaction scores improved significantly
- Users reported feeling more connected to their goals

## When Slow Design Works Best

Slow design isn't right for every context. It works best for:

- **Content-rich experiences** (reading, learning, creating)
- **Complex decision-making** (financial planning, healthcare choices)
- **Mindfulness and wellness** (meditation, journaling, habit tracking)
- **Creative tools** (design, writing, music production)

It's less appropriate for:

- **Utility tasks** (setting an alarm, checking the time)
- **Emergency situations** (calling for help, reporting an issue)
- **High-frequency, low-stakes actions** (scrolling social media)

## Conclusion

The best digital experiences don't just respect users' time—they respect their attention. By intentionally slowing down certain interactions, we can create products that don't just capture attention but genuinely earn it.

As designers, we have a choice: build products that compete for clicks, or build products that create lasting value. Slow design points us firmly toward the latter.`,
    path: '/blog/slow-design-in-fast-paced-digital-world'
  }
]

export const blogPageMeta: { seo: { title: string, description: string }, title: string, description: string } = {
  seo: {
    title: 'Latest Articles',
    description: 'Some of my recent thoughts on design, development, and the tech industry.'
  },
  title: 'Latest Articles',
  description: 'Some of my recent thoughts on design, development, and the tech industry.'
}

export function getSortedPosts(): BlogPost[] {
  return [..._posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostByPath(path: string): BlogPost | undefined {
  return _posts.find(p => p.path === path)
}

export function getSurroundingPosts(path: string, fields?: { fields?: string[] }): { prev?: { title: string, path?: string, description?: string }, next?: { title: string, path?: string, description?: string } } {
  const sorted = getSortedPosts()
  const index = sorted.findIndex(p => p.path === path)
  const result: { prev?: { title: string, path?: string, description?: string }, next?: { title: string, path?: string, description?: string } } = {}

  if (index < sorted.length - 1) {
    const nextPost = sorted[index + 1]!
    result.next = { title: nextPost.title, path: nextPost.path }
    if (fields?.fields?.includes('description')) {
      result.next.description = nextPost.description
    }
  }
  if (index > 0) {
    const prevPost = sorted[index - 1]!
    result.prev = { title: prevPost.title, path: prevPost.path }
    if (fields?.fields?.includes('description')) {
      result.prev.description = prevPost.description
    }
  }

  return result
}
