import { getSupabaseServerClient } from "../supabase/server"

export type HomeImageProps = {
image_url?: string
}

export default async function getHomeImage() {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
        .from("home_page_image")
        .select("*")
        .single()

    if (error) {
        console.error("Error fetching home image data:", error)
        return null
    }

    return data
}