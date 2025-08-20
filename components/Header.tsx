'use client'

import { NAVBAR_ITEMS } from '@/lib/app.settings';

export default function Header() {
  return (
    <header className="fixed w-full z-[9999999] mt-6 left-0 top-6">
      <div className="relative flex items-center justify-center-safe overflow-hidden">
        <div className="w-auto relative border border-neutral-800 shadow">
          <div className="bg-indigo-500/50 border-b border-neutral-800 text-xs tracking-[0.3em] text-dark p-3 text-center leading-none uppercase font-medium backdrop-blur-[1.5rem] backdrop-saturate-[1.1]">
            -•- Malik Zubayer Ul Haider -•-
          </div>
          {/* navbar items */}
          <ul className="flex items-center bg-[rgba(255,255,255,0.50)] backdrop-blur-[1.5rem] backdrop-saturate-[1.1]">
            {NAVBAR_ITEMS.map((item, index) => (
              <li key={index} className="first:pl-2 last:pr-2 text-xs font-medium leading-none tracking-[0.3em] text-dark uppercase inline-block transition-colors hover:text-neutral-900 cursor-pointer">
                <a href={item.href} className='inline-block py-3 px-4 hover:-translate-y-0.5 transition-transform'>
                  {item.name}
                </a> {index < (NAVBAR_ITEMS.length - 1) ? ' • ' : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}