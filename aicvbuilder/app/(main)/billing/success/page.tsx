import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    console.log("process.env.NEXT_PUBLIC_BASE_URL" , process.env.NEXT_PUBLIC_BASE_URL)
    return (
        <main className="max-w-7xl mx-auto space-y-6 px-3 py-6 text-center">
            <h1 className="text-3xl font-bold">Billing Success</h1>
            <p> The checkout was successful and your pro account has been activated
                Enjoy !
            </p>
            <Button asChild>
                <Link href="/resumes"> Go to resumes page</Link>
            </Button>
        </main>
)}