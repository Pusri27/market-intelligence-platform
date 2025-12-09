import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { DollarSign, TrendingUp, Package, Search } from "lucide-react";

export function StatsCards({ products = [] }) {
    const totalProducts = products.length;
    if (totalProducts === 0) return null; // Handle empty state safely
    const avgMargin = products.reduce((acc, curr) => acc + curr.margin, 0) / totalProducts;
    const avgGrowth = products.reduce((acc, curr) => acc + curr.growth, 0) / totalProducts;
    const totalSearchVolume = products.reduce((acc, curr) => acc + curr.monthlySearchVolume, 0);

    const stats = [
        {
            title: "Total Products",
            value: totalProducts,
            icon: Package,
            description: "Active products in research",
        },
        {
            title: "Avg. Profit Margin",
            value: `${avgMargin.toFixed(1)}%`,
            icon: DollarSign,
            description: "Across all categories",
        },
        {
            title: "Avg. Growth Rate",
            value: `+${avgGrowth.toFixed(1)}%`,
            icon: TrendingUp,
            description: "Monthly growth trend",
        },
        {
            title: "Total Search Volume",
            value: totalSearchVolume.toLocaleString(),
            icon: Search,
            description: "Monthly searches",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
