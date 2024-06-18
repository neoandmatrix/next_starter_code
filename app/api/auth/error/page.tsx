"use client"
 
import Link from "next/link"

 
export default function AuthErrorPage() {
 
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
          !!!! Something went wrong
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {"Please contact us if this error persists."}
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/signin" className="underline font-semibold">
            Try login again
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/contact" className="font-semibold hover:font-extrabold">
            Contact Us 
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  )
}