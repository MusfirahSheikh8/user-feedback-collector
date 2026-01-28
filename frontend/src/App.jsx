import React, { useEffect } from "react";
import FeedbackForm from "./features/feedback/FeedbackForm";
import FeedbackList from "./features/feedback/FeedbackList";
import { useDispatch } from "react-redux";
import { setAll } from "./features/feedback/feedbackSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE || "http://localhost:4000"}/feedback`
    )
      .then((r) => r.json())
      .then((data) => dispatch(setAll(data)))
      .catch((err) => console.error("Failed to load feedback", err));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-zinc-900 text-slate-100 flex items-center justify-center p-10">
      <Card className="w-full max-w-5xl bg-slate-900/70 backdrop-blur border-slate-800 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-100">
            User Feedback Collector
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FeedbackForm />
          <FeedbackList />
        </CardContent>
      </Card>
    </div>
  );
}

