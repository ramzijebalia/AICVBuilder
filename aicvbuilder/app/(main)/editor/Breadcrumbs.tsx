// breadcrumbs shadcn docs : https://ui.shadcn.com/docs/components/breadcrumb

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";


interface BreadcrumbsProps {
    // it needs to know which form it really active
    currentStep : string;
    // when we click one of the breadcrumbs link ( form ) we need to update the current step
    setCurrentStep : (step : string) => void; // => void means it doesn't return anything

} 

export default function Breadcrumbs({currentStep, setCurrentStep} : BreadcrumbsProps) {
    // Split steps into two groups
    const firstLineSteps = steps.slice(0, 5); // First 5 steps
    const secondLineSteps = steps.slice(5); // Remaining steps

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        {firstLineSteps.map(step => (
                            <React.Fragment key={step.key}>
                                <BreadcrumbItem>
                                    {step.key === currentStep ? (
                                        <BreadcrumbPage>{step.title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <button onClick={() => setCurrentStep(step.key)}>
                                                {step.title}
                                            </button>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="last:hidden"/>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex justify-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        {secondLineSteps.map(step => (
                            <React.Fragment key={step.key}>
                                <BreadcrumbItem>
                                    {step.key === currentStep ? (
                                        <BreadcrumbPage>{step.title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <button onClick={() => setCurrentStep(step.key)}>
                                                {step.title}
                                            </button>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="last:hidden"/>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}