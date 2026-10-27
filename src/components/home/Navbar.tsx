'use client'
import { motion } from "motion/react"
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {authClient} from "@/lib/authClient";
import {NavUser} from "@/components/home/NavUserButton";
import {ThemeToggle} from "@/components/ui/theme-toggle";


export const Navbar = () => {

    const router = useRouter();

    const session = authClient.useSession()



  return (
	  <div className="overflow-x-hidden">



      <motion.div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b text-white" initial={{ y: -80 }} animate={{ y: 0 }} transition={{duration: 0.5}}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between bg-transparent">

          <Link href={"/"}>

            <div className="text-lg font-bold tracking-wide flex items-center cursor-pointer text-white" onClick={() => router.push("/")}>
              <Image src="./logo.svg" height={35} width={35} alt="logo" className="mr-2"/>
              <span>Vortex</span><span className={"text-muted-foreground"}>AI</span>
            </div>
          </Link>

          <div className={"flex items-center gap-4"}>

              {
                  session ? (

                      <div className={"flex flex-row items-center justify-center gap-x-4"}>
                          <Link href="/" className={"hover:bg-zinc-800 p-3 rounded-lg font-semibold"}>Home</Link>
                          <Link href="/dashboard" className={"hover:bg-zinc-800 p-3 rounded-lg font-semibold"}>Dashboard</Link>
                          <Link href="/pricing" className={"hover:bg-zinc-800 p-3 rounded-lg font-semibold"}>Pricing</Link>
                          <Link href="/contact-us" className={"hover:bg-zinc-800 p-3 rounded-lg font-semibold"}>Contact Us</Link>
                          <NavUser user={session.data?.user}/>
                      </div>

                  ) : (

                      <motion.button className="px-5 py-2 rounded-full text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 cursor-pointer" onClick={() => router.push("/sign-in")}>
                          Get Started
                      </motion.button>
                  )
              }
          </div>
          </div>
      </motion.div>
    </div>
  )
}
