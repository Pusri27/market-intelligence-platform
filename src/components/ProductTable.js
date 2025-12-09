"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, Download, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ComparisonView } from "@/components/ComparisonView";
import productsData from "@/data/products.json";
import { cn } from "@/lib/utils";

export function ProductTable() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawSearch = searchParams.get("search") || "";
    const sortKey = searchParams.get("sort") || "growth";
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Note: In a real "Senior" app, this filtering would happen on the server (Suspense boundary).
    // But since we are displaying JSON, we filter here based on URL params.

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        router.replace(`/?${params.toString()}`, { scroll: false });
    };

    const handleSort = (key) => {
        const params = new URLSearchParams(searchParams);
        // basic toggle logic for demo
        if (sortKey === key) {
            params.set("sort", "growth"); // reset to default
        } else {
            params.set("sort", key);
        }
        router.replace(`/?${params.toString()}`, { scroll: false });
    };

    const filteredProducts = productsData.filter(p =>
        p.name.toLowerCase().includes(rawSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(rawSearch.toLowerCase())
    ).sort((a, b) => {
        // Simple desc sort
        return (b[sortKey] || 0) - (a[sortKey] || 0);
    });

    const toggleSelection = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            if (newSelected.size < 4) {
                newSelected.add(id);
            } else {
                alert("Max 4 products allowed for comparison");
                return;
            }
        }
        setSelectedIds(newSelected);
    };

    const selectedProducts = productsData.filter(p => selectedIds.has(p.id));

    return (
        <>
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter products..."
                            className="pl-9 h-9"
                            value={rawSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            Sort: {sortKey}
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                {/* Checkbox Header */}
                                <th className="p-4 w-[50px]">
                                    <div className="h-4 w-4 border border-input rounded bg-background" />
                                </th>
                                <th className="p-4 min-w-[250px] cursor-pointer hover:text-foreground" onClick={() => handleSort('name')}>Product</th>
                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('category')}>Category</th>
                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('margin')}>Margin</th>
                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('growth')}>
                                    <div className="flex items-center gap-1">Growth {sortKey === 'growth' && <ArrowDown className="h-3 w-3" />}</div>
                                </th>
                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('monthlySearchVolume')}>Vol</th>
                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('competitionScore')}>Comp</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="p-4">
                                        <div
                                            className={cn("h-4 w-4 border rounded cursor-pointer flex items-center justify-center", selectedIds.has(product.id) ? "bg-primary border-primary text-primary-foreground" : "border-input bg-background")}
                                            onClick={() => toggleSelection(product.id)}
                                        >
                                            {selectedIds.has(product.id) && <Check className="h-3 w-3" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 relative overflow-hidden rounded bg-muted">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                                />
                                            </div>
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4"><Badge variant="secondary" className="font-normal">{product.category}</Badge></td>
                                    <td className="p-4">{product.margin}%</td>
                                    <td className="p-4 font-medium text-green-600">+{product.growth}%</td>
                                    <td className="p-4">{product.monthlySearchVolume.toLocaleString()}</td>
                                    <td className="p-4">
                                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${product.competitionScore * 100}%` }} />
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link href={`/products/${product.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <ComparisonView
                selectedProducts={selectedProducts}
                onClose={(id) => {
                    if (id) {
                        const newSelected = new Set(selectedIds);
                        newSelected.delete(id);
                        setSelectedIds(newSelected);
                    } else {
                        setSelectedIds(new Set());
                    }
                }}
            />
        </>
    );
}
