"use server";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { getProducts } from "@/lib/services/products";
import { TrendingUp, AlertTriangle, DollarSign, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

async function calculateMetrics() {
    const products = await getProducts();

    // Executive Metrics (Business Intelligence)
    const totalTam = products.reduce((acc, p) => acc + (p.monthlySearchVolume * (p.sellingPrice || 50)), 0);
    const avgMargin = products.reduce((acc, p) => acc + p.margin, 0) / products.length;

    // Risk Analysis: Products with High Competition (>0.7) and Low Margin (<50%)
    const highRiskProducts = products.filter(p => p.competitionScore > 0.7 && p.margin < 50);
    const marketOpportunityScore = (products.reduce((acc, p) => acc + p.growth, 0) / products.length).toFixed(1);

    return {
        totalTam: totalTam,
        avgMargin: avgMargin.toFixed(1),
        riskCount: highRiskProducts.length,
        opportunityScore: marketOpportunityScore,
        productCount: products.length
    };
}

export async function ExecutiveSummary() {
    const data = await calculateMetrics();

    return (
        <Card className="mb-8 border-l-4 border-l-primary shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Executive Overview</CardTitle>
                        <CardDescription>Strategic Business Intelligence (BI) Snapshot</CardDescription>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 text-xs font-mono">
                        LIVE METRICS
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Est. Market Cap (TAM)
                        </span>
                        <div className="text-2xl font-bold">
                            ${(data.totalTam / 1000000).toFixed(1)}M
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Market Growth Index
                        </span>
                        <div className="text-2xl font-bold text-green-600">
                            +{data.opportunityScore}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                            <Activity className="h-3 w-3" /> Avg. Gross Margin
                        </span>
                        <div className="text-2xl font-bold">
                            {data.avgMargin}%
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> High Risk Assets
                        </span>
                        <div className="text-2xl font-bold text-red-500">
                            {data.riskCount} <span className="text-sm text-muted-foreground font-normal">/ {data.productCount} SKUs</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
