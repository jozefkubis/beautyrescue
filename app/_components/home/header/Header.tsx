import Contact_links from "./Contact_links"
import Logo from "./Logo"

export default function Header() {
  return (
    <div className="flex items-center justify-between pt-3 pb-11 px-20 xl:px-20 2xl:px-44">
      <Logo />
      <Contact_links />
    </div>
  )
}
