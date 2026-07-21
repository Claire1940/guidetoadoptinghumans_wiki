"use client";

import { useState, Suspense, lazy } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BedDouble,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Crown,
  Flame,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Newspaper,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// 模块小标题（eyebrow）胶囊 + 图标
function ModuleEyebrow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
      <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
      <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
        {children}
      </span>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.guidetoadoptinghumans.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Guide to Adopting Humans Wiki",
        description:
          "Complete Guide to Adopting Humans Wiki covering adoption rules, human traits, care guides, alien species, characters, lore, and locations across a fictional sci-fi universe.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Guide to Adopting Humans - Sci-Fi Adoption Universe",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Guide to Adopting Humans Wiki",
        alternateName: "Guide to Adopting Humans",
        url: siteUrl,
        description:
          "Complete Guide to Adopting Humans Wiki resource hub for adoption rules, human traits, care guides, alien species, characters, and lore",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Guide to Adopting Humans Wiki - Sci-Fi Adoption Universe",
        },
        sameAs: [
          "https://www.youtube.com/@kurzgesagt",
          "https://www.reddit.com/r/scifi/",
          "https://kurzgesagt.org/",
          "https://en.wikipedia.org/wiki/Fermi_paradox",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Guide to Adopting Humans",
        gamePlatform: ["Web"],
        applicationCategory: "Game",
        genre: ["Sci-Fi", "Fictional Universe", "Adventure", "Simulation"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: siteUrl,
        },
      },
      {
        "@type": "VideoObject",
        name: "The Fermi Paradox — Where Are All The Aliens?",
        description:
          "Kurzgesagt explainer on the Fermi Paradox — thematically aligned with the Guide to Adopting Humans sci-fi universe of advanced civilizations encountering humanity.",
        uploadDate: "2015-06-10",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/sNhhvQGsMEc",
        url: "https://www.youtube.com/watch?v=sNhhvQGsMEc",
      },
    ],
  };

  // Events accordion state
  const [eventsExpanded, setEventsExpanded] = useState<number | null>(0);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // 模块内卡片图标映射（每个模块内图标互不相同）
  const tierIcons = [Crown, Award, Star, Flame];
  const careIcons = [ClipboardList, Heart, Home, GraduationCap, RefreshCw];
  const personalityIcons = [Search, Shield, MessageCircle, HeartPulse];
  const housingIcons = [Home, BedDouble, Users, Sparkles];
  const eventIcons = [Calendar, Settings, Megaphone];
  const tipsIcons = [HeartHandshake, CalendarClock, Palette, AlertCircle];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 位站（social bar 已废弃，保持注释，禁止重新接回）*/}
      {/* <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside> */}
      {/* 右侧广告容器 - Fixed 位站 */}
      {/* <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside> */}

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* ==================== Hero Section ==================== */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.youtube.com/@kurzgesagt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* ==================== Video Section（紧跟 Hero，容器上限 max-w-5xl）==================== */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <VideoFeature
            videoId="sNhhvQGsMEc"
            title="The Fermi Paradox — Where Are All The Aliens?"
          />
        </div>
      </section>

      {/* ==================== Tools Grid - 8 Navigation Cards（视频区之后、Latest Updates 之前）==================== */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID（与下方 8 个模块一一对应）
              const sectionIds = [
                "beginner-guide",
                "human-types-tier-list",
                "care-guide",
                "adoption-process",
                "personality-guide",
                "housing-guide",
                "events-and-updates",
                "tips-and-tricks",
              ];
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ==================== Latest Updates Section（保留，置于 Tools Grid 之后）==================== */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* ==================== Module 1: Beginner Guide（step-by-step）==================== */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Rocket}>
                {t.modules.beginnerGuide.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.beginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.beginnerGuide.intro}
            </p>
          </div>

          {/* Steps（编号时间线） */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Lightbulb className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.beginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* ==================== Module 2: Human Types Tier List（tier-grid）==================== */}
      <section
        id="human-types-tier-list"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Trophy}>
                {t.modules.humanTypesTierList.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.humanTypesTierList.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.humanTypesTierList.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.humanTypesTierList.tiers.map((tier: any, index: number) => {
              const Icon = tierIcons[index];
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold">
                      {tier.tier}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {tier.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {tier.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Module 3: Care Guide（card-list）==================== */}
      <section id="care-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={HeartHandshake}>
                {t.modules.careGuide.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.careGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.careGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.careGuide.cards.map((card: any, index: number) => {
              const Icon = careIcons[index];
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Module 4: Adoption Process（step-by-step）==================== */}
      <section
        id="adoption-process"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={ClipboardCheck}>
                {t.modules.adoptionProcess.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.adoptionProcess.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.adoptionProcess.intro}
            </p>
          </div>

          {/* 流程时间线 */}
          <div className="scroll-reveal relative pl-8 md:pl-0">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
              {t.modules.adoptionProcess.steps.map((step: any, index: number) => (
                <div
                  key={index}
                  className="relative p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 mb-3 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1.5">{step.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* ==================== Module 5: Personality Guide（table）==================== */}
      <section id="personality-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Brain}>
                {t.modules.personalityGuide.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.personalityGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.personalityGuide.intro}
            </p>
          </div>

          {/* 桌面端表格 */}
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.modules.personalityGuide.headers.personality}</th>
                  <th className="text-left p-4 font-semibold">{t.modules.personalityGuide.headers.traits}</th>
                  <th className="text-left p-4 font-semibold">{t.modules.personalityGuide.headers.preferences}</th>
                  <th className="text-left p-4 font-semibold">{t.modules.personalityGuide.headers.tips}</th>
                  <th className="text-left p-4 font-semibold">{t.modules.personalityGuide.headers.difficulty}</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.personalityGuide.rows.map((row: any, index: number) => {
                  const Icon = personalityIcons[index];
                  return (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-2 font-semibold">
                          <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                          {row.personality}
                        </div>
                      </td>
                      <td className="p-4 align-top text-muted-foreground">{row.traits}</td>
                      <td className="p-4 align-top text-muted-foreground">{row.preferences}</td>
                      <td className="p-4 align-top text-muted-foreground">{row.tips}</td>
                      <td className="p-4 align-top">
                        <span className="inline-flex px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium">
                          {row.difficulty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 移动端卡片 */}
          <div className="scroll-reveal md:hidden space-y-3">
            {t.modules.personalityGuide.rows.map((row: any, index: number) => {
              const Icon = personalityIcons[index];
              return (
                <div
                  key={index}
                  className="p-4 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                      {row.personality}
                    </div>
                    <span className="inline-flex px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium">
                      {row.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-semibold text-foreground">{t.modules.personalityGuide.headers.traits}:</span> {row.traits}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-semibold text-foreground">{t.modules.personalityGuide.headers.preferences}:</span> {row.preferences}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.modules.personalityGuide.headers.tips}:</span> {row.tips}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Module 6: Housing Guide（feature-cards）==================== */}
      <section
        id="housing-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Building2}>
                {t.modules.housingGuide.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.housingGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.housingGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.housingGuide.cards.map((card: any, index: number) => {
              const Icon = housingIcons[index];
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 mb-3 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                    <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {card.description}
                  </p>
                  <ul className="space-y-1 mb-3">
                    {card.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-[hsl(var(--nav-theme-light))] font-medium">
                    {card.upgradeFocus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Module 7: Events and Updates（accordion）==================== */}
      <section id="events-and-updates" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Newspaper}>
                {t.modules.eventsAndUpdates.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.eventsAndUpdates.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.eventsAndUpdates.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3">
            {t.modules.eventsAndUpdates.items.map((item: any, index: number) => {
              const Icon = eventIcons[index];
              const isOpen = eventsExpanded === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() => setEventsExpanded(isOpen ? null : index)}
                    className="w-full flex items-center gap-3 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                      <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold block">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1">
                      <ul className="space-y-1.5">
                        {item.content.map((c: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Module 8: Tips and Tricks（tip-cards）==================== */}
      <section
        id="tips-and-tricks"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex justify-center">
              <ModuleEyebrow icon={Zap}>
                {t.modules.tipsAndTricks.eyebrow}
              </ModuleEyebrow>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.tipsAndTricks.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.tipsAndTricks.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.tipsAndTricks.cards.map((card: any, index: number) => {
              const Icon = tipsIcons[index];
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <h3 className="font-bold">{card.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {card.description}
                  </p>
                  <ul className="space-y-1.5">
                    {card.tips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FAQ Section ==================== */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* ==================== CTA Section ==================== */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ==================== Footer ==================== */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/@kurzgesagt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/scifi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://kurzgesagt.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Fermi_paradox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
