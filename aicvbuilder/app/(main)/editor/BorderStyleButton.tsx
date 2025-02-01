import { Button } from "@/components/ui/button";
import usePreminumModal from "@/hooks/usePreminumModal";
import { Circle, Square, Squircle } from "lucide-react";
import { userSubscriptionLevel } from "../SubscriptionLevelProvider";
import { canUseCustomizations } from "@/lib/permissions";

export const BorderStyles = {
    SQUARE : "square",
    CIRCLE : "circle",
    SQUIRCLE : "squircle",
}

// turn teh BorderStyles object into an array of strings
const borderStyles = Object.values(BorderStyles)

interface BorderStyleButtonProps {
    borderStyle : string | undefined ;
    onChange : (borderStyle : string) => void
}
export default function BorderStyleButton({borderStyle , onChange} : BorderStyleButtonProps){

    const subscriptionLevel = userSubscriptionLevel()
    const premiumModal = usePreminumModal()

    function handleClick(){
        if(!canUseCustomizations(subscriptionLevel)){
            premiumModal.setOpen(true)
            return
        }
        // find the index of the current border style
        const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
        // thsi to make sure that we will not go out of the array and to go to the first element (3+1)%3 = 1 , return to the first element
        const nextIndex = (currentIndex + 1) % borderStyles.length
        onChange(borderStyles[nextIndex])
    }

    const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

    return (
        <Button 
            variant="outline"
            size="icon"
            title="Change Border Style"
            onClick={handleClick}
        >
            <Icon className="size-5"/>
        </Button>
)}