import type {SanityImageSource} from '@sanity/image-url'

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
