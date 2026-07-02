import type {SanityImageSource} from '@sanity/image-url'
import type {PortableTextBlock} from '@portabletext/types'

export type LitterStatus = 'a_venir' | 'disponible' | 'option' | 'reserve' | 'adopte'

export interface Litter {
  _id: string
  title: string
  slug: {current: string} | null
  birthDate: string
  description?: string
  parentMale?: string
  parentFemale?: string
  status: LitterStatus
  stats?: {
    total?: number
    available?: number
    reserved?: number
  }
  gallery?: SanityImageSource[]
}

export type CatRole = 'male' | 'femelle'
export type CatStatus = 'actif' | 'retraite'

export interface Cat {
  _id: string
  name: string
  slug: {current: string} | null
  description?: string
  colorCode?: string
  geneticData?: string
  role: CatRole
  status: CatStatus
  origin?: string
  tests?: string
  photo: SanityImageSource
  gallery?: SanityImageSource[]
}

export interface SiteSettings {
  aboutPhoto?: SanityImageSource
  footerTagline?: string
}

export type TestimonialSource = 'google' | 'facebook'

export interface Testimonial {
  _id: string
  authorName: string
  rating: number
  source: TestimonialSource
  text: string
  date?: string
}

export interface TitleParts {
  titlePrefix?: string
  titleEmphasis: string
}

export interface Card {
  title: string
  description: string
}

export interface Stat {
  value: string
  label: string
}

export type CertificationAccent = 'blue' | 'sage' | 'rose'

export interface Certification {
  icon?: string
  name: string
  detail?: string
  accent?: CertificationAccent
}

export interface HomePage {
  hero: TitleParts & {
    badge?: string
    description?: string
    ctaPrimaryLabel?: string
    ctaSecondaryLabel?: string
    stats?: Stat[]
  }
  about: TitleParts & {
    sectionLabel?: string
    paragraphs?: string[]
    badgeNumber?: string
    badgeText?: string
    values?: Card[]
  }
  catsSection: TitleParts & {
    sectionLabel?: string
    description?: string
  }
  standardsSection: TitleParts & {
    sectionLabel?: string
    standards?: Card[]
    cardTitle?: string
    cardSubtitle?: string
    certifications?: Certification[]
  }
  adoptionSection: TitleParts & {
    sectionLabel?: string
    steps?: Card[]
  }
  testimonialsSection: TitleParts & { sectionLabel?: string }
  gallerySection: TitleParts & { sectionLabel?: string; emptyStateText?: string }
  latestLitterSection: TitleParts & { sectionLabel?: string }
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqPage {
  sectionLabel?: string
  introText?: string
  items?: FaqItem[]
}

export interface Article {
  _id: string
  title: string
  slug: {current: string} | null
  publishedAt: string
  coverImage: SanityImageSource
  excerpt?: string
  body?: PortableTextBlock[]
}
