// thsi si the Resume page ("/resumes")

// the () in the (main) , folders with parentheses are so-called route groups in next js
//  they are ignored by the server and are not part of the url
// /resumes/page.tsx is a route group  ( the main folder does not count)


import { Button } from "@/components/ui/button"
import { PlusSquare } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata : Metadata = {
    title : "Your Resumes" // the title of the page
}


export default function Page() {
    return (
    <main className="maw-w-7xl mx-auto w-full px-3 py-6 space-y-6"> 
        <Button asChild className="mx-auto flex w-fit gap-2">  
            {/* asChild :  tell shadcn to not render a button , instead it render a link that look like a button*/}
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New Resume
            </Link>
        </Button>
    </main>
)}
