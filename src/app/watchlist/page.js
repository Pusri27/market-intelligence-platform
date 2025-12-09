import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getWatchlistIds } from "@/lib/services/watchlist";
import productsData from "@/data/products.json";
import { toggleWatchlistAction } from "@/app/actions";

export default async function WatchlistPage() {
    const watchlistIds = await getWatchlistIds();
    const watchlistProducts = productsData.filter(p => watchlistIds.includes(p.id));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
                    <p className="text-muted-foreground">Tracking {watchlistIds.length} products.</p>
                </div>
            </div>

            {watchlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold">Your watchlist is empty</h2>
                    <p className="text-muted-foreground mt-2 mb-6">Start research to add products here.</p>
                    <Link href="/">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {watchlistProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                            <div className="relative h-48 w-full bg-muted">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                />
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                                    </div>
                                    <form action={toggleWatchlistAction.bind(null, product.id, false)}>
                                        <Button type="submit" variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="p-2 bg-secondary rounded">
                                        <p className="text-muted-foreground text-xs">Margin</p>
                                        <p className="font-bold">{product.margin}%</p>
                                    </div>
                                    <div className="p-2 bg-secondary rounded">
                                        <p className="text-muted-foreground text-xs">Growth</p>
                                        <p className="font-bold text-green-600">+{product.growth}%</p>
                                    </div>
                                </div>

                                <Link href={`/products/${product.id}`} className="block">
                                    <Button variant="outline" className="w-full mt-2">
                                        View Analysis <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
