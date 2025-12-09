"use client";

import Link from "next/link";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ComparisonView({ selectedProducts, onClose }) {
    if (selectedProducts.length === 0) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-6 bg-background border-t border-border shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                            {selectedProducts.length}
                        </span>
                        Products Selected for Comparison
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-2">
                    {selectedProducts.map(product => (
                        <Card key={product.id} className="p-4 min-w-[200px] relative">
                            <button
                                onClick={() => onClose(product.id)}
                                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            <p className="font-bold truncate">{product.name}</p>
                            <div className="mt-2 space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Margin</span>
                                    <span className={product.margin > 50 ? "text-green-600 font-medium" : ""}>{product.margin}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Growth</span>
                                    <span className="text-green-600 font-medium">+{product.growth}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Comp.</span>
                                    <span>{product.competitionScore}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <div className="flex flex-col justify-center gap-2 min-w-[150px]">
                        <Link href={`/compare?ids=${selectedProducts.map(p => p.id).join(',')}`}>
                            <Button className="w-full">Compare Full Specs</Button>
                        </Link>
                        <Button variant="outline" className="w-full" onClick={onClose}>Clear All</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
