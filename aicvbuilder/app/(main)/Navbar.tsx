// we dont put the navbar into our root layout (app/layout.tx)
// because we want to have the navbar in all the pages except teh font page and the aurthentification pages
// instead we put the navbar in the (main)/layout.tsx file
"use client";  
// When you add "use client" to a file: The component and its children are executed entirely in the browser (client-side). It has access to browser-specific features like:
// useState useEffect DOM manipulation Event handlers


import Link from "next/link";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";

export default  function Navbar() {
    return (
        <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
)}
