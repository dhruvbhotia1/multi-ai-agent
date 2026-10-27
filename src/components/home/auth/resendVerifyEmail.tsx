
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

//apply rate limiting here...

export function ResendVerifyEmail() {

  const { data } = authClient.useSession();

  const resendEmail = async () => {
    await authClient.sendVerificationEmail({
      email: data?.user?.email || "",
      callbackURL: "/"
    });
  }


  return (
    <Button className="font-semibold" variant={"default"} onClick={() => resendEmail}>

      Resend

    </Button>
  )


}
