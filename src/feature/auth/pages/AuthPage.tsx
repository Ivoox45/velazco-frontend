import { LoginForm } from "../components/form/LoginForm";

export default function AuthPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
