import Button from '@/components/ui/Button';
import { PROJECT_ICON } from '@/lib/icons';
import Image from 'next/image';

const PROJECTS = [{
  id: 1,
  tag: "A blog website",
  name: "Keys & Quests.",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illum iste asperiores aliquid eum minima tenetur aliquam dolores pariatur neque!",
  stack: ["React", "Next.js", "TailwindCSS"],
  url: "***.vercel.com"
},{
  id: 2,
  tag: "Text Project",
  name: "Text Project",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illum iste asperiores aliquid eum minima tenetur aliquam dolores pariatur neque!",
  stack: ["React", "Next.js", "TailwindCSS"],
  url: "***.vercel.com"
},{
  id: 3,
  tag: "Text Project",
  name: "Text Project",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illum iste asperiores aliquid eum minima tenetur aliquam dolores pariatur neque!",
  stack: ["React", "Next.js", "TailwindCSS"],
  url: "***.vercel.com"
}]

export default function Projects() {

  return (
    <section className="w-full scroll-m-18" id="projects">
      <div className="max-w-screen-lg mx-auto">
        <div className='px-4 py-8'>
          {/* <PROJECT_ICON className='mb-10' /> */}
          <h2 className="mb-3">Projects.</h2>
          <h3 className='mb-6'>A selection of <br />recent works</h3>
        </div>
        <div className="flex flex-col gap-6">
          {PROJECTS.map(p => (
            <div className="grid grid-cols-3 items-center" key={p.id}>
              <div className='p-4 relative'>
                <h4 className='text-2xl text-dark mb-1'>{p.name}</h4>
                {/* <h6 className="text-xl text-shade opacity-50 mb-4">{p.tag}</h6> */}
                <p className='text-base text-shade leading-5 mb-4'>{p.desc}</p>
                <div className='flex items-center gap-2 mb-4'>
                  {p.stack.map(s => (
                    <span className='text-xs border border-shade rounded text-shade leading-none px-2 py-1' key={s}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    Live Site
                  </a>
                  <a href="#" className="btn-secondary">
                    Github
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className='col-span-2 p-1 h-full'>
                <Image
                  src="https://images.unsplash.com/photo-1634245482394-1bcf5ccffcc0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={p.name}
                  height={370}
                  width={700}
                  objectFit='cover'
                  className="aspect-16/9"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button>MORE PROJECTS</Button>
        </div>
      </div>
    </section>
  )
}
