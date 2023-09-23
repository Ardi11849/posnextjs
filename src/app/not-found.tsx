import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20">
      <img src="/img/404.svg" alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4">Page not found</h4>
        <div className="text-slate-600 dark:text-slate-300 text-base font-normal mb-10">
          The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
      <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}