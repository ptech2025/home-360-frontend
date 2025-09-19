"use client";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "../ui/button";

function LogOutBtn() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in"); // redirect to login page
        },
      },
    });
  };
  return (
    <Button
      onClick={handleLogout}
      className="flex items-center w-full text-destructive bg-transparent justify-start p-0! shadow-none hover:bg-transparent [&_svg]:text-destructive!  [&>svg]:shrink-0 [&>svg]:size-4.5   underline-offset-4 hover:underline text-sm font-circular-medium font-medium gap-2 "
    >
      <LogOut />
      <span>Log Out</span>
    </Button>
  );
}
export default LogOutBtn;
