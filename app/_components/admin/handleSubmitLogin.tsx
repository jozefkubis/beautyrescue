import { logIn } from "@/app/_lib/actions_all/auth_actions";
import toast from "react-hot-toast";

type Props = {
  e: React.SubmitEvent<HTMLFormElement>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default async function handleSubmitLogin({ e, setError }: Props) {
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.trim() || !password?.trim()) {
    setError("Email a heslo sú povinné.");
    return { success: false };
  }

  const result = await logIn({ email, password });

  if (result?.success) {
    toast.success("Prihlásenie bolo úspešné!");
    return { success: true };
  }

  if (!result?.success) {
    toast.error("Prihlásenie nebolo úspešné!");
    setError(result?.message || "Prihlasovacie údaje sú nesprávne.");
    return { success: false };
  }

  return { success: false };
}
