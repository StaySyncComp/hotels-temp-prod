import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CallsHeatmap() {
  return (
    <Card className="bg-surface/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>Calls Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Heatmap coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );
}
