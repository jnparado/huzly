import AuthEmailForm from "../components/AuthEmailForm";

export default function SignupPage() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <AuthEmailForm mode="signup" />
    </div>
  );
}

