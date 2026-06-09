import Image from "next/image";
import Customer_LoginForm from "../_components/customer_login/Customer_LoginForm";
import getHomeImage from "../_lib/data_services_all/data_home_image";

export default async function Page() {
  const homeImg = await getHomeImage();
  const uploadedImageUrl = homeImg?.image_url?.trim();
  const backgroundImage = uploadedImageUrl || "/images/home_main.jpg";

  return (
    <div
      className="fixed inset-0 z-9999 flex min-h-dvh w-screen items-center justify-center overflow-hidden"
      role="presentation"
    >
      <Image
        src={backgroundImage}
        alt="Pozadie prihlasenia Beauty Rescue"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-goldDark/20 backdrop-blur-md" />

      {/* <div className="flex items-center justify-center h-screen w-full px-4"> */}
      <div className="relative z-10">
        <Customer_LoginForm />
      </div>
      {/* </div> */}
    </div>
  );
}
