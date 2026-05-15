"use client";

import {
  FileText, ChevronRight, Mail, Scale, ShieldAlert, Ban, AlertTriangle,
  Globe, Gavel, MessageSquare, Flag, Wrench, RefreshCw, Languages, Link2,
} from "lucide-react";
import Link from "next/link";

const LAST_UPDATED = "May 15, 2025";

const sections = [
  { id: "interpretation", label: "Interpretation & Definitions", icon: FileText },
  { id: "acknowledgment", label: "Acknowledgment", icon: Scale },
  { id: "links", label: "Links to Other Websites", icon: Link2 },
  { id: "termination", label: "Termination", icon: Ban },
  { id: "liability", label: "Limitation of Liability", icon: ShieldAlert },
  { id: "disclaimer", label: '"AS IS" Disclaimer', icon: AlertTriangle },
  { id: "governing", label: "Governing Law", icon: Gavel },
  { id: "disputes", label: "Disputes Resolution", icon: MessageSquare },
  { id: "eu-users", label: "EU Users", icon: Globe },
  { id: "us-compliance", label: "US Legal Compliance", icon: Flag },
  { id: "severability", label: "Severability & Waiver", icon: Wrench },
  { id: "translation", label: "Translation", icon: Languages },
  { id: "changes", label: "Changes to Terms", icon: RefreshCw },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export default function TermsPage() {
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
            <Scale className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-semibold text-orange-100 tracking-wide">Legal & Compliance</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl mb-4">
            Terms and Conditions
          </h1>
          <p className="mx-auto max-w-xl text-gray-300 text-base sm:text-lg leading-relaxed">
            Please read these terms and conditions carefully before using Our Service. By accessing the Service, you agree to be bound by these Terms.
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
            <span className="text-gray-800 font-medium">Terms and Conditions</span>
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
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Intro */}
              <div className="border-b border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/40 px-8 py-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-headline text-xl font-bold text-gray-900 mb-2">About These Terms</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      These Terms and Conditions govern the use of the RaQuadrant Energy website and form the entire agreement between You and the Company regarding the use of the Service. By accessing or using the Service You agree to be bound by these Terms and Conditions.
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
                  <p className="text-sm mb-4">For the purposes of these Terms and Conditions:</p>
                  <DefinitionList items={[
                    { term: "Affiliate", def: `means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.` },
                    { term: "Country", def: "refers to: West Bengal, India." },
                    { term: "Company", def: `(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to RaQuadrant Energy Solutions, BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, Rajdanga Gardens, Kolkata, West Bengal – 700107.` },
                    { term: "Device", def: "means any device that can access the Service such as a computer, a cellphone or a digital tablet." },
                    { term: "Service", def: "refers to the Website." },
                    { term: "Terms and Conditions", def: `(also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.` },
                    { term: "Third-party Social Media Service", def: "means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service." },
                    { term: "Website", def: "refers to RaQuadrant Energy, accessible from https://www.raquadrantenergy.com" },
                    { term: "You", def: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." },
                  ]} />
                </Section>

                <Divider />

                {/* Acknowledgment */}
                <Section id="acknowledgment" icon={Scale} title="Acknowledgment">
                  <p className="text-sm">These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                  <p className="text-sm mt-3">Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>

                  <Highlight title="Important">
                    <p className="text-sm">By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
                  </Highlight>

                  <p className="text-sm mt-3">You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
                  <p className="text-sm mt-3">Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our{" "}
                    <Link href="/privacy-policy" className="font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-2">Privacy Policy</Link>
                    {" "}describes Our policies and procedures on the collection, use and disclosure of Your personal information. Please read Our Privacy Policy carefully before using Our Service.
                  </p>
                </Section>

                <Divider />

                {/* Links */}
                <Section id="links" icon={Link2} title="Links to Other Websites">
                  <p className="text-sm">Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
                  <p className="text-sm mt-3">The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
                  <Highlight title="Our Recommendation">
                    <p className="text-sm">We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
                  </Highlight>
                </Section>

                <Divider />

                {/* Termination */}
                <Section id="termination" icon={Ban} title="Termination">
                  <div className="rounded-xl border-l-4 border-red-300 bg-red-50/50 pl-5 pr-4 py-4">
                    <p className="text-sm text-gray-700">We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                    <p className="text-sm text-gray-700 mt-3">Upon termination, Your right to use the Service will cease immediately.</p>
                  </div>
                </Section>

                <Divider />

                {/* Liability */}
                <Section id="liability" icon={ShieldAlert} title="Limitation of Liability">
                  <p className="text-sm">Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.</p>
                  <Highlight title="Exclusion of Consequential Damages">
                    <p className="text-sm">To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
                  </Highlight>
                  <p className="text-sm mt-3">Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.</p>
                </Section>

                <Divider />

                {/* Disclaimer */}
                <Section id="disclaimer" icon={AlertTriangle} title={'"AS IS" and "AS AVAILABLE" Disclaimer'}>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4 mb-4">
                    <p className="font-semibold text-sm text-amber-800 mb-1">Service Provided "AS IS"</p>
                    <p className="text-sm text-gray-700">The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.</p>
                  </div>
                  <p className="text-sm">Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
                  <SectionSubtitle>No Representation or Warranty</SectionSubtitle>
                  <p className="text-sm mb-3">Neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied:</p>
                  <BulletList items={[
                    "As to the operation or availability of the Service, or the information, content, and materials or products included thereon",
                    "That the Service will be uninterrupted or error-free",
                    "As to the accuracy, reliability, or currency of any information or content provided through the Service",
                    "That the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components",
                  ]} />
                  <p className="text-sm mt-3">Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
                </Section>

                <Divider />

                {/* Governing Law */}
                <Section id="governing" icon={Gavel} title="Governing Law">
                  <p className="text-sm">The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                  <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 px-5 py-3">
                    <Gavel className="h-5 w-5 text-orange-500 shrink-0" />
                    <span className="text-sm font-semibold text-orange-700">Jurisdiction: West Bengal, India</span>
                  </div>
                </Section>

                <Divider />

                {/* Disputes */}
                <Section id="disputes" icon={MessageSquare} title="Disputes Resolution">
                  <p className="text-sm">If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
                </Section>

                <Divider />

                {/* EU Users */}
                <Section id="eu-users" icon={Globe} title="For European Union (EU) Users">
                  <p className="text-sm">If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
                </Section>

                <Divider />

                {/* US Compliance */}
                <Section id="us-compliance" icon={Flag} title="United States Legal Compliance">
                  <p className="text-sm mb-3">You represent and warrant that:</p>
                  <BulletList items={[
                    "You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a \"terrorist supporting\" country",
                    "You are not listed on any United States government list of prohibited or restricted parties",
                  ]} />
                </Section>

                <Divider />

                {/* Severability */}
                <Section id="severability" icon={Wrench} title="Severability and Waiver">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border-l-4 border-orange-400 bg-orange-50/50 pl-5 pr-4 py-4">
                      <p className="font-semibold text-sm text-gray-800 mb-2">Severability</p>
                      <p className="text-sm text-gray-600">If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 pl-5 pr-4 py-4">
                      <p className="font-semibold text-sm text-gray-800 mb-2">Waiver</p>
                      <p className="text-sm text-gray-600">Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
                    </div>
                  </div>
                </Section>

                <Divider />

                {/* Translation */}
                <Section id="translation" icon={Languages} title="Translation Interpretation">
                  <p className="text-sm">These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</p>
                </Section>

                <Divider />

                {/* Changes */}
                <Section id="changes" icon={RefreshCw} title="Changes to These Terms and Conditions">
                  <p className="text-sm">We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
                  <Highlight title="Continued Use Constitutes Acceptance">
                    <p className="text-sm">By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
                  </Highlight>
                </Section>

                <Divider />

                {/* Contact */}
                <Section id="contact" icon={Mail} title="Contact Us">
                  <p className="text-sm mb-5">If you have any questions about these Terms and Conditions, You can contact us:</p>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
          {item}
        </li>
      ))}
    </ul>
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
