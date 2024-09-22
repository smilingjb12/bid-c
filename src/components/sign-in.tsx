import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="size-sm" type="submit">
        <LogIn className="w-5 h-5  mr-2" />
        Sign in with Google
      </Button>
    </form>
  );
};
