import type {SanityImageSource} from '@sanity/image-url'

export type LitterStatus = 'a_venir' | 'disponible' | 'option' | 'reserve' | 'adopte'

export interface Litter {
  _id: string
  title: string
  slug: {current: string}
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
  colorCode?: string
  geneticData?: string
  role: CatRole
  status: CatStatus
  origin?: string
  tests?: string
  photo: SanityImageSource
}

export interface SiteSettings {
  aboutPhoto?: SanityImageSource
}
