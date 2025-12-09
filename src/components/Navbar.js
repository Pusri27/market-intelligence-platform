"use client";

import { Bell, Search, Menu, Settings } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?search=${encodeURIComponent(query)}`);
            setQuery("");
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4 lg:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 h-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="/settings">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </Link>
                <button className="relative rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600"></span>
                </button>
                <div className="h-8 w-8 rounded-full bg-primary/20" />
            </div>
        </header>
    );
}
