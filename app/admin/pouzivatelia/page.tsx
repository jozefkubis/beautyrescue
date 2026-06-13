import Users from "@/app/_components/admin/Users";
import { getAllUsers } from "@/app/_lib/data_services_all/data_users";

export default async function page() {
  const users = await getAllUsers();

  const nonAdminUsers = (users ?? []).filter((user) => {
    return (
      user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2
    );
  });

  return <Users nonAdminUsers={nonAdminUsers} />;
}
