import AuthEmailForm from "../components/AuthEmailForm";

export default function LoginPage() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <AuthEmailForm mode="login" />
    </div>
  );
}

