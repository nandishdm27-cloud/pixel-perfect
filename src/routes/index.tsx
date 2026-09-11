import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Filter,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InternshipOS — Career Command Center" },
      {
        name: "description",
        content: "Turn your internship search into a clear, data-informed career strategy.",
      },
      { property: "og:title", content: "InternshipOS — Career Command Center" },
      {
        property: "og:description",
        content: "Track applications, spot skill gaps, and prepare for the opportunities that matter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navGroups = [
  {
    label: "Workspace",
    items: [
      { label: "Command Center", icon: LayoutDashboard },
      { label: "Applications", icon: BriefcaseBusiness, count: "12" },
      { label: "Opportunities", icon: Sparkles },
      { label: "Interviews", icon: CalendarDays, count: "2" },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Skills", icon: Target },
      { label: "Resume Manager", icon: FileText },
      { label: "Career Roadmap", icon: TrendingUp },
      { label: "Analytics", icon: Zap },
    ],
  },
];

const applications = [
  { company: "Stripe", role: "Software Engineer Intern", meta: "Remote · 2d ago", status: "Interview", tone: "green", logo: "S" },
  { company: "Notion", role: "Frontend Engineering Intern", meta: "San Francisco · 5d ago", status: "Applied", tone: "blue", logo: "N" },
  { company: "Vercel", role: "Developer Experience Intern", meta: "New York · 8d ago", status: "Assessment", tone: "orange", logo: "V" },
];

const skillBars = [
  { name: "TypeScript", value: "82", demand: "High", className: "skill-82" },
  { name: "React", value: "74", demand: "High", className: "skill-74" },
  { name: "SQL", value: "48", demand: "Growing", className: "skill-48" },
  { name: "System design", value: "32", demand: "Priority", className: "skill-32" },
];

