import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">

      <div className="max-w-4xl mx-auto text-center relative z-20">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-float">

          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rbg(34,197,94,0.4)]"></span>
          <span className="text-xs text-zinc-300 tracking-wide font-semibold">Version 0.0.1 SNAPSHOT</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-medium tracking-light text-white mb6 leading-[1.1]">
          Multi AI Agent Orchestration Platform
        </h2>

        <p className="text-lg md-text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed mt-2">
          One window with multiple context and structured research.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">

          <Button className="h-11 px-8 cursor-pointer rounded-full bg-white text-black text-sm font-semibold hover:Lbg-zinc-200 transition-all flex items-center gap-2">Start for free <ArrowUpRight className="font-bold"/></Button>
          <Button className="h-11 px-8 cursor-pointer rounded-full bg-white text-black text-sm font-semibold hover:Lbg-zinc-200 transition-all flex items-center gap-2">View a demo</Button>
        </div>
      </div>

      {/*floating chat interface*/}
    </section>
  )
}
