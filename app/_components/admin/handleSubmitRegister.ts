import { signUp } from "@/app/_lib/actions_all/auth_actions";

type Props = {
  e: React.FormEvent<HTMLFormElement>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default async function handleSubmitRegister({ e, setError }: Props) {
  const form = e.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  if (!email?.trim() || !password?.trim() || !passwordConfirmation?.trim()) {
    setError("Email, heslo aj potvrdenie hesla sú povinné.");
    return {
      success: false,
      message: "Email, heslo aj potvrdenie hesla sú povinné.",
    };
  }

  if (password !== passwordConfirmation) {
    setError("Heslá sa nezhodujú.");
    return {
      success: false,
      message: "Heslá sa nezhodujú.",
    };
  }

  const result = await signUp({ email, password });

  if (result?.success) {
    return {
      success: true,
      message: "Registrácia bola úspešná!",
    };
  }

  setError(result?.message || "Registrácia nebola úspešná.");

  return {
    success: false,
    message: result?.message || "Registrácia nebola úspešná.",
  };
}