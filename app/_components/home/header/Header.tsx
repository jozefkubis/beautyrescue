import Contact_links from "./Contact_links"
import Logo from "./Logo"

export default function Header() {
  return (
    <div className="border-b border-redMain flex items-center justify-between pt-4 pb-11 px-20 xl:px-48">
      <Logo />
      <Contact_links />
    </div>
  )
}
