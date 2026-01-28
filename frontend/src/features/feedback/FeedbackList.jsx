import React from 'react';
import { useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function FeedbackList() {
  const items = useSelector(state => state.feedback.items || []);

  if (!items.length)
    return (
      <p className="text-center text-slate-400">
        No feedback yet — be the first!
      </p>
    );

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const optimistic = item._optimistic;

        return (
          <Card
            key={item.id}
            className={`p-4 bg-slate-950/50 border-slate-800 transition-all hover:border-indigo-500/40 hover:shadow-lg ${optimistic ? "opacity-60 animate-pulse" : ""
              }`}
          >
            <div className="flex items-start justify-between gap-4">

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg capitalize">
                    {item.name}
                  </h3>

                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  >
                    <Star className="h-3 w-3 fill-indigo-400" />
                    {item.rating}/5
                  </Badge>
                </div>

                {item.comment && (
                  <p className="text-slate-400 mt-1">{item.comment}</p>
                )}
              </div>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            <Separator className="mt-4 bg-slate-800" />
          </Card>
        );
      })}
    </div>
  );
}