import AuthPhoneForm from "../../components/AuthPhoneForm";

export default function LoginPhonePage() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <AuthPhoneForm mode="login" />
    </div>
  );
}

