"use client";

import { useState, useOptimistic, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendChart } from "@/components/TrendChart";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import products from "@/data/products.json";
import { use } from "react";
import { toggleWatchlistAction } from "@/app/actions";
// In a real app we'd fetch this via a server component/service, but for mixed client component we'll just import JSON directly for speed
// or better yet, pass data down. But user wants a client component upgrade.

export default function ProductPage({ params }) {
    // Client component needs to unwrap params with use() in Next.js 15+, but let's stick to async/await pattern if possible or component conversion. 
    // Wait, I can't make the whole page client component easily if it was async. 
    // Actually Next.js 13+ allows client components to receive props from server. But here `params` is a promise in the newest versions.
    // I'll make a wrapper or just use standard client component pattern and find product in client for simplicity of this demo "backend" integration.

    // Actually, to support "Add to Watchlist" interactive button, the button itself should be a client component, while the page remains server.
    // But for speed, I'll switch this page to client-side data finding since products.json is available to bundle.

    const { id: paramId } = use(params);
    const id = parseInt(paramId);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div className="p-10">Product not found</div>;
    }

    // Optimistic UI state
    const [isAdded, setAdded] = useState(false);
    const [optimisticAdded, addOptimisticAdded] = useOptimistic(
        isAdded,
        (state, newItem) => newItem
    );

    const handleToggle = async () => {
        startTransition(() => {
            addOptimisticAdded(!isAdded);
        });

        // Call Server Action
        const result = await toggleWatchlistAction(product.id, !isAdded);
        if (result.success) {
            setAdded(!isAdded);
        }
    };

    const productArray = [product];

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Badge variant="secondary">{product.category}</Badge>
                        <span>• ID: #{product.id}</span>
                    </div>
                </div>
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                    onClick={handleToggle}
                    variant={optimisticAdded ? "secondary" : "default"}
                >
                    {optimisticAdded ? <><Check className="mr-2 h-4 w-4" /> Watchlisted</> : "Add to Watchlist"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Product Image & Key Info */}
                <Card className="md:col-span-1 border-border">
                    <div className="aspect-square relative overflow-hidden rounded-t-xl bg-muted">
                        {/* Placeholder since we don't have real images yet */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                            Product Image
                        </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Rating</span>
                            <div className="flex items-center gap-1 font-medium">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {product.rating}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Search Volume</span>
                            <span className="font-bold">{product.monthlySearchVolume.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Growth</span>
                            <span className="text-green-600 font-bold">+{product.growth}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Competition</span>
                            <Badge variant={product.competitionScore > 0.6 ? "destructive" : "secondary"}>
                                {product.competitionScore > 0.6 ? "High" : "Low"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Charts & Deep Dive */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Growth Trend Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <TrendChart products={productArray} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CompetitorAnalysis products={productArray} />
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Keywords</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {/* Dummy generated keywords based on name */}
                                    {["best", "cheap", "2025", "reviews", "dropshipping"].map(word => (
                                        <Badge key={word} variant="outline" className="cursor-pointer hover:bg-muted">
                                            {word} {product.name.split(' ')[0]}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
