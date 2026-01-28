import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOptimistic, replaceTemp, removeById } from './feedbackSlice'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    const tempId = 'temp-' + Date.now().toString();
    const optimistic = {
      id: tempId,
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      _optimistic: true
    };
    // optimistic update
    dispatch(addOptimistic(optimistic));
    setSubmitting(true);

    try {
      const res = await fetch(API + '/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment, tempId })
      });
      if (!res.ok) throw new Error('Server error');
      const body = await res.json();
      const saved = body.item;
      // replace temp with confirmed item
      dispatch(replaceTemp({ tempId, item: saved }));
      setName('');
      setRating(5);
      setComment('');
    } catch (err) {
      console.error(err);
      // revert optimistic item
      dispatch(removeById(tempId));
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start"
    >
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="md:col-span-1 bg-slate-950/60 border-slate-700 focus:ring-indigo-500"
      />

      <Select
        value={String(rating)}
        onValueChange={(v) => setRating(Number(v))}
      >
        <SelectTrigger className="bg-slate-950/60 border-slate-700">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">⭐ 1 — Poor</SelectItem>
          <SelectItem value="2">⭐ 2 — Fair</SelectItem>
          <SelectItem value="3">⭐ 3 — Good</SelectItem>
          <SelectItem value="4">⭐ 4 — Very Good</SelectItem>
          <SelectItem value="5">⭐ 5 — Excellent</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="md:col-span-2 bg-slate-950/60 border-slate-700 min-h-[42px]"
      />

      <Button
        type="submit"
        disabled={submitting}
        className="md:col-span-4 bg-indigo-600 hover:bg-indigo-500 transition-all"
      >
        {submitting ? "Sending..." : "Send Feedback"}
      </Button>
    </form>
  );
}
