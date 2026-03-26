import Jalupro_young_eye from "@/app/_components/products/jalupro/young_eye/Jalupro_young_eye"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getJaluproYoungEye } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproYoungEyeData = await getJaluproYoungEye("jalupro-young-eye")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Jalupro_young_eye
      jaluproYoungEyeData={jaluproYoungEyeData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
