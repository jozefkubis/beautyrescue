import { logIn } from "@/app/_lib/actions_all/auth_actions";

type Props = {
  e: React.SubmitEvent<HTMLFormElement>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default async function handleSubmitCustomerLogin({
  e,
  setError,
}: Props) {
  const form = e.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.trim() || !password?.trim()) {
    setError("Email a heslo sú povinné.");
    return {
      success: false,
      message: "Email a heslo sú povinné.",
    };
  }

  const result = await logIn({ email, password });

  if (result?.success) {
    return {
      success: true,
      message: "Prihlásenie bolo úspešné!",
    };
  }

  setError(result?.message || "Prihlasovacie údaje sú nesprávne.");

  return {
    success: false,
    message: result?.message || "Prihlásenie nebolo úspešné!",
  };
}
