import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Flower2,
  Gift,
  Heart,
  Instagram,
  Menu,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import { site } from '../config/site';
import { faqs } from '../data/faqs';
import { filters, products } from '../data/products';

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.55, ease },
};

function LinkOut({
  href = site.instagramProfile,
  children,
  className,
  testId,
  label,
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function ProductVisual({ src, alt, contain, className }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`${className} image-fallback`}
        role="img"
        aria-label={alt || 'Product photograph unavailable'}
      >
        <Flower2 size={28} strokeWidth={1.3} />
        <span>Photo coming soon</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt || 'Product photograph'}
      loading="lazy"
      onError={() => setFailed(true)}
      style={contain ? { objectFit: 'contain', padding: 8 } : undefined}
    />
  );
}

export function AnnouncementBar() {
  return (
    <div className="announcement">
      Assalamu Alaikum · Made with love, wrapped with care
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const navLinks = site.nav.map((item) => (
    <a
      key={item.href}
      href={item.href}
      onClick={() => setOpen(false)}
      data-testid={`nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
    >
      {item.label}
    </a>
  ));

  return (
    <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Thetidhkar home"
          data-testid="link-brand-home"
        >
          Thetidhkar
          <small>THOUGHTFUL GIFTS · LITTLE JOYS · BIG FEELINGS</small>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navLinks}
        </nav>
        <div className="nav-actions">
          <LinkOut
            className="icon-link"
            testId="link-instagram-nav"
            label="Visit Thetidhkar on Instagram"
          >
            <Instagram size={18} />
          </LinkOut>
          <LinkOut
            className="button-primary nav-cta"
            testId="button-shop-instagram-nav"
          >
            Shop on Instagram <ArrowRight size={14} />
          </LinkOut>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          data-testid="button-mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks}
            <LinkOut
              className="mobile-shop"
              testId="link-mobile-instagram"
            >
              Shop on Instagram
            </LinkOut>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-copy"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="eyebrow">
          THOUGHTFUL GIFTS · HANDCRAFTED WITH LOVE
        </div>
        <h1>
          <span>Little Gifts.</span>
          <span>Big Feelings.</span>
        </h1>
        <p>
          Discover thoughtful little treasures, beautiful handmade candles,
          and special gifts made to turn everyday moments into memories.
        </p>
        <div className="hero-actions">
          <a
            href="#collection"
            className="button-primary"
            data-testid="button-explore-collection"
          >
            Explore Our Collection <ArrowRight size={15} />
          </a>
          <LinkOut
            className="button-outline"
            testId="button-shop-instagram-hero"
          >
            Shop on Instagram <Instagram size={15} />
          </LinkOut>
        </div>
        <div className="hero-note">
          Handpicked details. Heartfelt gifting. Made to make someone smile.
        </div>
      </motion.div>
      <motion.div
        className="hero-art"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      >
        <div className="hero-image-frame">
          <img
            src="/assets/Handmade_Rose_Candle_Collection_1793018947516.webp"
            alt="Rose-shaped pink and ivory candles arranged on a gold-edged tray"
            fetchPriority="high"
          />
        </div>
        <div className="hero-inset">
          <img
            src="/assets/Blush_Boutique_Dreams_with_Pearl_Hangers_1793018947514.webp"
            alt="Pearl clothing hangers decorated with blush bows"
            loading="lazy"
          />
        </div>
        <div className="hero-stamp">
          Small Flames,
          <br />
          Big Happiness.
        </div>
      </motion.div>
      <a
        className="hero-scroll"
        href="#highlights"
        aria-label="Scroll to brand highlights"
        data-testid="link-scroll-highlights"
      >
        <ArrowDown size={15} />
      </a>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    ['Thoughtfully Curated', 'Little details that mean more.', Sparkles],
    ['Handmade With Love', 'Carefully crafted, beautifully finished.', Heart],
    ['Beautifully Giftable', 'Thoughtful touches for special moments.', Gift],
    ['Made for Every Occasion', "Celebrate life's little joys.", Flower2],
  ];

  return (
    <section
      className="trust-strip"
      id="highlights"
      aria-label="Brand highlights"
    >
      {items.map(([title, desc, Icon], index) => (
        <div
          className="trust-item"
          key={title}
          data-testid={`value-highlight-${index}`}
        >
          <Icon size={23} strokeWidth={1.4} />
          <div>
            <strong>{title}</strong>
            <span>{desc}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export function ProductSection({
  onOpen,
  selectedFilter,
  setSelectedFilter,
}) {
  const visible =
    selectedFilter === 'All'
      ? products
      : products.filter((product) =>
          selectedFilter === 'Candles'
            ? product.filter === 'Candles' ||
              product.filter === 'Flower Candles'
            : product.filter === selectedFilter,
        );

  return (
    <section className="section-pad collection" id="collection">
      <motion.div {...reveal} className="section-intro">
        <div>
          <div className="eyebrow">A collection of little joys</div>
          <h2 className="section-heading">
            Little Things,
            <br />
            Lots of Love
          </h2>
        </div>
        <p>
          Find something thoughtful for someone special. Each piece is a little
          invitation to make an ordinary day feel meaningful.
        </p>
      </motion.div>
      <div className="filter-row" role="group" aria-label="Filter products">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            className="filter-chip"
            aria-pressed={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
            data-testid={`filter-${filter.toLowerCase().replaceAll(' ', '-')}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <motion.div className="product-grid" layout data-testid="product-grid">
        {visible.map((product, index) => (
          <motion.article
            className="product-card"
            key={product.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.035, ease }}
            data-testid={`card-product-${product.id}`}
          >
            <button
              className="product-image"
              type="button"
              onClick={() => onOpen(product)}
              aria-label={`Quick view: ${product.name}`}
              data-testid={`button-quick-view-${product.id}`}
            >
              <ProductVisual
                className="product-visual"
                src={product.image}
                alt={product.alt}
                contain={product.contain}
              />
              <span className="quick-view-chip">Quick view</span>
            </button>
            {product.category && (
              <div className="product-category">{product.category}</div>
            )}
            <h3 className="product-title">{product.name}</h3>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            {product.price != null && (
              <p className="product-price">{product.price}</p>
            )}
            {product.availabilityLabel && (
              <p className="product-availability">
                {product.availabilityLabel}
              </p>
            )}
            <LinkOut
              className="product-ask"
              href={product.instagramUrl || site.instagramProfile}
              testId={`link-enquire-${product.id}`}
            >
              Enquire on Instagram <ArrowRight size={13} />
            </LinkOut>
          </motion.article>
        ))}
      </motion.div>
      {visible.length === 0 && (
        <div className="empty-state" data-testid="empty-products">
          <h3>A little pause in this collection</h3>
          <p>Try another filter to discover more thoughtful details.</p>
        </div>
      )}
    </section>
  );
}

export function ProductQuickView({ product, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;

      const dialog = document.querySelector('[role="dialog"]');
      const focusable = dialog?.querySelectorAll('button, a[href]');
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="quick-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-title"
          data-testid="product-quick-view"
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.99 }}
          transition={{ duration: 0.26, ease }}
        >
          <button
            ref={closeRef}
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            data-testid="button-close-quick-view"
          >
            <X size={20} />
          </button>
          <ProductVisual
            className="modal-image"
            src={product.image}
            alt={product.alt}
            contain={product.contain}
          />
          <div className="modal-copy">
            {product.category && (
              <div className="eyebrow">{product.category}</div>
            )}
            <h2 id="quick-title">{product.name}</h2>
            {product.description && <p>{product.description}</p>}
            {product.price != null && (
              <p className="product-price">{product.price}</p>
            )}
            {product.availabilityLabel && (
              <p className="product-availability">
                {product.availabilityLabel}
              </p>
            )}
            <p>Ask us on Instagram for current details and availability.</p>
            <LinkOut
              className="button-primary"
              href={product.instagramUrl || site.instagramProfile}
              testId={`button-ask-${product.id}`}
            >
              Ask About This Product <ArrowRight size={15} />
            </LinkOut>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function BrandStory() {
  return (
    <section className="section-pad story" id="story">
      <motion.div className="story-photos" {...reveal}>
        <img
          className="story-main"
          src="/assets/WhatsApp_Image_2026-10-26_at_5.34.03_PM_1793018938400.webp"
          alt="Thetidhkar brand artwork with candles, thoughtful gifts, and pearl accessories"
          loading="lazy"
        />
        <img
          className="story-small"
          src="/assets/Screenshot_2026-10-26_173215_1793018956203.webp"
          alt="A handmade red rose gift wrapped with a ribbon"
          loading="lazy"
        />
      </motion.div>
      <motion.div className="story-copy" {...reveal}>
        <div className="eyebrow">A little corner for thoughtful giving</div>
        <h2 className="section-heading">
          A Little Story,
          <br />
          Wrapped With Love
        </h2>
        <p>
          At Thetidhkar, we believe the smallest gestures can carry the biggest
          feelings. From delicate flower candles to thoughtfully chosen
          gifting details, every piece is selected or created to bring a
          little more beauty, warmth, and joy into someone's day.
        </p>
        <span className="story-script">It's the little things ♡</span>
        <a
          href="#collection"
          className="button-outline"
          data-testid="button-story-collection"
        >
          Discover Our Collection <ArrowRight size={15} />
        </a>
      </motion.div>
    </section>
  );
}

export function OccasionsSection({ onFilter }) {
  const tiles = [
    {
      title: 'Birthday Surprises',
      line: 'A little joy for their day.',
      image:
        '/assets/WhatsApp_Image_2026-10-26_at_5.27.40_PM_(1)_1793018956205.webp',
      filter: 'Gift Sets',
    },
    {
      title: 'Just Because',
      line: 'No reason needed to show you care.',
      image: '/assets/Handmade_Pink_Rose_Candle_1793018947515.webp',
      filter: 'Flower Candles',
    },
    {
      title: 'Thank You Gifts',
      line: 'A thoughtful way to say it.',
      image: '/assets/WhatsApp_Image_2026-10-26_at_5.27.40_PM_1793018956206.webp',
      filter: 'Gift Sets',
    },
    {
      title: 'Special Celebrations',
      line: 'Details for moments worth keeping.',
      image:
        '/assets/WhatsApp_Image_2026-10-26_at_5.27.40_PM_(2)_1793018956204.webp',
      filter: 'Candles',
    },
  ];

  return (
    <section className="section-pad occasions">
      <motion.div {...reveal}>
        <div className="eyebrow">A thoughtful note for any moment</div>
        <h2 className="section-heading">
          Little Gifts for Every
          <br />
          Kind of Moment
        </h2>
      </motion.div>
      <div className="occasion-grid">
        {tiles.map((tile, index) => (
          <a
            href="#collection"
            className="occasion-tile"
            key={tile.title}
            onClick={() => onFilter(tile.filter)}
            data-testid={`link-occasion-${index}`}
          >
            <img src={tile.image} alt="" loading="lazy" />
            <div className="occasion-copy">
              <h3>{tile.title}</h3>
              <p>{tile.line}</p>
              <span>EXPLORE GIFTS&nbsp; →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const instagramImages = [
  {
    src: '/assets/Handmade_Pink_Rose_Candle_1793018947515.webp',
    alt: 'Pink sculpted flower candle',
  },
  {
    src: '/assets/Romantic_Rose_Candle_Trio_1793018947515.webp',
    alt: 'Glass rose candle trio',
  },
  {
    src: '/assets/Handmade_Rose_Candle_Collection_1793018947516.webp',
    alt: 'Collection of blush and ivory rose candles',
  },
  {
    src: '/assets/Handcrafted_Rose_Candle_Collection_1793018947517.webp',
    alt: 'Rose ball and pillar candle collection',
  },
  {
    src: '/assets/Blush_Boutique_Dreams_with_Pearl_Hangers_1793018947514.webp',
    alt: 'Pearl hangers with blush bows',
  },
  {
    src: '/assets/Elegant_Flower_Stick_Candle_Infographic_1793018947518.webp',
    alt: 'Flower stick candle product artwork',
  },
];

export function InstagramSection() {
  return (
    <section className="section-pad instagram">
      <motion.div {...reveal}>
        <div className="eyebrow">The latest little details</div>
        <h2 className="section-heading">
          A Little More Love
          <br />
          on Instagram
        </h2>
        <p className="instagram-sub">
          Discover our latest creations, thoughtful details, and gifting
          inspiration.
        </p>
      </motion.div>
      <div className="insta-grid">
        {instagramImages.map((image, index) => (
          <div
            className="insta-item"
            key={image.src}
            data-testid={`instagram-image-${index}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <LinkOut
              className="insta-overlay"
              testId={`link-instagram-image-${index}`}
              label={`View ${image.alt} on Instagram`}
            >
              <Instagram size={20} />
              <span>View on Instagram</span>
            </LinkOut>
          </div>
        ))}
      </div>
      <LinkOut className="button-primary" testId="button-follow-instagram">
        Follow Thetidhkar on Instagram <Instagram size={15} />
      </LinkOut>
    </section>
  );
}

export function WhyChooseUs() {
  const values = [
    [
      'Thoughtful Selection',
      'Little treasures chosen with care for the feelings behind the giving.',
      Heart,
    ],
    [
      'Beautiful Presentation',
      'The small details make opening a gift feel like a moment of its own.',
      Gift,
    ],
    [
      'Little Details, Big Feelings',
      'A tiny gesture can say what words sometimes cannot.',
      Sparkles,
    ],
    [
      'Gifts Worth Remembering',
      'Thoughtful pieces for moments that stay close to the heart.',
      Flower2,
    ],
  ];

  return (
    <section className="section-pad values" id="values">
      <motion.div {...reveal}>
        <div className="eyebrow">A philosophy in the details</div>
        <h2 className="section-heading">
          Thoughtful in Every
          <br />
          Little Detail
        </h2>
      </motion.div>
      <div className="value-grid">
        {values.map(([title, description, Icon], index) => (
          <motion.article
            className="value-card"
            key={title}
            {...reveal}
            data-testid={`card-brand-value-${index}`}
          >
            <Icon size={23} strokeWidth={1.4} />
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function GiftingCallout() {
  return (
    <section className="callout" id="contact">
      <div className="callout-copy">
        <div className="eyebrow">A little something, just for them</div>
        <h2>Someone Deserves a Little Something Special.</h2>
        <p>
          Find a thoughtful gift, then message us on Instagram to ask about the
          details.
        </p>
        <div className="hero-actions">
          <LinkOut
            className="button-primary"
            href={site.instagramDM}
            testId="button-enquire-instagram"
          >
            Enquire on Instagram <ArrowRight size={15} />
          </LinkOut>
          <a
            className="button-outline"
            href="#collection"
            data-testid="button-callout-browse"
          >
            Browse the Collection
          </a>
        </div>
      </div>
      <img
        className="callout-img"
        src="/assets/WhatsApp_Image_2026-10-26_at_5.27.40_PM_(1)_1793018956205.webp"
        alt="A gift box with decorative candle forms nestled in blush paper"
        loading="lazy"
      />
    </section>
  );
}

export function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="section-pad">
      <motion.div className="faq" {...reveal}>
        <div className="eyebrow">A few helpful details</div>
        <h2 className="section-heading">Good to Know</h2>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <div className="faq-row" key={item.question}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={active === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                data-testid={`button-faq-${index}`}
              >
                <span>{item.question}</span>
                <Plus size={18} />
              </button>
              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function Footer({ onFilter }) {
  const year = new Date().getFullYear();
  const categories = [
    'Flower Candles',
    'Candles',
    'Accessories',
    'Gift Sets',
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            href="#home"
            className="wordmark"
            data-testid="link-footer-home"
          >
            Thetidhkar
            <small>THOUGHTFUL GIFTS · LITTLE JOYS · BIG FEELINGS</small>
          </a>
          <p>
            Thoughtful Gifts • Little Joys • Big Feelings
            <br />
            Purchases and product enquiries are handled through Instagram.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <div className="footer-links">
            {site.nav.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`footer-nav-${link.label
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>Shop categories</h3>
          <div className="footer-links">
            {categories.map((category, index) => (
              <a
                key={category}
                href="#collection"
                onClick={() => onFilter(category)}
                data-testid={`footer-category-${index}`}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>Say hello</h3>
          <div className="footer-links">
            <LinkOut testId="footer-instagram-profile">
              Instagram profile
            </LinkOut>
            <LinkOut
              href={site.instagramDM}
              testId="footer-instagram-dm"
            >
              Instagram Direct Message
            </LinkOut>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Thetidhkar. All little joys reserved.</span>
        <span className="footer-hand">Made with love ♡</span>
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible ? (
    <button
      className="scroll-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      data-testid="button-scroll-top"
    >
      <ArrowUp size={18} />
    </button>
  ) : null;
}
