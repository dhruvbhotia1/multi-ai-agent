//sign-in page layout.
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {getServerSession} from "@/lib/user/getServerSession";
import {redirect} from "next/navigation";


interface Props {
    children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {

    const data = await getServerSession();

    if(data.status === "success") {

        redirect("/");
    }


    return (
        <div className={"relative flex min-h-svh items-center justify-center"}>
            <Link
                href={"/"}
                className={buttonVariants({
                    variant: "outline",
                    className: "absolute top-4 left-4",
                })}
            >
                <ArrowLeftIcon className={"size-4"} />
                Back
            </Link>
            <div className={"flex w-full max-w-lg flex-col gap-6 text-white"}>
                <Link href={"/public"} className={"flex items-center gap-2 self-center font-medium"}>
                    <Image src={"/Logo.svg"} alt={"logo"} height={40} width={40} />
                    <span className={"font-semibold"}>VortexAI</span>
                </Link>

                {children}

                <div className={"text-balance text-center text-xs text-muted-foreground"}>
                    By clicking continue, you agree to our{" "}
                    <span className={"hover:text-primary hover:underline cursor-pointer"}>
            Terms of service
          </span>{" "}
                    and <span className={"hover:text-primary hover:underline"}>Privacy policy</span>
                </div>
            </div>
        </div>
    );
}
