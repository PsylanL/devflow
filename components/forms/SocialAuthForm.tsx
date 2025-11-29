"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
const SocialAuthForm = () => {
  const router = useRouter();
  const buttonClass =
    "cursor-pointer background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: ROUTES.HOME,
      });

      if (result?.url) {
        router.push(result.url); // client-side navigation
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? `Social sign-in failed: ${error.message}`
          : "Social sign-in failed. Please try again."
      );
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
