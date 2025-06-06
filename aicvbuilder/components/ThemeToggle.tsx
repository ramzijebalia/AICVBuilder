"use client"
// Dropdownmenu shadcn docs : https://ui.shadcn.com/docs/components/dropdown-menu
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuItem , DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {  Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const {setTheme } = useTheme();
    
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild> 
            <Button variant="ghost" size="icon"> {/* ghost variant is a button with no background and no border */}
                <Sun className="text-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/> {/* shadcn docs*/}
                <Moon className="text-[1.2rem] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                <span className="sr-only"> Toggle Theme</span> {/* sr-only is a class that hide the text from the screen but not from the screen readers */}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end"> 
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);}