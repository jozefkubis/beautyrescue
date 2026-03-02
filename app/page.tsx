import Header from "./_components/home/header/Header"
import Main from "./_components/home/main/Main"
import Navigation from "./_components/navigation/Navigation"

export default function Page() {
  return (
    <div className="relative">
      <Navigation />
      <Header />
      <Main />
    </div>
  )
}
