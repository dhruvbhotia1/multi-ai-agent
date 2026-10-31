'use client'
import { motion } from "motion/react"
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {authClient} from "@/lib/authClient";
import {NavUser} from "@/components/home/NavUserButton";
import {cn} from "@/lib/utils";


export const Navbar = () => {

    const router = useRouter();

    const session = authClient.useSession()

    const pathname = usePathname();


  return (
	  <div className="overflow-x-hidden">

      <motion.div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b text-white" initial={{ y: -80 }} animate={{ y: 0 }} transition={{duration: 0.5}}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between bg-transparent">

          <Link href={"/"}>

            <div className="text-lg font-bold tracking-wide flex items-center cursor-pointer text-white" onClick={() => router.push("/")}>
              <Image src="/Logo.svg" height={35} width={35} alt="logo" className="mr-2"/>
              <span>Vortex</span><span className={"text-muted-foreground"}>AI</span>
            </div>
          </Link>

          <div className={"flex items-center gap-4"}>

              {
                  session.data ? (

                      <div className={"flex flex-row items-center justify-center gap-x-4"}>
                          <Link href={`/studio/${session.data.user.id}`} className={cn("hover:bg-zinc-800 p-3 rounded-lg font-semibold", pathname.includes("studio") && "bg-zinc-700" )}>Studio</Link>
                          <Link href="/dashboard" className={cn("hover:bg-zinc-800 p-3 rounded-lg font-semibold", pathname.includes("dashboard") && "bg-zinc-700" )}>Dashboard</Link>
                          <Link href="/pricing" className={cn("hover:bg-zinc-800 p-3 rounded-lg font-semibold", pathname.includes("pricing") && "bg-zinc-700" )}>Pricing</Link>
                          <Link href="/contact-us" className={cn("hover:bg-zinc-800 p-3 rounded-lg font-semibold", pathname.includes("contact") && "bg-zinc-700" )}>Contact Us</Link>
                          <NavUser data={session.data}/>
                      </div>

                  ) : (

                      <motion.button className="px-5 py-2 rounded-full text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 cursor-pointer" onClick={() => router.push("/sign-in")}>
                          <span className={"text-white font-medium"}>Get Started</span>
                      </motion.button>
                  )
              }
          </div>
          </div>
      </motion.div>
    </div>
  )
}
