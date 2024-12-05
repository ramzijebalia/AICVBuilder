// the [[...sign-in]] is a catch all route that will match any path that starts with /sign-in
// beacsue clerk generate many pages related to sign-in 
// for exmaple : /sign-in , /sign-in/forgot-password , /sign-in/reset-password

import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return ( 
    <main className="flex h-screen items-center justify-center p-3">
        <SignIn/>
    </main>
)}
