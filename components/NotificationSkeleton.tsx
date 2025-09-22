import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

const NotificationSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle>Notifications</CardTitle>
                        <Skeleton className="h-4 w-20" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea>
                        {skeletonItems.map((index) => (
                            <div key={index} className="flex items-start gap-4 p-4 border-b">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                    <div className="pl-6 space-y-2">
                                        <Skeleton className="h-20 w-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

export default NotificationSkeleton;