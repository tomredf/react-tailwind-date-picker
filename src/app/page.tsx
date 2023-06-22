"use client"
import Link from "next/link";
import DatePicker from "@/Components/DatePicker";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <h1 className={'}flex text-left text-2xl font-bold'}>
            React Tailwind CSS Date Picker Component&nbsp;
          </h1>
          <h2 className={'}text-left py-4'}>Based on the amazing Pine UI from <Link className={'underline font-bold-bold hover:text-orange-500'} target={'_blank'} href="https://devdojo.com/pines/docs/date-picker">DevDojo</Link></h2>

          <DatePicker />
          <p className={'}mt-2 text-center text-xs leading-5 text-zinc-400 hover:text-orange-500'}>
            <Link target={'_blank'} href="https://github.com/tomredf/react-tailwind-date-picker.git">View on Github</Link>
          </p>
          <p className={'mt-2 text-center text-xs leading-5 text-zinc-400 hover:text-orange-500'}>
            <Link target={'_blank'} href="https://clarasoftware.com">© {new Date().getFullYear()} Clara Software (Dermot Fitzpatrick) All rights reserved. </Link>
          </p>

        </div>
      </main>
  )
}
