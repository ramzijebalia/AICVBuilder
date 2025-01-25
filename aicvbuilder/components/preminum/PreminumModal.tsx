// since w use a hook here so we need to tuen it into client compoennet
"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePreminumModal from "@/hooks/usePreminumModal";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "./actions";


const PreminumFreatures = ["AI tools", "Up to 3 Resumes"]
const PreminumPlusFreatures = ["Unlimited Resumes", "Design Customizations"]

export default function PreminumModal() {
    const {open , setOpen} = usePreminumModal()
    
    const {toast} = useToast()

    const [loading, setLoading] = useState(false)

    async function handlePreminumClick(priceId : string){
        try {
            setLoading(true)
            // redirect url to the stripe checkout page
            const redirectUrl = await createCheckoutSession(priceId)
            window.location.href = redirectUrl!
            
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                description : "Something went wrong, please try again later",
            })
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <Dialog open={open} 
            onOpenChange={(open) => {
                if(!loading){
                    setOpen(open)
                }
            }}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upgrade to Preminum</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <p>Get a Preminum subscription to unlock more features ...</p>
                    <div className="flex">
                        <div className="flex w-1/2 flex-col space-y-5">
                            <h3 className="text-center text-lg font-bold">Preminum</h3>
                            <ul className="space-y-2">
                                {PreminumFreatures.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500"/>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => handlePreminumClick(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!)}
                                disabled={loading}
                            >
                                Get Preminum
                            </Button>
                        </div>
                        <div className="boredr-l mx-6"/>
                            <div className="flex w-1/2 flex-col space-y-5">
                                <h3 className="text-center text-lg font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Preminum Plus</h3>
                                <ul className="space-y-2">
                                        {PreminumPlusFreatures.map(feature => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <Check className="size-4 text-green-500"/>
                                                {feature}
                                            </li>
                                        ))}
                                </ul>
                                <Button 
                                    variant="preminum"
                                    onClick={() => handlePreminumClick(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!)}
                                    disabled={loading}
                                >
                                    Get Preminum Plus
                                </Button>
                            </div>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
)}