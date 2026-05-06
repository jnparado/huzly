import AuthPhoneForm from "../../components/AuthPhoneForm";

export default function SignupPhonePage() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <AuthPhoneForm mode="signup" />
    </div>
  );
}

