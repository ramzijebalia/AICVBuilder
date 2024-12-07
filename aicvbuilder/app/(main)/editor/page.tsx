//we can export the metadat only from server componenet 
// but we need in this componnet we need js feature like state and effect
// for  that we will craete the content of this page in a separate client component and import it here

import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export  const metadata: Metadata = {
    title: "Design Your Resume"
}

export default function Page() {
    return <ResumeEditor />

}