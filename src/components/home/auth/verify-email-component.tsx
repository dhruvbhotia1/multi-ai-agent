"use client"

//apply rate limiting here.
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useState, useTransition} from "react";
import {Card, CardContent, CardTitle, CardHeader, CardDescription} from "@/components/ui/card";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useRouter} from "next/navigation";
import {approveResend} from "@/lib/user/approveResend";

interface Props {

    email: string;
}

export function VerifyEmailComponent({email} : Props) {

    const router = useRouter();
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [otp, setOtp] = useState("");

    const [verificationPending, startVerificationTransition] = useTransition();

    const resendEmail = async (email: string) => {

        try {

            const data = await approveResend({email, verify_type: "code", request_type: "email-verification"});

            if(data.status === "error") {

                toast.error(data.errorMessage);

            } else {

                toast.success(data.message);
                setShowOtpInput(true);

            }

        } catch {

            console.log("Cannot verify user.");
        }

    }

    function verifyOtp() {


        startVerificationTransition(async () => {



            await authClient.emailOtp.verifyEmail({
                email,
                otp,
                fetchOptions: {
                    onSuccess: () => {

                        router.push("/");
                    },
                    onError: (error) => {

                        setError(error.error.message);
                    }
                }
            })
        })
    }

  return (
    <div className="glass-card items-center justify-center border-white/10 border rounded-md p-4 font-semibold space-y-4">
      <p className="tracking-wide">
        You have been redirected to this because your email is still unverified. Please verify your email by clicking the link sent to your inbox.
        Didn&apos;t receive one yet? We can resend it.
      </p>

        <div className={"flex flex-col items-center justify-center gap-y-8"}>

            {showOtpInput && (
                <Card className={"w-full mx-auto glass-card"}>
                    <CardHeader className={"text-center"}>
                        <CardTitle className={"text-xl"}>
                            Please check your email
                        </CardTitle>

                        <CardDescription>
                            Enter the code sent by us to your email address to verify your account.
                        </CardDescription>
                    </CardHeader>


                    <CardContent className={"text-center"}>
                        <div className={"flex flex-col items-center space-y-2 gap-y-4"}>
                            <InputOTP maxLength={6} className={"gap-2"} value={otp} onChange={(value) => setOtp(value)}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0}/>
                                    <InputOTPSlot index={1}/>
                                    <InputOTPSlot index={2}/>
                                </InputOTPGroup>



                                <InputOTPGroup>
                                    <InputOTPSlot index={3}/>
                                    <InputOTPSlot index={4}/>
                                    <InputOTPSlot index={5}/>
                                </InputOTPGroup>
                            </InputOTP>

                            <p className={"text-sm text-muted-foreground"}>Enter the 6-digit code sent to your email.</p>

                            <p className={"text-sm text-muted-foreground"}>{error}</p>
                        </div>

                        <Button className={"w-full flex justify-center mt-4 font-semibold"} onClick={verifyOtp} disabled={verificationPending}>
                            Verify
                        </Button>

                    </CardContent>
                </Card>
            )}

            <Button variant={"ghost"} className={"w-1/2 font-semibold bg-white/5"} onClick={() => resendEmail(email)}>
                Resend
            </Button>
        </div>
    </div>
  )
}
