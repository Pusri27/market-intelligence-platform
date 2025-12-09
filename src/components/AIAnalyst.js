import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

export function AIAnalyst({ products = [] }) {
    if (!products || products.length === 0) return null;

    const topGrowth = products.reduce((prev, current) => (prev.growth > current.growth) ? prev : current, products[0] || {});
    const topMargin = products.reduce((prev, current) => (prev.margin > current.margin) ? prev : current, products[0] || {});
    const lowCompetition = products.filter(p => p.competitionScore < 0.4);

    return (
        <Card className="border-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-950/10">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">AI Analyst Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm">
                    <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <p className="font-medium text-foreground">🚀 Viral Opportunity</p>
                        <p className="text-muted-foreground mt-1">
                            <span className="font-semibold text-foreground">{topGrowth.name}</span> is showing explosive growth of <span className="text-green-600">+{topGrowth.growth}%</span> this month. It's a prime candidate for scaling ads.
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <p className="font-medium text-foreground">💰 High Margin Alert</p>
                        <p className="text-muted-foreground mt-1">
                            <span className="font-semibold text-foreground">{topMargin.name}</span> offers the best margins at <span className="text-green-600">{topMargin.margin}%</span>. Consider bundling this with lower margin items.
                        </p>
                    </div>
                    {lowCompetition.length > 0 && (
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                            <p className="font-medium text-foreground">🛡️ Low Competition Niche</p>
                            <p className="text-muted-foreground mt-1">
                                We found {lowCompetition.length} products with low competition scores, including <span className="font-semibold text-foreground">{lowCompetition[0].name}</span>. Easier to rank for SEO.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
