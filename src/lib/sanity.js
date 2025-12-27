import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:  'jl0heffc',
    dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Helper function to generate image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