function Index() {
  const [activeNav, setActiveNav] = useState("Command Center");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showOpportunity, setShowOpportunity] = useState(false);
  const [timeframe, setTimeframe] = useState("This month");

  const handleNav = (label: string) => {
    setActiveNav(label);
    setShowMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={cn("workspace-sidebar", showMobileNav && "workspace-sidebar-open")}>
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="brand-mark"><Sparkles className="size-4" /></div>
            <span className="font-display text-lg font-semibold tracking-tight">InternshipOS</span>
          </div>
          <Button aria-label="Close navigation" variant="ghost" size="icon" className="sidebar-close lg:hidden" onClick={() => setShowMobileNav(false)}>
            <X />
          </Button>
        </div>

        <div className="px-3 py-2">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-7">
              <p className="sidebar-label">{group.label}</p>
              <nav aria-label={`${group.label} navigation`} className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.label;
                  return (
                    <Button
                      key={item.label}
                      variant="ghost"
                      onClick={() => handleNav(item.label)}
                      className={cn("sidebar-link", isActive && "sidebar-link-active")}
                    >
                      <Icon />
                      <span>{item.label}</span>
                      {item.count && <span className="ml-auto sidebar-count">{item.count}</span>}
                    </Button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-auto px-4 pb-5">
          <div className="sidebar-upgrade">
            <div className="mb-4 flex items-start justify-between">
              <div className="upgrade-icon"><Zap className="size-4" /></div>
              <span className="eyebrow eyebrow-dark">Pro tip</span>
            </div>
            <p className="text-sm font-semibold text-sidebar-foreground">Make your next application count.</p>
            <p className="mt-1 text-xs leading-5 text-sidebar-muted">Your strongest skill signal is currently missing from 4 saved roles.</p>
            <Button variant="secondary" size="sm" className="mt-4 w-full justify-between" onClick={() => handleNav("Skills")}>
              Review skill gaps <ArrowUpRight />
            </Button>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-sidebar-border pt-4">
            <div className="avatar avatar-small">KG</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Kavana Gowda</p>
              <p className="truncate text-xs text-sidebar-muted">Computer Science · 2026</p>
            </div>
            <Button aria-label="Open profile settings" variant="ghost" size="icon" className="sidebar-icon-button"><Settings2 /></Button>
          </div>
        </div>
      </aside>

      {showMobileNav && <button aria-label="Close navigation overlay" className="sidebar-overlay lg:hidden" onClick={() => setShowMobileNav(false)} />}

      <main className="workspace-main">
        <header className="workspace-header">
          <Button aria-label="Open navigation" variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileNav(true)}><Menu /></Button>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><span>Workspace</span><span className="text-border">/</span><span className="font-medium text-foreground">{activeNav}</span></div>
          <div className="ml-auto flex items-center gap-2">
            <Button aria-label="Search" variant="ghost" size="icon" className="header-icon"><Search /></Button>
            <Button aria-label="Notifications" variant="ghost" size="icon" className="header-icon relative"><Bell /><span className="notification-dot" /></Button>
            <div className="header-divider" />
            <Button variant="ghost" className="profile-trigger"><span className="avatar avatar-tiny">KG</span><span className="hidden text-sm font-medium sm:inline">Kavana</span><ChevronDown className="size-3.5 text-muted-foreground" /></Button>
          </div>
        </header>

        <div className="workspace-content">
          <section className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <p className="eyebrow">Friday, September 11, 2026</p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Good morning, Kavana<span className="text-primary">.</span></h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">A clear view of what is moving your career forward today.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowOpportunity(true)}><Plus /> Add opportunity</Button>
              <Button onClick={() => handleNav("Applications")}><BriefcaseBusiness /> View applications</Button>
            </div>
          </section>

          <section className="readiness-panel mb-5">
            <div className="readiness-copy">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow eyebrow-on-dark">Career readiness</p>
                  <div className="mt-3 flex items-baseline gap-2"><span className="font-display text-5xl font-semibold tracking-tight">78</span><span className="text-sm text-primary-foreground/60">/ 100</span></div>
                </div>
                <div className="readiness-ring"><span>78%</span></div>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">You are building strong momentum. Strengthen your interview prep to unlock the next level.</p>
              <Button variant="secondary" size="sm" className="mt-5" onClick={() => handleNav("Career Roadmap")}>Open roadmap <ArrowUpRight /></Button>
            </div>
            <div className="readiness-breakdown">
              <div className="mb-4 flex items-center justify-between"><p className="text-sm font-medium text-primary-foreground">Readiness breakdown</p><CircleHelp className="size-4 text-primary-foreground/45" /></div>
              <div className="space-y-4">
                {[{ label: "Technical skills", value: "86", className: "readiness-86" }, { label: "Projects", value: "74", className: "readiness-74" }, { label: "Resume", value: "91", className: "readiness-91" }, { label: "Interview prep", value: "61", className: "readiness-61" }].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between text-xs"><span className="text-primary-foreground/70">{item.label}</span><span className="font-medium text-primary-foreground">{item.value}%</span></div>
                    <div className="progress-track progress-track-dark"><div className={cn("progress-fill", item.className)} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="readiness-signal">
              <div className="signal-icon"><TrendingUp className="size-4" /></div>
              <p className="eyebrow eyebrow-on-dark">Your signal</p>
              <p className="mt-3 font-display text-lg font-medium text-primary-foreground">Consistency is compounding.</p>
              <p className="mt-2 text-xs leading-5 text-primary-foreground/60">You have applied every week for the last 6 weeks.</p>
              <div className="mt-5 flex items-center gap-1.5"><span className="signal-pulse" /><span className="text-xs text-primary-foreground/65">+12% this month</span></div>
            </div>
          </section>

          <section className="metrics-grid mb-5">
            {[{ label: "Total applications", value: "24", detail: "+4 this month", trend: "up" }, { label: "Active applications", value: "12", detail: "Across 8 companies", trend: "neutral" }, { label: "Interviews", value: "03", detail: "+1 this month", trend: "up" }, { label: "Response rate", value: "29%", detail: "+6.4% vs. last month", trend: "up" }].map((metric) => (
              <Card key={metric.label} className="metric-card"><CardContent className="p-5"><div className="flex items-start justify-between"><p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{metric.label}</p>{metric.trend === "up" ? <span className="metric-trend"><TrendingUp className="size-3" /></span> : <span className="metric-neutral" />}</div><p className="mt-4 font-display text-3xl font-semibold tracking-tight">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p></CardContent></Card>
            ))}
          </section>

          <section className="content-grid">
            <Card className="applications-card"><div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center"><div><h2 className="font-display text-lg font-semibold">Application pulse</h2><p className="mt-1 text-xs text-muted-foreground">Your most recent opportunities</p></div><Button variant="ghost" size="sm" onClick={() => handleNav("Applications")}>View all <ArrowUpRight /></Button></div><CardContent className="p-0"><div className="divide-y divide-border">{applications.map((application) => <div key={application.company} className="application-row"><div className={cn("company-logo", `logo-${application.tone}`)}>{application.logo}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{application.company}</p><p className="mt-1 truncate text-xs text-muted-foreground">{application.role}</p><p className="mt-2 text-[11px] text-muted-foreground">{application.meta}</p></div><Badge className={cn("status-badge", `status-${application.tone}`)}>{application.status}</Badge><Button aria-label={`More options for ${application.company}`} variant="ghost" size="icon" className="row-more"><MoreHorizontal /></Button></div>)}</div></CardContent></Card>

            <Card className="today-card"><div className="flex items-start justify-between p-5"><div><h2 className="font-display text-lg font-semibold">Today</h2><p className="mt-1 text-xs text-muted-foreground">September 11 · 3 actions</p></div><div className="date-chip"><span>SEP</span><strong>11</strong></div></div><CardContent className="space-y-4 px-5 pb-5 pt-0">{[{ time: "10:30", title: "Stripe interview", type: "Technical round", icon: CalendarDays, tone: "coral" }, { time: "14:00", title: "Follow up with Notion", type: "Application touchpoint", icon: Bell, tone: "blue" }, { time: "18:00", title: "Practice system design", type: "Preparation task", icon: Target, tone: "green" }].map((event) => { const Icon = event.icon; return <div key={event.title} className="today-item"><div className="today-time">{event.time}</div><div className={cn("today-icon", `today-${event.tone}`)}><Icon /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{event.title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{event.type}</p></div><Button aria-label={`Mark ${event.title} complete`} variant="ghost" size="icon" className="check-button"><Check /></Button></div> })}</CardContent></Card>

            <Card className="funnel-card"><div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center"><div><h2 className="font-display text-lg font-semibold">Application funnel</h2><p className="mt-1 text-xs text-muted-foreground">Your journey from saved to offer</p></div><Button variant="outline" size="sm"><Filter /> {timeframe}<ChevronDown /></Button></div><CardContent className="p-5"><div className="funnel-steps">{[{ label: "Wishlist", value: "38", width: "funnel-100" }, { label: "Applied", value: "24", width: "funnel-63" }, { label: "Assessment", value: "08", width: "funnel-34" }, { label: "Interview", value: "03", width: "funnel-18" }, { label: "Offer", value: "—", width: "funnel-8" }].map((step, index) => <div key={step.label} className="funnel-step"><div className="flex items-end justify-between"><span className="text-xs font-medium text-muted-foreground">{step.label}</span><span className="font-display text-xl font-semibold">{step.value}</span></div><div className="mt-2 h-2 rounded-full bg-muted"><div className={cn("funnel-bar", step.width)} /></div>{index < 4 && <span className="funnel-arrow">›</span>}</div>)}</div><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><p className="text-xs text-muted-foreground">You are converting at <span className="font-semibold text-foreground">12.5%</span> from application to interview.</p><Button variant="link" size="sm" onClick={() => handleNav("Analytics")}>See insights <ArrowUpRight /></Button></div></CardContent></Card>

            <Card className="skills-card"><div className="flex items-start justify-between p-5"><div><h2 className="font-display text-lg font-semibold">Skill signal</h2><p className="mt-1 text-xs text-muted-foreground">Demand in your target roles</p></div><Button variant="ghost" size="icon" aria-label="Open skill details" onClick={() => handleNav("Skills")}><ArrowUpRight /></Button></div><CardContent className="space-y-4 px-5 pb-5 pt-0">{skillBars.map((skill) => <div key={skill.name}><div className="mb-2 flex items-center justify-between text-xs"><span className="font-medium">{skill.name}</span><span className={cn("skill-demand", skill.demand === "Priority" && "skill-demand-priority")}>{skill.demand}</span></div><div className="flex items-center gap-3"><div className="progress-track flex-1"><div className={cn("progress-fill progress-primary", skill.className)} /></div><span className="w-8 text-right text-xs font-semibold text-muted-foreground">{skill.value}%</span></div></div>)}<div className="skill-alert"><div className="alert-spark"><Sparkles className="size-3.5" /></div><p className="text-xs leading-5 text-muted-foreground">SQL appears in <span className="font-semibold text-foreground">74%</span> of your saved roles, but your current proficiency is <span className="font-semibold text-foreground">48%</span>.</p><Button variant="link" size="sm" onClick={() => handleNav("Skills")}>Close gap <ArrowUpRight /></Button></div></CardContent></Card>
          </section>

          <section className="mt-5 flex flex-col justify-between gap-4 rounded-lg border border-dashed border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="activity-avatar"><UserRound className="size-4" /></div><p className="text-xs text-muted-foreground">Your weekly activity is up <span className="font-semibold text-foreground">18%</span>. Keep the streak going.</p></div><Button variant="ghost" size="sm" onClick={() => handleNav("Analytics")}>View weekly report <ArrowUpRight /></Button></section>
        </div>
      </main>

      {showOpportunity && <div className="dialog-backdrop" role="presentation" onClick={() => setShowOpportunity(false)}><div className="opportunity-dialog" role="dialog" aria-modal="true" aria-labelledby="opportunity-title" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><p className="eyebrow">Quick add</p><h2 id="opportunity-title" className="mt-2 font-display text-2xl font-semibold">Add an opportunity</h2><p className="mt-2 text-sm text-muted-foreground">Keep your next move in sight.</p></div><Button aria-label="Close dialog" variant="ghost" size="icon" onClick={() => setShowOpportunity(false)}><X /></Button></div><div className="mt-6 space-y-4"><label className="field-label">Company<input className="field-input" placeholder="e.g. Linear" /></label><label className="field-label">Role<input className="field-input" placeholder="e.g. Product Engineering Intern" /></label><label className="field-label">Application link<input className="field-input" placeholder="https://" /></label></div><div className="mt-7 flex justify-end gap-2"><Button variant="ghost" onClick={() => setShowOpportunity(false)}>Cancel</Button><Button onClick={() => setShowOpportunity(false)}><Check /> Save opportunity</Button></div></div></div>}
    </div>
  );
}
