import Link from "next/link";
import { LayoutDashboard, ShoppingBag, PieChart, Settings, LogOut } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="hidden border-r border-border bg-card lg:flex lg:w-64 lg:flex-col fixed top-0 bottom-0 left-0">
            <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl">DropDash</span>
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                    <ShoppingBag className="h-5 w-5" />
                    Products
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                    <PieChart className="h-5 w-5" />
                    Analytics
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                    <Settings className="h-5 w-5" />
                    Settings
                </Link>
            </nav>
            <div className="border-t border-border p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
