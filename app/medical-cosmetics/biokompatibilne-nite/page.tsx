import Biokompatibilne_nite from "@/app/_components/products/biokompatibilne-nite/Biokompatibilne_nite"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getBiokompatibilneNite from "@/app/_lib/data_services/data_biokompatibilne_nite"

export default async function Page() {
  const biokompatibilneNiteData = await getBiokompatibilneNite(
    "biokompatibilne-nite",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  console.log("Biokompatibilne nite data:", biokompatibilneNiteData)

  return (
    <Biokompatibilne_nite
      biokompatibilneNiteData={biokompatibilneNiteData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
