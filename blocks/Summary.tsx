import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

function Bold({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={clsx("text-dark font-normal", className)}>{children}</span>
  )
}

function Badge({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={clsx(
      className,
      "absolute tracking-wide rounded-lg px-3 py-1",
      "block text-xs font-medium whitespace-nowrap",
      "text-shade border border-neutral-200"
    )}>
      {children}
    </div>
  )
}

export default function Summary() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-screen py-48">
        <div className='relative rounded-full p-2 border border-neutral-200 mb-12'>
          <Image src="/images/headshot.jpg" alt="Malik Zubayer headshot" height={128} width={128} className="rounded-full" />

          <div className="aboslute z-0 w-full h-full">
            <Badge className="top-0 left-full">Critical Thinker</Badge>
            <Badge className="top-1/2 -translate-y-1/2 left-full ml-6">Strategic Innovator</Badge>
            <Badge className="bottom-0 left-full">Scalability Designer</Badge>

            <Badge className="top-0 right-full">Problem Solver</Badge>
            <Badge className="top-1/2 -translate-y-1/2 right-full mr-6">Strategic Innovator</Badge>
            <Badge className="bottom-0 right-full">Systems Architect</Badge>
          </div>
        </div>
        <motion.h1 className="text-dark text-4xl text-center mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          Impact driven Software Engineer <br />
          turning ideas into action
        </motion.h1>
        <motion.p className="font-light text-shade text-lg max-w-md text-center tracking-wide">
          Software Engineer with <Bold>10+ years</Bold> of experience in building scalable web products. Software Engineer <Bold>@CloudlyIO</Bold>. Based in Dhaka.
        </motion.p>

      </section>
    </>
  )
}
