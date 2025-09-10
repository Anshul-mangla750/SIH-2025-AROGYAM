import React, { useState } from "react";
import { Moon, Clock, TrendingUp, Calendar, Star, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Sleep() {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState(4);

  const sleepData = [
    { date: "Mon", hours: 8, quality: 5 },
    { date: "Tue", hours: 7, quality: 3 },
    { date: "Wed", hours: 6.5, quality: 3 },
    { date: "Thu", hours: 8.5, quality: 5 },
    { date: "Fri", hours: 6, quality: 2 },
    { date: "Sat", hours: 9, quality: 5 },
    { date: "Sun", hours: 7.5, quality: 4 },
  ];

  const sleepTips = [
    "Maintain a consistent sleep schedule",
    "Create a relaxing bedtime routine",
    "Keep your bedroom cool and dark",
    "Avoid screens 1 hour before bed",
    "Limit caffeine after 2 PM"
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-wellness-blue flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Sleep Tracker</h1>
          </div>
          <p className="text-muted-foreground">Monitor your sleep patterns and improve your rest quality</p>
        </div>

        {/* Today's Sleep Card */}
        <Card className="mb-8 gradient-subtle border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Last Night's Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{sleepHours}h</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= sleepQuality ? "text-wellness-yellow fill-current" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Quality Rating</div>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  Good Sleep
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">Based on duration & quality</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sleep History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Weekly Sleep Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sleepData.map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 text-sm font-medium">{day.date}</div>
                      <div className="flex-1">
                        <Progress value={(day.hours / 10) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{day.hours}h</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= day.quality ? "text-wellness-yellow fill-current" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sleep Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Better Sleep Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sleepTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sleep Goals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Sleep Goals & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-wellness-green/10">
                <div className="text-2xl font-bold text-wellness-green mb-1">8h</div>
                <div className="text-sm text-muted-foreground">Recommended</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold text-primary mb-1">7.2h</div>
                <div className="text-sm text-muted-foreground">Weekly Average</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-wellness-orange/10">
                <div className="text-2xl font-bold text-wellness-orange mb-1">85%</div>
                <div className="text-sm text-muted-foreground">Goal Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Log Sleep Button */}
        <div className="text-center">
          <Button className="gradient-primary text-white px-8 py-3">
            <Plus className="w-5 h-5 mr-2" />
            Log Last Night's Sleep
          </Button>
        </div>
      </main>
    </div>
  );
}