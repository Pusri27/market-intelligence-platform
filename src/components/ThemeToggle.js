"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
    // Simple check for now, can be improved with a context provider
    const [theme, setTheme] = React.useState("light");

    React.useEffect(() => {
        // Check initial preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            // Ideally we check document class
        }
    }, []);

    const toggleTheme = () => {
        // Basic Tailwind Dark Mode strategy: toggle 'dark' class on text-html
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            setTheme("light");
        } else {
            html.classList.add("dark");
            setTheme("dark");
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
