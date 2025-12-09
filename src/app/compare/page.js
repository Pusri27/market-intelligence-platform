"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import productsData from "@/data/products.json";
import { Suspense } from 'react';

function CompareContent() {
    const searchParams = useSearchParams();
    const idsParam = searchParams.get("ids");
    const ids = idsParam ? idsParam.split(',').map(id => parseInt(id)) : [];

    const products = productsData.filter(p => ids.includes(p.id));

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-xl font-semibold">No products selected</h2>
                <Link href="/">
                    <Button className="mt-4">Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const features = [
        { label: "Price", key: "price", format: (v) => `$${(v || 29.99).toFixed(2)}` }, // Mock price
        { label: "Margin", key: "margin", format: (v) => <span className={v > 50 ? "text-green-600 font-bold" : ""}>{v}%</span> },
        { label: "Growth", key: "growth", format: (v) => <span className="text-green-600">+{v}%</span> },
        { label: "Rating", key: "rating", format: (v) => `⭐ ${v}` },
        { label: "Search Vol", key: "monthlySearchVolume", format: (v) => v.toLocaleString() },
        { label: "Competition", key: "competitionScore", format: (v) => <Badge variant={v > 0.6 ? "destructive" : "secondary"}>{v > 0.6 ? "High" : "Low"}</Badge> },
        { label: "Category", key: "category", format: (v) => v },
    ];

    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Product Comparison</h1>
                    <p className="text-muted-foreground">Comparing {products.length} products side-by-side.</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr>
                            <th className="p-4 text-left w-[200px] bg-muted/30">Feature</th>
                            {products.map(p => (
                                <th key={p.id} className="p-4 text-left border-l border-border min-w-[200px]">
                                    <div className="flex flex-col gap-2">
                                        <div className="relative h-24 w-full bg-muted rounded overflow-hidden">
                                            <Image src={p.image} alt={p.name} fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                                        </div>
                                        <span className="font-bold text-lg">{p.name}</span>
                                        <Link href={`/products/${p.id}`}>
                                            <Button variant="outline" size="sm" className="w-full">View Details</Button>
                                        </Link>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, i) => (
                            <tr key={feature.key} className={i % 2 === 0 ? "bg-muted/10" : ""}>
                                <td className="p-4 font-medium text-muted-foreground border-b border-border">{feature.label}</td>
                                {products.map(p => (
                                    <td key={p.id} className="p-4 border-l border-b border-border font-medium">
                                        {feature.format(p[feature.key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div>Loading comparison...</div>}>
            <CompareContent />
        </Suspense>
    );
}
