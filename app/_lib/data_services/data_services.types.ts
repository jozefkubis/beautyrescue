export type ServiceItemType = "service" | "product" | "category" | "content"

export type ServiceGalleryItem = {
  src: string
  alt?: string
}

export type ServiceItem = {
  slug: string
  name: string
  summary: string | null
  description: string | null
  imageUrl: string | null
  gallery: ServiceGalleryItem[]
  itemType: ServiceItemType
  category: string | null
  subcategory: string | null
  content: Record<string, unknown>
  attributes: Record<string, unknown>
  metadata: Record<string, unknown>
}
