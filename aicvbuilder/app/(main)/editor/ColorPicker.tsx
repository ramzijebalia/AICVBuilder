// docs : https://casesandberg.github.io/react-color/
// shadcn popover :  https://ui.shadcn.com/docs/components/popover

import { Button } from "@/components/ui/button";
import { Popover , PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";

interface ColorPickerkerProps {
    color : Color | undefined ;
    onChange : ColorChangeHandler
}
export default function ColorPicker({color , onChange} : ColorPickerkerProps){
    const [showPopover , setShowPopover] = useState(false)
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline"
                    size="icon"
                    title="Change Resume color"
                    onClick={() => {
                        setShowPopover(true)
                    }}
                >
                    <PaletteIcon className="size-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none" align="end">
                <TwitterPicker color={color} onChange={onChange} triangle="top-right"/>
            </PopoverContent>
        </Popover>
)}