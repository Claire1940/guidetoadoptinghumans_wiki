import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.guidetoadoptinghumans.wiki'
  const path = '/about'

  return {
    title: 'About Guide to Adopting Humans Wiki - Fictional Universe Guide',
    description: 'Learn about Guide to Adopting Humans Wiki, a community-driven fan-made resource hub exploring the fictional sci-fi universe where advanced civilizations adopt, raise, and understand humans.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Guide to Adopting Humans Wiki',
      title: 'About Guide to Adopting Humans Wiki',
      description: 'Learn about our mission to provide the best fan-made resource for the Guide to Adopting Humans fictional universe.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Guide to Adopting Humans Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Guide to Adopting Humans Wiki',
      description: 'Learn about our mission to provide the best fan-made resource for the Guide to Adopting Humans fictional universe.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Guide to Adopting Humans Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for the Guide to Adopting Humans fictional universe
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Guide to Adopting Humans Wiki</h2>
            <p>
              Guide to Adopting Humans Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to exploring
              the fictional &quot;Guide to Adopting Humans&quot; universe — a sci-fi concept where advanced civilizations learn
              how to adopt, raise, and understand humans. We are a community-driven platform that provides comprehensive
              guides on adoption rules, human traits, care practices, alien species, characters, lore, and locations.
            </p>
            <p>
              Whether you&apos;re a curious newcomer discovering this imagined universe for the first time or a dedicated
              fan diving deep into the lore, Guide to Adopting Humans Wiki is here to support your exploration every step
              of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower readers with accurate, well-organized information</strong> about
              the fictional Guide to Adopting Humans universe. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content clear, consistent, and faithful to the fictional concept</li>
              <li><strong>Build useful resources:</strong> Develop guides, references, and encyclopedic entries that help readers navigate the lore</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can discuss, share theories, and create together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to explore for readers of all backgrounds</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Guide to Adopting Humans Wiki as the <strong>go-to destination</strong> for every reader seeking
              to explore this fictional universe. We want to be the resource that fans trust and rely on, whether they
              need adoption process breakdowns, want to understand human traits, or are looking for deep lore analysis.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📋</div>
              <h3 className="text-xl font-semibold text-white mb-2">Adoption Guides</h3>
              <p className="text-slate-300">
                Detailed breakdowns of the adoption process, eligibility requirements, rules, and procedures that
                civilizations follow when adopting a human.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🧬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Human Traits</h3>
              <p className="text-slate-300">
                Comprehensive references on human characteristics — emotions, language, diet, sleep, social needs,
                and behaviors that guardians need to understand.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">💕</div>
              <h3 className="text-xl font-semibold text-white mb-2">Care Guides</h3>
              <p className="text-slate-300">
                Practical care guidance covering daily routines, raising stages, health, bonding, and relationship
                building between guardians and humans.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">👽</div>
              <h3 className="text-xl font-semibold text-white mb-2">Alien Species</h3>
              <p className="text-slate-300">
                An encyclopedia of the alien civilizations — their abilities, cultures, differences, and compatibility
                with adopting and raising humans.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Characters &amp; Lore</h3>
              <p className="text-slate-300">
                Deep dives into the characters, world history, storylines, planets, and adoption centers that shape
                the Guide to Adopting Humans universe.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages so readers around the world can explore the fictional
                universe in their preferred language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Guide to Adopting Humans Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from fans of all kinds. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Reader feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Fan theories:</strong> Creative interpretations, new perspectives, and community discussions</li>
              <li><strong>Lore exploration:</strong> We continuously expand the fictional universe with new concepts and details</li>
              <li><strong>Community trends:</strong> We track what readers find most useful and update guides accordingly</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you&apos;ve developed a new lore concept, written a care guide,
              or have suggestions for new sections, we&apos;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Guide to Adopting Humans Wiki is maintained by a dedicated team of passionate writers and lore enthusiasts
              who love the Guide to Adopting Humans concept as much as you do. We&apos;re fans first, constantly expanding
              the fictional universe, refining guides, and staying curious about new creative directions.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Lore development:</strong> Crafting and organizing the fictional universe consistently</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and encyclopedic entries</li>
              <li><strong>Community management:</strong> Listening to reader feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: &quot;Stellar Nursery&quot; – Nurturing humanity across the stars.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>&quot;Guide to Adopting Humans&quot; is a fictional concept.</strong> This wiki is an unofficial,
              fan-made resource and is NOT affiliated with, endorsed by, or associated with any real game, developer,
              publisher, or brand.
            </p>
            <p>
              All lore, characters, and scenarios on this website are imaginary and presented for entertainment and
              creative exploration. Any referenced third-party content (such as educational videos or community
              discussions) belongs to its respective owners and is used for informational purposes only.
            </p>
            <p>
              Guide to Adopting Humans Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@guidetoadoptinghumans.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@guidetoadoptinghumans.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@guidetoadoptinghumans.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@guidetoadoptinghumans.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@guidetoadoptinghumans.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@guidetoadoptinghumans.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@guidetoadoptinghumans.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@guidetoadoptinghumans.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, lore expansions, and Guide to Adopting Humans content.
            Bookmark this site and check back regularly for new entries!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
