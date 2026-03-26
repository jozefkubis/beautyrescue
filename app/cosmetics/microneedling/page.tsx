import Microneedling from "@/app/_components/products/microneedling/Microneedling"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getMicroneedling from "@/app/_lib/data_services/data_microneedling"

export default async function Page() {
  const microneedlingData = await getMicroneedling("microneedling")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Microneedling
      microneedlingData={microneedlingData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
