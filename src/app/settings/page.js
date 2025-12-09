import Link from "next/link";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getSettings } from "@/lib/services/settings";
import { saveSettingsAction } from "@/app/actions";

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto pb-10">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">Configure your dashboard defaults.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profit Simulator Defaults</CardTitle>
                    <CardDescription>
                        Set the default values that appear when you open the Profit Simulator.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={saveSettingsAction}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Default Selling Price ($)</label>
                                <Input
                                    type="number"
                                    name="sellingPrice"
                                    defaultValue={settings.sellingPrice}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Default Cost Per Unit ($)</label>
                                <Input
                                    type="number"
                                    name="costPrice"
                                    defaultValue={settings.costPrice}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Ad Spend Per Sale ($)</label>
                                <Input
                                    type="number"
                                    name="adSpend"
                                    defaultValue={settings.adSpend}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Shipping Cost ($)</label>
                                <Input
                                    type="number"
                                    name="shipping"
                                    defaultValue={settings.shipping}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4">
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
