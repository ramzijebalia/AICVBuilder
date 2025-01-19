// we will use zuztand to manage the state of the preminum modal beacuse wa need to use it a lot in many files
// and it will be repetetiv eif we repeat teh same code in many files  
// ( to create a use state in amny files to show and hide the preminum modal )
// it is a way to trigger the premnim dialog  anywhere
// zuztand docs ; https://github.com/pmndrs/zustand
import {create} from "zustand"

interface PreminumModal {
    open: boolean
    setOpen: (open: boolean) => void
}

const usePreminumModal = create<PreminumModal>(set => ({
    open : false,
    setOpen : open => set({open})
}))

export default usePreminumModal