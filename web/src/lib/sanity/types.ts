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
  price?: number
  priceLabel?: string
  priceNote?: string
  stats?: {
    total?: number
    available?: number
    reserved?: number
  }
  gallery?: SanityImageSource[]
  en?: Partial<Pick<Litter, 'title' | 'description' | 'priceLabel' | 'priceNote'>> | null
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
  en?: Partial<Pick<Cat, 'description'>> | null
}

export interface Seo {
  metaTitle?: string
  metaDescription?: string
}

export interface PostalAddress {
  streetAddress?: string
  postalCode?: string
  addressLocality?: string
  addressCountry?: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface Pricing {
  kittenPrice?: number
  kittenPriceLabel?: string
  depositReservation?: string
  depositWaitingList?: string
  termsText?: string
}

export interface LegalInfo {
  siret?: string
  loofAffix?: string
  acaced?: string
  mediator?: string
  extraMentions?: string[]
}

export interface SiteSettings {
  siteName?: string
  tagline?: string
  aboutPhoto?: SanityImageSource
  email?: string
  phone?: string
  phoneDisplay?: string
  address?: PostalAddress
  socialLinks?: SocialLink[]
  pricing?: Pricing
  legal?: LegalInfo
  footerTagline?: string
  footerNavTitle?: string
  footerContactTitle?: string
  footerLegalTitle?: string
  defaultSeo?: Seo
  en?: Partial<SiteSettings> | null
}

/** En-tête commun aux pages simples (étiquette + titre en 3 morceaux + intro). */
export interface PageHeader {
  sectionLabel?: string
  titlePrefix?: string
  titleEmphasis?: string
  titleSuffix?: string
  introText?: string
}

export interface CatsPage extends PageHeader {
  malesTitle?: string
  malesEmptyText?: string
  femalesTitle?: string
  femalesEmptyText?: string
  seo?: Seo
  en?: Partial<CatsPage> | null
}

export interface LittersPage extends PageHeader {
  emptyText?: string
  waitingListText?: string
  seo?: Seo
  en?: Partial<LittersPage> | null
}

export interface ContactPage extends PageHeader {
  termsTitle?: string
  formIntro?: string
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
  seo?: Seo
  en?: Partial<ContactPage> | null
}

export interface LegalPage {
  title: string
  sectionLabel?: string
  updatedAt?: string
  body?: PortableTextBlock[]
  seo?: Seo
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
  en?: Partial<HomePage> | null
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqPage {
  sectionLabel?: string
  introText?: string
  items?: FaqItem[]
  seo?: Seo
  en?: Partial<FaqPage> | null
}

export interface Article {
  _id: string
  title: string
  slug: {current: string} | null
  publishedAt: string
  coverImage: SanityImageSource
  excerpt?: string
  body?: PortableTextBlock[]
  en?: Partial<Pick<Article, 'title' | 'excerpt' | 'body'>> | null
}
