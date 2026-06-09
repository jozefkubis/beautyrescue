import LoginForm from "../_components/admin/LoginForm";

export default function Page() {
  const allowedAdminEmails = [
    process.env.ADMIN_EMAIL_1,
    process.env.ADMIN_EMAIL_2,
  ].filter((email): email is string => Boolean(email));

  return (
    <div className="flex items-center justify-center h-screen w-full px-4">
      <LoginForm allowedAdminEmails={allowedAdminEmails} />
    </div>
  );
}
