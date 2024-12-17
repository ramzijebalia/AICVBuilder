// teh  text in teh Resume preview keeps its size even the page preview chnag eth size
// we wnat the text size to scale with dimension of the conatainer

import { useEffect, useState } from "react";

// the sheet of papare need to look teh smae at any size
// stack overflow url : 
export default function useDimensions(conatainerRef : React.RefObject<HTMLElement>){
    const [dimensions, setDimensions] = useState({ width: 0, height: 0})

    useEffect(()=>{
        const currentRef = conatainerRef.current

        // fct to get the new width and height
        function getDimensions(){
            return {
            width : currentRef?.offsetWidth || 0 ,
            height : currentRef?.offsetHeight || 0,
            }
        }

        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0]
            // if the netry is defined and the ResizeObserver trigered ( which happen whne the dimensions of teh container that we attatched chnaged ) then we gonna update our state
            if(entry){
                setDimensions(getDimensions())
            }
        })

        // if teh currentref defined then activate teh resizeObserver
        if(currentRef){
            resizeObserver.observe(currentRef)
            // always get the  latest dimension
            setDimensions(getDimensions())

        }

        return () => {
            if(currentRef){
                resizeObserver.unobserve(currentRef)
            }
            resizeObserver.disconnect()
        }
    },[conatainerRef])

    return dimensions


}