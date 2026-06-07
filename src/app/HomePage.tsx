"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  RESTAURANT,
  WHATSAPP,
  trustBadges,
  featuredDishes,
  menuTabs,
  menuByCategory,
  reviewPlatforms,
  testimonials,
  chefStats,
  blogPosts,
  newsletterBenefits,
  type MenuCategory,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { IMAGES } from "@/lib/images";
import { Avatar } from "@/components/ui/Avatar";
import { ChefPhoto } from "@/components/ui/ChefPhoto";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Counter } from "@/components/ui/Counter";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";

function TestimonialReview({ quote }: { quote: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <blockquote className={`sp-testi-text${expanded ? " is-expanded" : ""}`}>&ldquo;{quote}&rdquo;</blockquote>
      <button
        type="button"
        className="sp-testi-read-more"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuCategory>("curries");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const visibleItems = menuByCategory[activeTab];
  const activeBlog = blogPosts.find((p) => p.id === activeBlogId);
  const tabCounts = menuTabs.map((t) => ({ ...t, count: menuByCategory[t.id].length }));

  const getQty = (id: string) => quantities[id] ?? 1;

  const updateQty = (id: string, delta: number) => {
    setQuantities((p) => ({ ...p, [id]: Math.max(1, (p[id] ?? 1) + delta) }));
  };

  const addToCart = (id: string, name: string) => {
    const qty = getQty(id);
    setCart((p) => ({ ...p, [id]: (p[id] ?? 0) + qty }));
    setCartToast(name);
    setTimeout(() => setCartToast(null), 2500);
  };

  const submitNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = newsletterEmail.trim();
    if (!email || newsletterSubmitting) return;

    setNewsletterSubmitting(true);
    setNewsletterError(false);

    try {
      const data = new FormData(form);
      const body = new URLSearchParams();
      data.forEach((value, key) => body.append(key, value.toString()));

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!res.ok && res.status !== 302) throw new Error("Subscribe failed");

      setNewsletterDone(true);
      setNewsletterEmail("");
    } catch {
      setNewsletterError(true);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const buildOrderMessage = useCallback(() => {
    const lines = Object.entries(cart).map(([id, qty]) => {
      const item = Object.values(menuByCategory).flat().find((i) => i.id === id);
      return item ? `${qty}x ${item.name} — ${formatPrice(item.price * qty)}` : "";
    }).filter(Boolean);
    const total = Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = Object.values(menuByCategory).flat().find((i) => i.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
    return lines.join("\n") + (total ? `\n\nEstimated total: ${formatPrice(total)}` : "");
  }, [cart]);

  const orderOnlineUrl = cart && Object.keys(cart).length > 0
    ? `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(`Hi Spice Palace, I'd like to order:\n${buildOrderMessage()}`)}`
    : WHATSAPP.bulk;

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!activeBlogId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveBlogId(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeBlogId]);

  const t = testimonials[testimonialIdx];

  return (
    <>
      {cartToast && (
        <div className="sp-toast" role="status" aria-live="polite">
          Added {cartToast} to cart
        </div>
      )}

      <header className="sp-nav" role="banner">
        <Link href="#" className="sp-logo" aria-label={`${RESTAURANT.name} home`}>
          <div className="sp-logo-icon" aria-hidden="true">
            <Image src="/icons/icon-192.png" alt="" width={38} height={38} className="sp-logo-img" priority />
          </div>
          <span className="sp-logo-text">Spice<span>Palace</span></span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="sp-nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#chef">Our Chef</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-nav-cta sp-nav-order">
          Order Online
        </a>
        <button type="button" className="sp-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle menu">
          ☰
        </button>
      </header>

      <div className={`sp-mobile-nav ${mobileOpen ? "open" : ""}`} role="dialog" aria-hidden={!mobileOpen}>
        <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
        <a href="#chef" onClick={() => setMobileOpen(false)}>Our Chef</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-nav-cta sp-nav-order">Order Online</a>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="sp-hero" aria-labelledby="hero-heading">
          <div className="sp-hero-content">
            <p className="sp-hero-eyebrow">✦ Fine Dining · Koregaon Park, Pune</p>
            <h1 id="hero-heading">Authentic Indian Cuisine Crafted Fresh Every Day</h1>
            <p>Experience traditional flavors prepared by expert chefs using premium ingredients and time-honored recipes.</p>
            <div className="sp-hero-actions">
              <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-btn-primary">Order Online</a>
              <a href="#menu" className="sp-btn-outline">View Menu</a>
              <a href={WHATSAPP.table} target="_blank" rel="noopener noreferrer" className="sp-btn-whatsapp">Book a Table</a>
            </div>
            <ul className="sp-trust-row" aria-label="Trust indicators">
              {trustBadges.map((b) => (
                <li key={b.label}><span aria-hidden="true">{b.icon}</span> {b.label}</li>
              ))}
            </ul>
          </div>
          <div className="sp-hero-right" aria-hidden="true">
            <div className="sp-hero-dish-main sp-float-slow">
              <Image src={IMAGES.hero} alt="Dal Makhani — Spice Palace signature dish" fill className="sp-hero-main-img" sizes="400px" priority />
            </div>
            <div className="sp-dish-orbit sp-orbit-1 sp-float-slow-delay">🥘</div>
            <div className="sp-dish-orbit sp-orbit-3 sp-float-slow-delay2">🍢</div>
            <div className="sp-hero-card">
              <div className="sp-hero-card-chef">Chef&apos;s Special</div>
              <div className="sp-hero-card-name">Dal Makhani</div>
              <div className="sp-stars" aria-label="5 star rating">★★★★★</div>
              <div className="sp-hero-card-price">₹420 <span>per serve</span></div>
            </div>
          </div>
        </section>

        {/* FEATURES STRIP */}
        <div className="sp-features-strip" role="region" aria-label="Highlights">
          {[
            { icon: "🌿", title: "Farm-Fresh Ingredients", desc: "Direct from organic farms every morning" },
            { icon: "🍽️", title: "Traditional Recipes", desc: "Generations-old secret masala blends" },
            { icon: "⚡", title: "Fast Preparation", desc: "Most dishes ready in 15–25 minutes" },
          ].map((f) => (
            <div key={f.title} className="sp-feature-item">
              <div className="sp-feature-icon" aria-hidden="true">{f.icon}</div>
              <div>
                <div className="sp-feature-title">{f.title}</div>
                <div className="sp-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURED DISHES */}
        <section className="sp-section sp-special-dishes" id="about" aria-labelledby="featured-heading">
          <ScrollReveal>
            <div className="sp-section-header">
              <div>
                <div className="sp-section-tag">✦ Signature Creations</div>
                <h2 id="featured-heading" className="sp-section-title">Our <em>Special</em> Dishes</h2>
                <p className="sp-section-desc">Handpicked favorites from our kitchen — crafted fresh and served with care.</p>
              </div>
              <a href="#menu" className="sp-view-all">See Full Menu →</a>
            </div>
          </ScrollReveal>
          <SwipeCarousel className="sp-dishes-grid sp-dishes-grid-enhanced">
            {featuredDishes.map((dish, i) => (
              <ScrollReveal key={dish.id} delay={i * 80}>
                <article className="sp-dish-card sp-dish-card-enhanced">
                  <div className="sp-dish-img-wrap">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="sp-dish-img-real"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="sp-dish-meta-row">
                    {dish.badge && <span className="sp-dish-badge-text">{dish.badge}</span>}
                    <span>⭐ {dish.rating}</span>
                    <span>🌶 {dish.spice}</span>
                    <span>{dish.diet === "veg" ? "🥬 Veg" : "🍗 Non-Veg"}</span>
                  </div>
                  <div className="sp-dish-cat">{dish.cat}</div>
                  <h3 className="sp-dish-name">{dish.name}</h3>
                  <p className="sp-dish-desc">{dish.desc}</p>
                  <div className="sp-dish-footer">
                    <div className="sp-dish-price">{formatPrice(dish.price)}</div>
                    <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-dish-order-btn">Order Now</a>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </SwipeCarousel>
        </section>

        {/* CHEF */}
        <section className="sp-section sp-chef-section" id="chef" aria-labelledby="chef-heading">
          <div className="sp-chef-visual">
            <div className="sp-chef-avatar">
              <ChefPhoto src={IMAGES.chef} name="Chef Raj Malhotra" />
            </div>
            <div className="sp-chef-badge-float"><div className="num">22+</div><div className="lbl">Years</div></div>
          </div>
          <ScrollReveal>
            <div className="sp-chef-content">
              <div className="sp-section-tag">✦ Behind the Kitchen</div>
              <h2 id="chef-heading" className="sp-section-title">Meet Our <em>Master</em> Chef</h2>
              <p className="sp-section-desc" style={{ color: "rgba(255,255,255,0.75)" }}>
                Chef Raj Malhotra — award-winning chef specializing in North Indian cuisine with 22+ years across premium hotel kitchens.
              </p>
              <div className="sp-chef-stats-grid">
                {chefStats.map((s) => (
                  <div key={s.label} className="sp-chef-stat">
                    <span className="sp-chef-stat-num">
                      <Counter end={s.value} suffix={s.suffix} />
                    </span>
                    <span className="sp-chef-stat-lbl">{s.label}</span>
                  </div>
                ))}
              </div>
              <ul className="sp-chef-awards">
                <li>🏆 Award-Winning Chef — National Culinary Championships</li>
                <li>📜 Certified — Indian Culinary Federation & Le Cordon Bleu</li>
                <li>🔥 Specialist in North Indian & Tandoor Cuisine</li>
              </ul>
            </div>
          </ScrollReveal>
        </section>

        {/* MENU */}
        <section className="sp-section sp-popular-menu" id="menu" aria-labelledby="menu-heading">
          <ScrollReveal>
            <div className="sp-section-header">
              <div>
                <div className="sp-section-tag">✦ Order Now</div>
                <h2 id="menu-heading" className="sp-section-title">Our <em>Popular</em> Menu</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="sp-menu-tabs" role="tablist" aria-label="Menu categories">
            {tabCounts.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`sp-tab sp-tab-enhanced ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
                <span className="sp-tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
          <SwipeCarousel key={activeTab} className="sp-menu-grid sp-menu-grid-enhanced" role="tabpanel">
            {visibleItems.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 3) * 60}>
                <article className="sp-menu-card sp-menu-card-enhanced">
                  <div className="sp-menu-top-row">
                    <span>⭐ {item.rating}</span>
                    <span>⏱ {item.prepTime} min</span>
                    {item.popular && <span className="sp-menu-popular">Popular</span>}
                  </div>
                  <div className="sp-menu-img-wrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="sp-menu-img-real"
                      sizes="(max-width:768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="sp-menu-name">{item.name}</h3>
                  <p className="sp-menu-sub">{item.sub}</p>
                  <div className="sp-menu-footer">
                    <span className="sp-menu-price">{formatPrice(item.price)}</span>
                    <div className="sp-qty-control" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" className="sp-qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span className="sp-qty-num">{getQty(item.id)}</span>
                      <button type="button" className="sp-qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <button type="button" className="sp-add-cart-btn" onClick={() => addToCart(item.id, item.name)}>
                    Add to Cart
                  </button>
                </article>
              </ScrollReveal>
            ))}
          </SwipeCarousel>
        </section>

        {/* SOCIAL PROOF */}
        <section className="sp-social-proof" aria-label="Customer ratings">
          <ScrollReveal>
            <div className="sp-social-proof-inner">
              <div className="sp-social-proof-rating">
                <span className="sp-stars-large" aria-hidden="true">★★★★★</span>
                <p className="sp-social-score">4.9/5 Average Rating</p>
                <p className="sp-social-based">Based on 1,200+ Reviews</p>
              </div>
              <div className="sp-platform-grid">
                {reviewPlatforms.map((p) => (
                  <div key={p.name} className="sp-platform-card">
                    <strong>{p.name}</strong>
                    <span>{p.rating} ★</span>
                    <small>{p.reviews} reviews</small>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* TESTIMONIALS */}
        <section className="sp-section sp-testimonials" aria-labelledby="reviews-heading">
          <ScrollReveal>
            <div className="sp-section-header">
              <div>
                <div className="sp-section-tag">✦ Guest Reviews</div>
                <h2 id="reviews-heading" className="sp-section-title">What Our <em>Guests</em> Say</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="sp-testi-aggregate" aria-label="Overall rating">
            <span className="sp-testi-aggregate-stars" aria-hidden="true">★★★★★</span>
            <p className="sp-testi-aggregate-score">4.9/5 Average Rating</p>
            <p className="sp-testi-aggregate-count">Based on 1,200+ Reviews</p>
          </div>
          <div
            className="sp-testi-carousel"
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const diff = touchStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) setTestimonialIdx((i) => diff > 0 ? (i + 1) % testimonials.length : (i - 1 + testimonials.length) % testimonials.length);
            }}
          >
            <button type="button" className="sp-carousel-btn sp-carousel-prev" onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous review">‹</button>
            <article className="sp-testi-card sp-testi-card-enhanced">
              <div className="sp-testi-header">
                <Avatar name={t.name} size={56} className="sp-testi-photo" />
                <div className="sp-testi-info">
                  <div className="sp-testi-name">{t.name}</div>
                  <div className="sp-testi-role">{t.location} · {t.date}</div>
                  {t.verified && <span className="sp-verified">✓ Verified Customer</span>}
                </div>
                <div className="sp-testi-stars" aria-label={`${t.rating} stars`}>{"★".repeat(t.rating)}</div>
              </div>
              <TestimonialReview key={testimonialIdx} quote={t.quote} />
            </article>
            <button type="button" className="sp-carousel-btn sp-carousel-next" onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)} aria-label="Next review">›</button>
          </div>
          <div className="sp-carousel-dots" role="tablist" aria-label="Review pagination">
            {testimonials.map((_, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === testimonialIdx} className={`sp-dot ${i === testimonialIdx ? "active" : ""}`} onClick={() => setTestimonialIdx(i)} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section className="sp-section sp-blog" aria-labelledby="blog-heading">
          <ScrollReveal>
            <div className="sp-section-header">
              <div>
                <div className="sp-section-tag">✦ Stories from the Kitchen</div>
                <h2 id="blog-heading" className="sp-section-title">Our <em>Blog</em></h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="sp-blog-grid">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <article className="sp-blog-card sp-blog-card-enhanced">
                  <button type="button" className="sp-blog-card-btn" onClick={() => setActiveBlogId(post.id)}>
                    <div className="sp-blog-img-wrap">
                      <Image
                        src={post.image}
                        alt=""
                        width={600}
                        height={400}
                        className="sp-blog-img-real"
                        sizes="(max-width:768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="sp-blog-body">
                      <div className="sp-blog-meta-row">
                        <span className="sp-blog-tag">{post.tag}</span>
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="sp-blog-title">{post.title}</h3>
                      <p className="sp-blog-excerpt">{post.excerpt}</p>
                      <p className="sp-blog-author">By {post.author}</p>
                      <span className="sp-read-more">Read More →</span>
                    </div>
                  </button>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="sp-section sp-contact" id="contact" aria-labelledby="contact-heading">
          <ScrollReveal>
            <div className="sp-section-tag">✦ Get in Touch</div>
            <h2 id="contact-heading" className="sp-section-title">Reserve Your <em>Table Today</em></h2>
            <p className="sp-section-desc">Book your dining experience or place an order in minutes.</p>
            <ul className="sp-urgency-list">
              <li>Limited evening reservations available</li>
              <li>Same-day catering available</li>
              <li>Bulk orders accepted</li>
              <li>Response within 15 minutes</li>
            </ul>
          </ScrollReveal>
          <div className="sp-contact-grid">
            <div className="sp-contact-card">
              <h3>Book a Table</h3>
              <p>Dine-in reservations for birthdays, family dinners & celebrations.</p>
              <div className="sp-contact-actions">
                <a href={WHATSAPP.table} target="_blank" rel="noopener noreferrer" className="sp-btn-whatsapp sp-contact-btn">Book Table</a>
                <a href={`tel:${RESTAURANT.phone}`} className="sp-btn-outline sp-contact-btn">Call Restaurant</a>
              </div>
            </div>
            <div className="sp-contact-card sp-contact-card-highlight">
              <h3>Order Online</h3>
              <p>Delivery, takeaway & bulk party orders — message us your cart.</p>
              <div className="sp-contact-actions">
                <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-btn-whatsapp sp-contact-btn">WhatsApp Order</a>
                <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-btn-primary sp-contact-btn">Order Online</a>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="sp-newsletter" id="newsletter" aria-labelledby="newsletter-heading">
          <div>
            <h2 id="newsletter-heading" className="sp-newsletter-title">Get Exclusive Offers & <em>New Menu Updates</em></h2>
            <ul className="sp-newsletter-benefits">
              {newsletterBenefits.map((b) => <li key={b}>✓ {b}</li>)}
            </ul>
          </div>
          <div>
            {newsletterDone ? (
              <p className="sp-newsletter-done" role="status">
                Thanks for subscribing! We&apos;ll send exclusive offers and new menu updates to your email.
              </p>
            ) : (
              <form
                name="newsletter"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="sp-newsletter-form"
                onSubmit={submitNewsletter}
              >
                <input type="hidden" name="form-name" value="newsletter" />
                <p hidden>
                  <label>
                    Don&apos;t fill this out:
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <label htmlFor="newsletter-email" className="sp-sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  name="email"
                  className="sp-newsletter-input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterSubmitting}
                />
                <button type="submit" className="sp-newsletter-btn" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? "Subscribing…" : "Subscribe →"}
                </button>
                {newsletterError && (
                  <p className="sp-newsletter-error" role="alert">
                    Something went wrong. Please try again or message us on WhatsApp.
                  </p>
                )}
                <p className="sp-newsletter-note">
                  We&apos;ll email you offers and menu updates. You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* BLOG MODAL */}
      {activeBlog && (
        <div className="sp-blog-modal-overlay" onClick={() => setActiveBlogId(null)} role="presentation">
          <div className="sp-blog-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="blog-modal-title">
            <button type="button" className="sp-blog-modal-close" onClick={() => setActiveBlogId(null)} aria-label="Close">×</button>
            <div className="sp-blog-modal-hero">
              <Image src={activeBlog.image} alt="" width={680} height={382} className="object-cover sp-blog-modal-img" sizes="680px" loading="lazy" />
            </div>
            <div className="sp-blog-modal-body">
              <div className="sp-blog-meta-row"><span className="sp-blog-tag">{activeBlog.tag}</span><span>{activeBlog.readTime}</span><span>{activeBlog.date}</span></div>
              <h2 id="blog-modal-title" className="sp-blog-modal-title">{activeBlog.title}</h2>
              <p className="sp-blog-modal-author">By {activeBlog.author}</p>
              <div className="sp-blog-modal-content">{activeBlog.content.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
            </div>
          </div>
        </div>
      )}

      <footer className="sp-footer" role="contentinfo">
        <div className="sp-footer-grid">
          <div>
            <div className="sp-footer-logo">Spice<span>Palace</span></div>
            <p className="sp-footer-desc">Celebrating the soul of Indian cuisine since 2006.</p>
          </div>
          <div>
            <div className="sp-footer-heading">Quick Links</div>
            <ul className="sp-footer-links">
              <li><a href="#menu">Menu</a></li>
              <li><a href="#contact">Order & Contact</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <div className="sp-footer-heading">Contact</div>
            <ul className="sp-footer-links">
              <li><a href={`tel:${RESTAURANT.phone}`}>{RESTAURANT.phoneDisplay}</a></li>
              <li><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></li>
              <li>{RESTAURANT.address}</li>
            </ul>
          </div>
        </div>
        <div className="sp-footer-bottom"><p>© {new Date().getFullYear()} Spice Palace. All rights reserved.</p></div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className="sp-mobile-bar" role="navigation" aria-label="Quick actions">
        <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="sp-mobile-bar-btn sp-mobile-order">Order Now</a>
        <a href={WHATSAPP.table} target="_blank" rel="noopener noreferrer" className="sp-mobile-bar-btn sp-mobile-book">Book a Table</a>
      </div>

      <a href={WHATSAPP.table} target="_blank" rel="noopener noreferrer" className="sp-float-wa sp-float-wa-desktop" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}
