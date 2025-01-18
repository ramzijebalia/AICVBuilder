// thsi is our Home page ( "/")

import Image from "next/image";
import logo from "@/public/assets/logo.png";
import resumePreview from "@/public/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-gray-900 text-center md:start md:flex-row lg:gap-12">
      <div className="items-center max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create a{" "}
          {/* bg-gradient-to-r : gradient from left to right */}
          {/* bg-clip-text : clip the gradient to the text */}
          {/* text-transparent : make the text transparent */}
          <span className="inline-bloc bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"> Perfect Resume</span>
          {" "} in Minutes
        </h1>
        <p className="text-lg text-gray-700">
          <span className="font-bold">AICVBuilder</span> is a free online resume builder that helps you create a
          professional and eye-catching resume in minutes.
        </p>
        <Button asChild size="lg" variant="preminum"> 
          <Link href="/resumes"> Get Started</Link>
        </Button>
      </div>
      <div>
        <Image 
          src={resumePreview} 
          alt="Resume Preview" 
          width={500} 
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
