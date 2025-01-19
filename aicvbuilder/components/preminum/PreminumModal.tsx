// since w use a hook here so we need to tuen it into client compoennet
"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePreminumModal from "@/hooks/usePreminumModal";


const PreminumFreatures = ["AI tools", "Up to 3 Resumes"]
const PreminumPlusFreatures = ["Unlimited Resumes", "Design Customizations"]

export default function PreminumModal() {
    const {open , setOpen} = usePreminumModal()
    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                            <Button>Get Preminum</Button>
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
                                <Button variant="preminum">Get Preminum Plus</Button>
                            </div>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
)}