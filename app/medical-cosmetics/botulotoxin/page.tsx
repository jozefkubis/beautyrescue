import Botulotoxin from "@/app/_components/products/botulotoxin/Botulotoxin"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getBotulotoxin } from "@/app/_lib/data_services/data_botulotoxin"

export default async function Page() {
  const botulotoxinData = await getBotulotoxin("botulotoxin")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Botulotoxin
      botulotoxinData={botulotoxinData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
