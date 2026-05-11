"use client";

import { useRef, useState } from "react";
import { handleContactForm } from "@/app/actions";
import { contactSchema, type FormState } from "@/lib/contact-form-schema";
import { getFirebaseClient } from "@/lib/firebase";
import { addDocument, COLLECTIONS } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, User, Mail, Phone, MessageSquare, Sparkles, CheckCircle2, Send } from "lucide-react";

const initialState: FormState = {
  message: "",
};

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button 
      type="submit" 
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-7 font-headline text-base font-bold text-white shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/60 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      disabled={pending}
    >
      {/* Animated background overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {pending ? (
        <span className="relative z-10 flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-base">Sending your message...</span>
        </span>
      ) : (
        <span className="relative z-10 flex items-center justify-center gap-3">
          <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <span className="text-base">Send Message</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FormState["errors"]>(undefined);
  const [fields, setFields] = useState<FormState["fields"]>(undefined);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setFields(data);
      return;
    }
    setErrors(undefined);
    setPending(true);
    try {
      const fb = getFirebaseClient();
      if (fb?.db) {
        await addDocument(COLLECTIONS.CONTACT_SUBMISSIONS, {
          ...parsed.data,
          createdAt: new Date().toISOString(),
        });
        toast({ title: "Success! 🎉", description: "Thank you for your inquiry! We will get back to you shortly." });
        form.reset();
      } else {
        const result = await handleContactForm(initialState, formData);
        setFields(result.fields);
        setErrors(result.errors);
        if (!result.errors) {
          toast({ title: "Success! 🎉", description: result.message });
          form.reset();
        }
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
      {/* Full Name Field */}
      <div className="group relative space-y-3">
        <Label 
          htmlFor="name" 
          className="flex items-center gap-2 font-headline text-sm font-semibold text-gray-700"
        >
          <div className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
            focusedField === 'name' 
              ? 'bg-orange-500 text-white scale-110' 
              : 'bg-orange-100 text-orange-600'
          }`}>
            <User className="h-3.5 w-3.5" />
          </div>
          Full Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input 
            id="name" 
            name="name" 
            placeholder="Enter your full name" 
            required 
            defaultValue={fields?.name} 
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className="h-14 rounded-xl border-2 border-orange-200/60 bg-white/80 pl-12 font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/20 hover:border-orange-300"
          />
          <User className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
            focusedField === 'name' ? 'text-orange-500' : 'text-gray-400'
          }`} />
        </div>
        {errors?.name && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-600 animate-shake">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100">!</span>
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Email and Phone Grid */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        {/* Email Field */}
        <div className="group relative space-y-3">
          <Label 
            htmlFor="email" 
            className="flex items-center gap-2 font-headline text-sm font-semibold text-gray-700"
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
              focusedField === 'email' 
                ? 'bg-amber-500 text-white scale-110' 
                : 'bg-amber-100 text-amber-600'
            }`}>
              <Mail className="h-3.5 w-3.5" />
            </div>
            Email Address <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="your.email@example.com" 
              required 
              defaultValue={fields?.email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="h-14 rounded-xl border-2 border-amber-200/60 bg-white/80 pl-12 font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20 hover:border-amber-300"
            />
            <Mail className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
              focusedField === 'email' ? 'text-amber-500' : 'text-gray-400'
            }`} />
          </div>
          {errors?.email && (
            <p className="flex items-center gap-2 text-sm font-medium text-red-600 animate-shake">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100">!</span>
              {errors.email[0]}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="group relative space-y-3">
          <Label 
            htmlFor="phone" 
            className="flex items-center gap-2 font-headline text-sm font-semibold text-gray-700"
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
              focusedField === 'phone' 
                ? 'bg-yellow-500 text-white scale-110' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              <Phone className="h-3.5 w-3.5" />
            </div>
            Phone Number
            <span className="text-xs text-gray-500 font-normal">(Optional)</span>
          </Label>
          <div className="relative">
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="+91 12345-67890" 
              defaultValue={fields?.phone}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className="h-14 rounded-xl border-2 border-yellow-200/60 bg-white/80 pl-12 font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 hover:border-yellow-300"
            />
            <Phone className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
              focusedField === 'phone' ? 'text-yellow-500' : 'text-gray-400'
            }`} />
          </div>
          {errors?.phone && (
            <p className="flex items-center gap-2 text-sm font-medium text-red-600 animate-shake">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100">!</span>
              {errors.phone[0]}
            </p>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div className="group relative space-y-3">
        <Label 
          htmlFor="subject" 
          className="flex items-center gap-2 font-headline text-sm font-semibold text-gray-700"
        >
          <div className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
            focusedField === 'subject' 
              ? 'bg-orange-500 text-white scale-110' 
              : 'bg-orange-100 text-orange-600'
          }`}>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          Subject <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input 
            id="subject" 
            name="subject" 
            placeholder="What can we help you with?" 
            required 
            defaultValue={fields?.subject}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            className="h-14 rounded-xl border-2 border-orange-200/60 bg-white/80 pl-12 font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/20 hover:border-orange-300"
          />
          <Sparkles className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
            focusedField === 'subject' ? 'text-orange-500' : 'text-gray-400'
          }`} />
        </div>
        {errors?.subject && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-600 animate-shake">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100">!</span>
            {errors.subject[0]}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="group relative space-y-3">
        <Label 
          htmlFor="message" 
          className="flex items-center gap-2 font-headline text-sm font-semibold text-gray-700"
        >
          <div className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
            focusedField === 'message' 
              ? 'bg-amber-500 text-white scale-110' 
              : 'bg-amber-100 text-amber-600'
          }`}>
            <MessageSquare className="h-3.5 w-3.5" />
          </div>
          Your Message <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Textarea 
            id="message" 
            name="message" 
            placeholder="Tell us more about your solar energy needs, project requirements, or any questions you have..." 
            className="min-h-[160px] rounded-xl border-2 border-amber-200/60 bg-white/80 p-4 pl-12 font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20 hover:border-amber-300 resize-none"
            required 
            defaultValue={fields?.message}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
          />
          <MessageSquare className={`absolute left-4 top-4 h-5 w-5 transition-all duration-300 ${
            focusedField === 'message' ? 'text-amber-500' : 'text-gray-400'
          }`} />
        </div>
        {errors?.message && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-600 animate-shake">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100">!</span>
            {errors.message[0]}
          </p>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="rounded-xl border-2 border-orange-100 bg-gradient-to-br from-orange-50/50 to-amber-50/50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500 mt-0.5" />
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-700">We respect your privacy.</span> Your information is secure and will only be used to respond to your inquiry. We typically respond within 2-4 hours during business hours.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton pending={pending} />
      </div>

      {/* Error Message */}
      {errors && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 animate-shake">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">!</span>
            <p className="text-sm font-medium text-red-600">Please fix the errors above.</p>
          </div>
        </div>
      )}

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </form>
  );
}