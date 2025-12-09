"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CompetitorAnalysis({ products }) {
    // Use the first product (if single) or find top product
    const topProduct = products[0] || {};

    // Seeded random-like generation based on ID
    const seed = topProduct.id || 1;
    const competitors = [
        {
            name: `Shopify Store #${seed * 12}`,
            price: `$${(20 + (seed * 3) % 40).toFixed(2)}`,
            rating: 4.0 + ((seed % 10) / 10),
            reviews: 50 + (seed * 120),
            platform: "Shopify",
        },
        {
            name: `Amazon Seller ${(seed * 45).toString().slice(0, 4)}`,
            price: `$${(18 + (seed * 2) % 35).toFixed(2)}`,
            rating: 3.5 + ((seed % 15) / 10),
            reviews: 200 + (seed * 80),
            platform: "Amazon",
        },
        {
            name: `Retail Plus`,
            price: `$${(25 + (seed * 4) % 50).toFixed(2)}`,
            rating: 4.5,
            reviews: 1200 + (seed * 10),
            platform: "Retail",
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Top Competitors for {topProduct.name}
                    <Badge variant="outline">Niche Leader</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {competitors.map((comp, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 relative overflow-hidden rounded bg-muted flex items-center justify-center text-xs text-muted-foreground font-bold">
                                    {comp.name.slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{comp.name}</p>
                                    <p className="text-xs text-muted-foreground">{comp.platform}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">{comp.price}</p>
                                <p className="text-xs text-muted-foreground">⭐ {comp.rating.toFixed(1)} ({comp.reviews})</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 text-xs flex items-center justify-center gap-1 text-muted-foreground hover:text-foreground">
                    View All Competitors <ExternalLink className="h-3 w-3" />
                </button>
            </CardContent>
        </Card>
    );
}
