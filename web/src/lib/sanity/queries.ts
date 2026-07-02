import {client} from './client'
import type {SanityImageSource} from '@sanity/image-url'
import type {Cat, FaqPage, HomePage, Litter, SiteSettings, Testimonial} from './types'

export async function getLitters(): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "portee"] | order(birthDate desc) {
      _id, title, slug, birthDate, description, parentMale, parentFemale,
      status, stats, "gallery": gallery[defined(asset)]
    }`,
  )
}

export async function getLatestLitter(): Promise<Litter | null> {
  return client.fetch(
    `*[_type == "portee"] | order(birthDate desc)[0] {
      _id, title, slug, birthDate, description, parentMale, parentFemale,
      status, stats, "gallery": gallery[defined(asset)]
    }`,
  )
}

export async function getLitterBySlug(slug: string): Promise<Litter | null> {
  return client.fetch(
    `*[_type == "portee" && slug.current == $slug][0] {
      _id, title, slug, birthDate, description, parentMale, parentFemale,
      status, stats, "gallery": gallery[defined(asset)]
    }`,
    {slug},
  )
}

export async function getLitterSlugs(): Promise<{slug: string}[]> {
  const litters: {slug: {current: string}}[] = await client.fetch(
    `*[_type == "portee" && defined(slug.current)] { slug }`,
  )
  return litters.map((litter) => ({slug: litter.slug.current}))
}

export async function getCats(): Promise<Cat[]> {
  return client.fetch(
    `*[_type == "chat"] | order(name asc) {
      _id, name, slug, colorCode, geneticData, role, status, origin, tests, photo
    }`,
  )
}

export async function getCatBySlug(slug: string): Promise<Cat | null> {
  return client.fetch(
    `*[_type == "chat" && slug.current == $slug][0] {
      _id, name, slug, description, colorCode, geneticData, role, status,
      origin, tests, photo, "gallery": gallery[defined(asset)]
    }`,
    {slug},
  )
}

export async function getCatSlugs(): Promise<{slug: string}[]> {
  const cats: {slug: {current: string}}[] = await client.fetch(
    `*[_type == "chat" && defined(slug.current)] { slug }`,
  )
  return cats.map((cat) => ({slug: cat.slug.current}))
}

export async function getGalleryImages(limit = 6): Promise<SanityImageSource[]> {
  const litters: {gallery?: SanityImageSource[]}[] = await client.fetch(
    `*[_type == "portee" && defined(gallery)] | order(birthDate desc) { "gallery": gallery[defined(asset)] }`,
  )
  return litters.flatMap((litter) => litter.gallery ?? []).slice(0, limit)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0] { aboutPhoto, footerTagline }`)
}

export async function getTestimonials(limit = 6): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "temoignage"] | order(date desc)[0...$limit] {
      _id, authorName, rating, source, text, date
    }`,
    {limit},
  )
}

export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch(`*[_type == "homePage"][0] {
    hero, about, catsSection, standardsSection, adoptionSection,
    testimonialsSection, gallerySection, latestLitterSection
  }`)
}

export async function getFaqPage(): Promise<FaqPage | null> {
  return client.fetch(`*[_type == "faqPage"][0] { sectionLabel, introText, items }`)
}
