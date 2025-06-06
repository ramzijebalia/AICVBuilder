import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { GenerateSummary } from "./actions";
import usePreminumModal from "@/hooks/usePreminumModal";
import { userSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { canUseAITools } from "@/lib/permissions";

interface GenaerateSummaryButtonProps {
    resumeData : ResumeValues
    onSummaryGenerated : (summary : string) => void
}

export default function GenerateSummaryButton({resumeData , onSummaryGenerated} : GenaerateSummaryButtonProps){

    const subscriptionLevel = userSubscriptionLevel()
    const premiumModal = usePreminumModal()

    const {toast} = useToast()

    const [loading , setLoading] = useState(false)

    async function handleClick(){
        if(!canUseAITools(subscriptionLevel)){
            premiumModal.setOpen(true)
            return
        }

        try {
            setLoading(true)
            const airesponse = await GenerateSummary(resumeData)
            onSummaryGenerated(airesponse)
            
        } catch (error) {
            console.error(error)
            toast({
                variant : "destructive",
                description : "Something went wrong. please try again",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoadingButton
            variant="outline"
            type="button"
            onClick={handleClick}
            loading={loading}
        >
            <WandSparklesIcon className="size-4"/>
            Generate (AI)
        </LoadingButton>
    )
}