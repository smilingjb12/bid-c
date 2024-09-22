import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button variant="outline" size="sm" type="submit">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </form>
  );
};
