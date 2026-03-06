import Interior from "./main/interior/Interior"
import Location from "./main/location/Location"
import News_on_image_main from "./main/news/news_on_image/News_on_image_main"
import News_text from "./main/news/news_text/News_text"

export default function Main() {
  return (
    <>
      <News_on_image_main />
      <News_text />
      <Location />
      <Interior />
      {/* <Footer /> */}
    </>
  )
}
