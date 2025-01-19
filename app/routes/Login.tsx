import { LoginForm } from "@/components/forms/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";

import type { Route } from "./+types/Login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
}

export default function Login() {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </PageWrapper>
  );
}
