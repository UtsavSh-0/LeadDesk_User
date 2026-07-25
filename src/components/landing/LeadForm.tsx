'use client';

import { useState, type FormEvent, useCallback } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Send, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "./SectionHeading";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().trim().min(10, "Please share a few details").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function LeadForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const data = {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        budget,
        message: String(fd.get("message") ?? ""),
      };
      const res = schema.safeParse(data);
      if (!res.success) {
        const next: Errors = {};
        for (const issue of res.error.issues) {
          next[issue.path[0] as keyof Errors] = issue.message;
        }
        setErrors(next);
        toast.error("Please fix the highlighted fields");
        return;
      }
      setErrors({});
      setSubmitting(true);

      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          if (payload?.fieldErrors) {
            setErrors(payload.fieldErrors as Errors);
          }
          toast.error(payload?.error ?? 'Failed to submit. Please try again.');
          return;
        }

        setSubmitted(true);
        toast.success("Lead captured! Your inquiry was saved.");
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Network error. Please check your connection and try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [budget],
  );

  return (
    <section id="contact" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Try it live"
          title="Capture your first lead in 30 seconds"
          subtitle="Fill out the form like a real prospect would. You'll see exactly what your team gets on the other side."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-2 text-center"
              >
                <motion.div
                  initial={{ scale: 0.6, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 14 }}
                  className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                >
                  <CheckCircle2 className="h-7 w-7" />
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  This is exactly what your team will see
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  In a live LeadDesk workspace, that submission would be routed, assigned, and
                  visible to your whole team — instantly.
                </p>
                <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
                  {[
                    "Lead successfully captured",
                    "Appears instantly in the admin dashboard",
                    "Ready for your sales team to action",
                  ].map((line, i) => (
                    <motion.li
                      key={line}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-lg border border-emerald-200/60 bg-emerald-50/50 px-3 py-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {line}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button className="shadow-lift">Create Free Workspace</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setBudget("");
                    }}
                  >
                    Capture another lead
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name" error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Jane Cooper"
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Work email" id="email" error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@yourcompany.com"
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Budget" id="budget" error={errors.budget} className="sm:col-span-2">
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger id="budget" aria-invalid={!!errors.budget}>
                      <SelectValue placeholder="What's your approximate budget?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                      <SelectItem value="25k-50k">₹25,000 – ₹50,000</SelectItem>
                      <SelectItem value="50k-1L">₹50,000 – ₹1,00,000</SelectItem>
                      <SelectItem value="1L+">₹1,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tell us about your project" id="message" error={errors.message} className="sm:col-span-2">
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Goals, timeline, team size — a couple of sentences is perfect."
                    aria-invalid={!!errors.message}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-lift"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending your inquiry…
                      </>
                    ) : (
                      <>
                        Submit Inquiry <Send className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" /> We never share your information. Encrypted in transit and at rest.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
