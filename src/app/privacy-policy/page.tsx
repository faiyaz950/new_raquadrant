"use client";

import { Shield, ChevronRight, Mail, Lock, Eye, Database, Globe, Trash2, Bell, Link2, RefreshCw, UserCheck, Cookie } from "lucide-react";
import Link from "next/link";

const LAST_UPDATED = "May 15, 2025";

const sections = [
  { id: "interpretation", label: "Interpretation & Definitions", icon: Eye },
  { id: "collecting", label: "Collecting Personal Data", icon: Database },
  { id: "usage", label: "Use of Personal Data", icon: UserCheck },
  { id: "retention", label: "Retention of Data", icon: Lock },
  { id: "transfer", label: "Transfer of Data", icon: Globe },
  { id: "delete", label: "Delete Your Data", icon: Trash2 },
  { id: "disclosure", label: "Disclosure of Data", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "children", label: "Children's Privacy", icon: UserCheck },
  { id: "links", label: "Links to Other Websites", icon: Link2 },
  { id: "changes", label: "Changes to This Policy", icon: RefreshCw },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export default function PrivacyPolicyPage() {
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
            <Shield className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-semibold text-orange-100 tracking-wide">Legal & Privacy</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-xl text-gray-300 text-base sm:text-lg leading-relaxed">
            Your privacy matters to us. This policy explains how RaQuadrant Energy collects, uses, and protects your personal information.
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
            <span className="text-gray-800 font-medium">Privacy Policy</span>
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
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-headline text-xl font-bold text-gray-900 mb-2">About This Policy</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-8 space-y-12 text-gray-700 leading-relaxed">

                {/* Interpretation */}
                <Section id="interpretation" icon={Eye} title="Interpretation and Definitions">
                  <SectionSubtitle>Interpretation</SectionSubtitle>
                  <p className="text-sm">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                  <SectionSubtitle>Definitions</SectionSubtitle>
                  <p className="text-sm mb-4">For the purposes of this Privacy Policy:</p>
                  <DefinitionList items={[
                    { term: "Account", def: "means a unique account created for You to access our Service or parts of our Service." },
                    { term: "Affiliate", def: `means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.` },
                    { term: "Company", def: `(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to RaQuadrant Energy Solutions, BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, Rajdanga Gardens, Kolkata, West Bengal – 700107.` },
                    { term: "Cookies", def: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses." },
                    { term: "Country", def: "refers to: West Bengal, India." },
                    { term: "Device", def: "means any device that can access the Service such as a computer, a cellphone or a digital tablet." },
                    { term: "Personal Data", def: "is any information that relates to an identified or identifiable individual." },
                    { term: "Service", def: "refers to the Website." },
                    { term: "Service Provider", def: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used." },
                    { term: "Usage Data", def: "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)." },
                    { term: "Website", def: "refers to RaQuadrant Energy, accessible from https://www.raquadrantenergy.com" },
                    { term: "You", def: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." },
                  ]} />
                </Section>

                <Divider />

                {/* Collecting */}
                <Section id="collecting" icon={Database} title="Collecting and Using Your Personal Data">
                  <SectionSubtitle>Types of Data Collected</SectionSubtitle>
                  <Highlight title="Personal Data">
                    <p className="text-sm">While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                    <BulletList items={["Email address", "First name and last name", "Phone number", "Address, State, Province, ZIP/Postal code, City", "Usage Data"]} />
                  </Highlight>

                  <SectionSubtitle>Usage Data</SectionSubtitle>
                  <p className="text-sm">Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                  <p className="text-sm mt-3">When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>

                  <SectionSubtitle>Information from Third-Party Social Media Services</SectionSubtitle>
                  <p className="text-sm">The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
                  <BulletList items={["Google", "Facebook", "Instagram", "Twitter", "LinkedIn"]} />
                  <p className="text-sm mt-3">If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>

                  <SectionSubtitle>Tracking Technologies and Cookies</SectionSubtitle>
                  <p className="text-sm mb-4">We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. The technologies We use may include:</p>
                  <div className="space-y-3">
                    <CookieCard icon={Cookie} title="Cookies or Browser Cookies" description="A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent." />
                    <CookieCard icon={Eye} title="Web Beacons" description="Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company to count users who have visited those pages or opened an email." />
                  </div>

                  <p className="text-sm mt-4">We use both Session and Persistent Cookies for the purposes set out below:</p>
                  <div className="mt-4 space-y-3">
                    {[
                      { type: "Necessary / Essential Cookies", cookieType: "Session Cookies", purpose: "These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts." },
                      { type: "Cookies Policy / Notice Acceptance Cookies", cookieType: "Persistent Cookies", purpose: "These Cookies identify if users have accepted the use of cookies on the Website." },
                      { type: "Functionality Cookies", cookieType: "Persistent Cookies", purpose: "These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference." },
                    ].map((c) => (
                      <div key={c.type} className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <p className="font-semibold text-sm text-gray-800">{c.type}</p>
                          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">{c.cookieType}</span>
                        </div>
                        <p className="text-xs text-gray-600">{c.purpose}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Divider />

                {/* Usage */}
                <Section id="usage" icon={UserCheck} title="Use of Your Personal Data">
                  <p className="text-sm mb-4">The Company may use Personal Data for the following purposes:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Provide & Maintain Service", desc: "Including to monitor the usage of our Service." },
                      { title: "Manage Your Account", desc: "To manage Your registration as a user of the Service." },
                      { title: "Contract Performance", desc: "For the development, compliance and undertaking of the purchase contract." },
                      { title: "Contact You", desc: "By email, telephone calls, SMS, or other equivalent forms of electronic communication." },
                      { title: "Provide Offers", desc: "To provide You with news, special offers and general information about other goods, services and events." },
                      { title: "Manage Requests", desc: "To attend and manage Your requests to Us." },
                      { title: "Business Transfers", desc: "We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, or dissolution." },
                      { title: "Other Purposes", desc: "Data analysis, identifying usage trends, evaluating and improving our Service, products, and your experience." },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                        <div>
                          <p className="font-semibold text-sm text-gray-800 mb-0.5">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <SectionSubtitle>Sharing Your Personal Information</SectionSubtitle>
                  <p className="text-sm mb-3">We may share Your personal information in the following situations:</p>
                  <BulletList items={[
                    "With Service Providers: to monitor and analyze the use of our Service, to contact You.",
                    "For business transfers: in connection with any merger, sale of Company assets, financing, or acquisition.",
                    "With Affiliates: we will require those affiliates to honor this Privacy Policy.",
                    "With business partners: to offer You certain products, services or promotions.",
                    "With other users: when You share personal information in public areas of our Service.",
                    "With Your consent: We may disclose Your personal information for any other purpose with Your consent.",
                  ]} />
                </Section>

                <Divider />

                {/* Retention */}
                <Section id="retention" icon={Lock} title="Retention of Your Personal Data">
                  <p className="text-sm">The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                  <p className="text-sm mt-3">The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
                </Section>

                <Divider />

                {/* Transfer */}
                <Section id="transfer" icon={Globe} title="Transfer of Your Personal Data">
                  <p className="text-sm">Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
                  <p className="text-sm mt-3">Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
                  <p className="text-sm mt-3">The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
                </Section>

                <Divider />

                {/* Delete */}
                <Section id="delete" icon={Trash2} title="Delete Your Personal Data">
                  <p className="text-sm">You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                  <p className="text-sm mt-3">Our Service may give You the ability to delete certain information about You from within the Service. You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
                  <Highlight title="Please Note">
                    <p className="text-sm">We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
                  </Highlight>
                </Section>

                <Divider />

                {/* Disclosure */}
                <Section id="disclosure" icon={Bell} title="Disclosure of Your Personal Data">
                  <div className="space-y-4">
                    {[
                      { title: "Business Transactions", desc: "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy." },
                      { title: "Law Enforcement", desc: "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency)." },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border-l-4 border-orange-400 bg-orange-50/50 pl-5 pr-4 py-4">
                        <p className="font-semibold text-sm text-gray-800 mb-1.5">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                    <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 pl-5 pr-4 py-4">
                      <p className="font-semibold text-sm text-gray-800 mb-2">Other Legal Requirements</p>
                      <p className="text-sm text-gray-600 mb-2">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                      <BulletList items={[
                        "Comply with a legal obligation",
                        "Protect and defend the rights or property of the Company",
                        "Prevent or investigate possible wrongdoing in connection with the Service",
                        "Protect the personal safety of Users of the Service or the public",
                        "Protect against legal liability",
                      ]} />
                    </div>
                  </div>
                </Section>

                <Divider />

                {/* Security */}
                <Section id="security" icon={Shield} title="Security of Your Personal Data">
                  <Highlight title="Our Commitment">
                    <p className="text-sm">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
                  </Highlight>
                </Section>

                <Divider />

                {/* Children */}
                <Section id="children" icon={UserCheck} title="Children's Privacy">
                  <p className="text-sm">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
                  <p className="text-sm mt-3">If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
                </Section>

                <Divider />

                {/* Links */}
                <Section id="links" icon={Link2} title="Links to Other Websites">
                  <p className="text-sm">Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
                  <p className="text-sm mt-3">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                </Section>

                <Divider />

                {/* Changes */}
                <Section id="changes" icon={RefreshCw} title="Changes to this Privacy Policy">
                  <p className="text-sm">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                  <p className="text-sm mt-3">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the <strong>"Last updated"</strong> date at the top of this Privacy Policy.</p>
                  <p className="text-sm mt-3">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                </Section>

                <Divider />

                {/* Contact */}
                <Section id="contact" icon={Mail} title="Contact Us">
                  <p className="text-sm mb-5">If you have any questions about this Privacy Policy, You can contact us:</p>
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
          <Icon className="h-4.5 w-4.5" />
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

function CookieCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-semibold text-sm text-gray-800 mb-1">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
