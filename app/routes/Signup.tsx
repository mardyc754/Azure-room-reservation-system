import { PageWrapper } from "@/components/PageWrapper";
import { SignupForm } from "@/components/forms/SignupForm";

import type { Route } from "./+types/Signup";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign up" }, { name: "description", content: "Signup" }];
}

export default function Signup() {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">
        <SignupForm />
      </div>
    </PageWrapper>
  );
}
