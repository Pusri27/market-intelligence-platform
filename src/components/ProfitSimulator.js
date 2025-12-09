"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfitSimulator() {
    const [values, setValues] = useState({
        sellingPrice: 0,
        costPrice: 0,
        adSpend: 0,
        shipping: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                setValues(data);
                setLoading(false);
            })
            .catch(() => {
                // Fallback
                setValues({
                    sellingPrice: 29.99,
                    costPrice: 8.50,
                    adSpend: 10.00,
                    shipping: 4.00
                });
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const revenue = values.sellingPrice;
    const totalCost = values.costPrice + values.adSpend + values.shipping;
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    if (loading) return <Card className="h-[400px] animate-pulse"><CardContent className="h-full bg-muted/20" /></Card>;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Profit Simulator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Selling Price</label>
                        <Input
                            type="number"
                            name="sellingPrice"
                            value={values.sellingPrice}
                            onChange={handleChange}
                            className="h-8"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Product Cost</label>
                        <Input
                            type="number"
                            name="costPrice"
                            value={values.costPrice}
                            onChange={handleChange}
                            className="h-8"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Ad Spend (CPA)</label>
                        <Input
                            type="number"
                            name="adSpend"
                            value={values.adSpend}
                            onChange={handleChange}
                            className="h-8"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Shipping</label>
                        <Input
                            type="number"
                            name="shipping"
                            value={values.shipping}
                            onChange={handleChange}
                            className="h-8"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Net Profit</span>
                        <span className={cn("text-lg font-bold", profit >= 0 ? "text-green-600" : "text-destructive")}>
                            ${profit.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Margin</span>
                        <span className={cn("text-sm font-bold", margin >= 20 ? "text-green-600" : "text-yellow-600")}>
                            {margin.toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-1">
                        <div
                            className={cn("h-full transition-all duration-300", profit >= 0 ? "bg-green-500" : "bg-red-500")}
                            style={{ width: `${Math.min(Math.max(margin, 0), 100)}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-2">
                    <Link href="/settings" className="text-xs text-muted-foreground underline hover:text-foreground">
                        Configure Defaults
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
