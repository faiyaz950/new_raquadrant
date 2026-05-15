"use client";

import {
  RotateCcw, ChevronRight, Mail, FileText, ShoppingBag, XCircle,
  PackageCheck, AlertCircle, Gift, RefreshCw, Truck,
} from "lucide-react";
import Link from "next/link";

const LAST_UPDATED = "May 15, 2025";

const sections = [
  { id: "interpretation", label: "Interpretation & Definitions", icon: FileText },
  { id: "cancellation", label: "Order Cancellation Rights", icon: XCircle },
  { id: "conditions", label: "Conditions for Returns", icon: PackageCheck },
  { id: "returning", label: "Returning Goods", icon: Truck },
  { id: "gifts", label: "Gifts", icon: Gift },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export default function ReturnRefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(251,146,60,0.22),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)`,
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-orange-500/15 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

        <div className="container relative mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/15 backdrop-blur-sm px-5 py-2 mb-6">
            <RotateCcw className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-semibold text-orange-100 tracking-wide">Customer Policy</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl mb-4">
            Return &amp; Refund Policy
          </h1>
          <p className="mx-auto max-w-xl text-gray-300 text-base sm:text-lg leading-relaxed">
            Thank you for choosing RaQuadrant Energy. If you are not completely satisfied with your purchase, we&apos;re here to help.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-gray-400">
            <RefreshCw className="h-3.5 w-3.5 text-orange-400" />
            Last updated: {LAST_UPDATED}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500" />
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors font-medium">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-800 font-medium">Return &amp; Refund Policy</span>
          </nav>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Sidebar TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-orange-100 bg-white shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">Contents</p>
                <p className="text-white font-semibold text-sm">Quick Navigation</p>
              </div>
              <nav className="p-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-all hover:bg-orange-50 hover:text-orange-700"
                  >
                    <s.icon className="h-3.5 w-3.5 shrink-0 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <span className="leading-tight">{s.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick info card */}
            <div className="mt-5 rounded-2xl border border-orange-100 bg-white shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-4 border-b border-orange-100">
                <p className="font-semibold text-sm text-gray-800">Key Highlights</p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: "Return Window", value: "14 days" },
                  { label: "Reimbursement", value: "Within 14 days" },
                  { label: "Refund Method", value: "Original payment" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Intro */}
              <div className="border-b border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/40 px-8 py-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-headline text-xl font-bold text-gray-900 mb-2">Our Commitment to You</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Thank you for shopping at RaQuadrant Energy. If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. The following terms are applicable for any products that You purchased with Us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-8 space-y-12 text-gray-700 leading-relaxed">

                {/* Interpretation */}
                <Section id="interpretation" icon={FileText} title="Interpretation and Definitions">
                  <SectionSubtitle>Interpretation</SectionSubtitle>
                  <p className="text-sm">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

                  <SectionSubtitle>Definitions</SectionSubtitle>
                  <p className="text-sm mb-4">For the purposes of this Return and Refund Policy:</p>
                  <DefinitionList items={[
                    { term: "Company", def: `(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to RaQuadrant Energy Solutions, BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, Rajdanga Gardens, Kolkata, West Bengal – 700107.` },
                    { term: "Goods", def: "refer to the items offered for sale on the Service." },
                    { term: "Orders", def: "mean a request by You to purchase Goods from Us." },
                    { term: "Service", def: "refers to the Website." },
                    { term: "Website", def: "refers to RaQuadrant Energy, accessible from https://www.raquadrantenergy.com" },
                    { term: "You", def: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." },
                  ]} />
                </Section>

                <Divider />

                {/* Cancellation */}
                <Section id="cancellation" icon={XCircle} title="Your Order Cancellation Rights">
                  <Highlight title="14-Day Cancellation Window">
                    <p className="text-sm">You are entitled to cancel Your Order within <strong>14 days</strong> without giving any reason for doing so.</p>
                    <p className="text-sm mt-2">The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
                  </Highlight>

                  <p className="text-sm mt-4">In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>

                  <a
                    href="mailto:info@raquadrantenergy.com"
                    className="mt-4 inline-flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 transition-all hover:border-orange-300 hover:shadow-sm group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm group-hover:scale-110 transition-transform">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-sm text-orange-600">info@raquadrantenergy.com</span>
                  </a>

                  <div className="mt-5 rounded-xl border border-green-100 bg-green-50/60 p-4 flex gap-3">
                    <RefreshCw className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">We will reimburse You no later than <strong>14 days</strong> from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
                  </div>
                </Section>

                <Divider />

                {/* Conditions */}
                <Section id="conditions" icon={PackageCheck} title="Conditions for Returns">
                  <p className="text-sm mb-4">In order for the Goods to be eligible for a return, please make sure that:</p>

                  <div className="rounded-xl border border-green-100 bg-green-50/50 px-5 py-4 mb-5 flex gap-3">
                    <PackageCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">The Goods were <strong>purchased in the last 14 days</strong></p>
                  </div>

                  <SectionSubtitle>Non-Returnable Goods</SectionSubtitle>
                  <p className="text-sm mb-3">The following Goods <strong className="text-red-600">cannot be returned:</strong></p>
                  <div className="space-y-3">
                    {[
                      "The supply of Goods made to Your specifications or clearly personalized.",
                      "The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.",
                      "The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.",
                      "The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.",
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3">
                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
                      <p className="text-sm text-gray-700 mt-2">Only <strong>regular priced Goods</strong> may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>
                    </div>
                  </div>
                </Section>

                <Divider />

                {/* Returning */}
                <Section id="returning" icon={Truck} title="Returning Goods">
                  <p className="text-sm">You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods to our address in <strong>Kolkata, West Bengal</strong>.</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border-l-4 border-orange-400 bg-orange-50/50 pl-5 pr-4 py-4">
                      <p className="font-semibold text-sm text-gray-800 mb-2">Return Address</p>
                      <p className="text-sm text-gray-600">BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, Rajdanga Gardens, Kolkata, West Bengal – 700107</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 pl-5 pr-4 py-4">
                      <p className="font-semibold text-sm text-gray-800 mb-2">Our Recommendation</p>
                      <p className="text-sm text-gray-600">We recommend an <strong>insured and trackable</strong> mail service to ensure safe delivery of returned items.</p>
                    </div>
                  </div>

                  <Highlight title="Important Notice">
                    <p className="text-sm">We cannot be held responsible for Goods damaged or lost in return shipment. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
                  </Highlight>
                </Section>

                <Divider />

                {/* Gifts */}
                <Section id="gifts" icon={Gift} title="Gifts">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/60 to-amber-50/40 p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm mb-3">
                        <Gift className="h-4 w-4" />
                      </div>
                      <p className="font-semibold text-sm text-gray-800 mb-2">Marked as Gift</p>
                      <p className="text-sm text-gray-600">If the Goods were marked as a gift when purchased and then shipped directly to you, You&apos;ll receive a <strong>gift credit</strong> for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-200 text-gray-500 mb-3">
                        <Gift className="h-4 w-4" />
                      </div>
                      <p className="font-semibold text-sm text-gray-800 mb-2">Not Marked as Gift</p>
                      <p className="text-sm text-gray-600">If the Goods weren&apos;t marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the <strong>refund to the gift giver</strong>.</p>
                    </div>
                  </div>
                </Section>

                <Divider />

                {/* Contact */}
                <Section id="contact" icon={Mail} title="Contact Us">
                  <p className="text-sm mb-5">If you have any questions about our Returns and Refunds Policy, You can contact us:</p>
                  <a
                    href="mailto:info@raquadrantenergy.com"
                    className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-4 transition-all duration-300 hover:border-orange-300 hover:shadow-md hover:shadow-orange-100 group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md group-hover:scale-110 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Email Us</p>
                      <p className="font-semibold text-orange-600">info@raquadrantenergy.com</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-orange-400 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Section>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Section({ id, icon: Icon, title, children }: { id: string; icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-headline text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-5 mb-2 font-headline text-base font-semibold text-gray-800 border-l-[3px] border-orange-400 pl-3">
      {children}
    </h3>
  );
}

function Divider() {
  return <div className="border-t border-dashed border-gray-200" />;
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/60 to-amber-50/40 p-5 mt-3">
      <p className="font-semibold text-sm text-orange-700 mb-2">{title}</p>
      {children}
    </div>
  );
}

function DefinitionList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <dl className="space-y-3">
      {items.map((item) => (
        <div key={item.term} className="flex flex-col sm:flex-row gap-1 sm:gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
          <dt className="shrink-0 font-semibold text-sm text-orange-700 sm:w-36">{item.term}</dt>
          <dd className="text-sm text-gray-600">{item.def}</dd>
        </div>
      ))}
    </dl>
  );
}
