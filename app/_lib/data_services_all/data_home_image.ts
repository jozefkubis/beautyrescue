import { cache } from "react"
import { getSupabasePublicServerClient } from "../supabase/publicServer"

export type HomeImageProps = {
image_url?: string
}

const getHomeImage = cache(async () => {
    const supabase = getSupabasePublicServerClient()

    const { data, error } = await supabase
        .from("home_page_image")
        .select("*")
        .single()

    if (error) {
        console.error("Error fetching home image data:", error)
        return null
    }

    return data
})

export default getHomeImage
