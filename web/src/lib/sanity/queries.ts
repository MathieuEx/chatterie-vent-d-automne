import {client} from './client'
import type {SanityImageSource} from '@sanity/image-url'
import type {Cat, Litter, SiteSettings} from './types'

export async function getLitters(): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "portee"] | order(birthDate desc) {
      _id, title, slug, birthDate, description, parentMale, parentFemale,
      status, stats, gallery
    }`,
  )
}

export async function getLatestLitter(): Promise<Litter | null> {
  return client.fetch(
    `*[_type == "portee"] | order(birthDate desc)[0] {
      _id, title, slug, birthDate, description, parentMale, parentFemale,
      status, stats, gallery
    }`,
  )
}

export async function getCats(): Promise<Cat[]> {
  return client.fetch(
    `*[_type == "chat"] | order(name asc) {
      _id, name, colorCode, geneticData, role, status, origin, tests, photo
    }`,
  )
}

export async function getGalleryImages(limit = 6): Promise<SanityImageSource[]> {
  const litters: {gallery?: SanityImageSource[]}[] = await client.fetch(
    `*[_type == "portee" && defined(gallery)] | order(birthDate desc) { gallery }`,
  )
  return litters.flatMap((litter) => litter.gallery ?? []).slice(0, limit)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0] { aboutPhoto }`)
}
