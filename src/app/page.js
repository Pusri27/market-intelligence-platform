import { TrendChart } from "@/components/TrendChart";
import { ProductTable } from "@/components/ProductTable";
import { StatsCards } from "@/components/StatsCards";
import { AIAnalyst } from "@/components/AIAnalyst";
import { ProfitSimulator } from "@/components/ProfitSimulator";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import products from "@/data/products.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <ExecutiveSummary />

      <MotionDiv className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">
              Real-time market analysis and product opportunities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: Just now</span>
          </div>
        </div>

        <StatsCards products={products} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TrendChart products={products} />
            <AIAnalyst products={products} />
          </div>
          <div className="space-y-6">
            <ProfitSimulator />
            <CompetitorAnalysis products={products} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Trending Products</h2>
          <ProductTable products={products} />
        </div>
      </MotionDiv>
    </div>
  );
}
