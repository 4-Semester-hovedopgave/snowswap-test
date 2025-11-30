import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ padding: 40 }}>
      <SignIn routing="path" />
    </div>
  );
}
