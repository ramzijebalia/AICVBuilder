// thsi layout will be applied to all the pages inside the (main) folder ( the main group)
import PreminumModal from "@/components/preminum/PreminumModal"
import Navbar from "./Navbar"

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div className="flex min-h-screen flex-col"> 
            <Navbar />
            {children}
            <PreminumModal />
        </div>
)


}