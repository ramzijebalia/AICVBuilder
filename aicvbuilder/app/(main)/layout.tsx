// thsi layout will be applied to all the pages inside the (main) folder ( the main group)
import Navbar from "./Navbar"

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
)


}