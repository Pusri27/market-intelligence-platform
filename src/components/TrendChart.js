"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function TrendChart({ products = [] }) {
    if (!products || products.length === 0) return null;

    // Aggregate trends across all products to show a "Market Trend"
    // Assuming trend arrays are all length 12 and represent the last 12 months
    const aggregatedTrend = (products[0]?.trend || []).map((_, index) => {
        return {
            name: `Month ${index + 1}`,
            total: products.reduce((acc, curr) => acc + (curr.trend?.[index] || 0), 0),
        };
    });

    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Market Interest Trend</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={aggregatedTrend}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <Tooltip
                            contentStyle={{ background: 'var(--background)', border: '1px solid var(--border)' }}
                            itemStyle={{ color: 'var(--foreground)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="currentColor" // Use current text color
                            strokeWidth={2}
                            className="stroke-primary"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
