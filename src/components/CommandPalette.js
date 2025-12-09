"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Monitor, Moon, Sun, Laptop, Calculator, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command) => {
        setOpen(false);
        command();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm transition-all">
            <Command className="w-full max-w-lg overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                    <Command.Group heading="Navigation">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/"))}
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                        >
                            <Monitor className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/#products"))}
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search Products</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Tools">
                        <Command.Item
                            disabled
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground opacity-50"
                        >
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>Profit Calculator (Cmd+P)</span>
                        </Command.Item>
                        <Command.Item
                            disabled
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground opacity-50"
                        >
                            <Brain className="mr-2 h-4 w-4" />
                            <span>AI Insights (Cmd+I)</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Theme">
                        <Command.Item
                            onSelect={() => runCommand(() => { })} // Hook up to actual theme toggle later
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                        >
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Light Mode</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => { })}
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                        >
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Dark Mode</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        </div>
    );
}
