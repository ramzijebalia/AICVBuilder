import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
    // it needs to know which form it really active
    currentStep : string;
    // when we click one of the breadcrumbs link ( form ) we need to update the current step
    setCurrentStep : (step : string) => void; // => void means it doesn't return anything
    showSmallScResumePreview : boolean; // we will use it to show the resume in teh small screens 
    setShowSmallScResumePreview : (show : boolean) => void;
    isSaving : boolean;

}


export default function Footer({currentStep, setCurrentStep , showSmallScResumePreview , setShowSmallScResumePreview , isSaving} : FooterProps) {

    const previousStep = steps.find(
        // find the next step
        (_, index) => steps[index+1]?.key === currentStep
    )?.key

    const nextStep = steps.find(
        // find the next step
        (_, index) => steps[index-1]?.key === currentStep
    )?.key

    return (
        <footer className="w-full border-t px-3 py-5">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3"> 
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" 
                            onClick={previousStep ? () => setCurrentStep(previousStep) : undefined}
                            disabled={!previousStep}
                            > Previous step
                        </Button>
                        <Button
                            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
                            disabled={!nextStep}
                            > Next Step
                        </Button>
                    </div>
                    <Button
                        variant="outline" 
                        size="icon"
                        onClick={() => setShowSmallScResumePreview(!showSmallScResumePreview)}
                        className="md:hidden" // we need only to show this button on sall screens
                        title={showSmallScResumePreview ? "Hide Resume Preview" : "Show Resume Preview"}
                    > 
                        {showSmallScResumePreview ? <PenLineIcon/> : <FileUserIcon/> } 
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" asChild>
                            <Link href="/resumes"> Close</Link>
                        </Button>
                        <p className={cn("text-muted-foreground opacity-0" , 
                            isSaving && "opacity-100" // if we are saving we will show the text
                        )}>Saving ...</p>
                    </div>
                </div>
            </footer>
    )}
        