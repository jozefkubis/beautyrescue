import { getSupabaseBrowserClient } from "../supabase/client"

export type MicroneedlingMainProps = {
  microneedlingData: {
    name: string
    image_url: string
    content: {
      paragraphs: string[]
    }
    attributes: {
      contraindicationsTitle: string
      contraindications: string[]
    }
  }
}

export async function deleteTknProduct(productSlug: string) {
  const supabase = getSupabaseBrowserClient()


  const { error } = await supabase
    .from("service_items")
    .delete()
    .eq("slug", productSlug)  

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }

  return true
}
