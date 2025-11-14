import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import star from '../assets/star.png';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const heroRef = useRef(null);
  const sectionRefs = useRef([]);

  function calculateTimeLeft() {
    const difference = +new Date('2026-01-01') - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 400);

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const visible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
          setIsVisible(prev => ({ ...prev, [index]: visible }));
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email invalide !");
      return;
    }
    try {
      await addDoc(collection(db, "bledlist"), {
        email: email,
        subscribedAt: Timestamp.now()
      });
      alert(`Thanks! You'll be the first to know, ${email}.`);
      setEmail('');
    } catch (error) {
      console.error("Erreur lors de l'abonnement bledlist :", error);
      alert("❌ Une erreur est survenue. Réessaye !");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "subscribers"), {
        email: newsletterEmail,
        subscribedAt: Timestamp.now()
      });
      alert(`Welcome to the BledLand movement, ${newsletterEmail}!`);
      setNewsletterEmail('');
    } catch (error) {
      console.error("Erreur lors de l'abonnement :", error);
      alert("❌ Une erreur est survenue. Réessaye !");
    }
  };

  const stats = [
    { number: "15K+", label: "Waitlist Members" },
    { number: "5", label: "Cities Featured" },
    { number: "48", label: "Hours Sell-out Time" },
    { number: "100%", label: "Premium Quality" }
  ];

  const features = [
    { icon: "🛠️", title: "Artisan Crafted", desc: "Every stitch inspired by Moroccan artistry" },
    { icon: "⚡", title: "Street Spirit", desc: "Built for urban rhythm and cultural pride" },
    { icon: "🔒", title: "Limited Drops", desc: "Exclusivity meets authenticity" },
    { icon: "🌍", title: "Global Vision", desc: "Moroccan soul, worldwide identity" },
  ];

  const cities = [
    { name: "RABAT", desc: "Calm, cultural, and forward-looking. Rabat represents balance, heritage meets innovation."},
    { name: "CASABLANCA", desc: "The sleepless city. The rhythm never stops. Our Casa edition mirrors that chaos — clean cuts, raw details, bold presence."},
    { name: "TANGIER", desc: "Wind, waves, and whispers of freedom. Tangier stands between two worlds, where Morocco meets the horizon."},
    { name: "MARRAKESH", desc: "The red city never hides its heat. The Marrakech capsule is vibrant, fearless, and unapologetically Moroccan."},
    { name: "FEZ", desc: "Old walls, ancient crafts, timeless vibes. Fès reminds us where it all started — the roots that built our style."},
  ];

  const handleCardClick = (index) => {
    setFlippedCardIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="home">
      <div 
        className="cursor-follower"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      ></div>
      
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" ref={heroRef} className="hero">
        <div className="urban-grid"></div>
        <div className="graffiti-overlay"></div>
        <div className="hero-3d-container">
          <div className="floating-elements">
            <div className="floating-element element-1">BLED</div>
            <div className="floating-element element-2">LAND</div>
            <div className="floating-element element-3">
              <img src={star} alt="Star" className="floating-image" />
            </div>
          </div>
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/videos/bledland-teaser.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-urban">BLEDLAND</span>
            </h1>
            <p className="hero-subtitle">From the Bled to the World.</p>
            <div className="hero-cta">
              <a href="#newsletter" className="cta-btn urban-primary">JOIN THE MOVEMENT</a>
              <a href="#story" className="cta-btn urban-secondary">OUR STORY</a>
            </div>
          </div>
          <div className="hero-scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section 
        ref={addToRefs} 
        className={`stats-section ${isVisible[0] ? 'visible' : ''}`}
      >
        <div className="stats-container">
          {stats.map((s, i) => (
            <div key={i} className="stat-card-urban">
              <div className="stat-number-urban" data-count={s.number}>
                {s.number}
              </div>
              <div className="stat-line"></div>
              <p className="stat-label-urban">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY SECTION */}
      <section 
        id="story" 
        ref={addToRefs} 
        className={`story-section ${isVisible[1] ? 'visible' : ''}`}>
        <div className="urban-bg-pattern"></div>
        <div className="story-container">
          <div className="story-text">
            <h2 className="section-title-urban">
              <span className="title-number">01</span>
              OUR <span className="urban-accent">STORY</span>
            </h2>
            <p className="story-desc-urban">
              BledLand was born from Moroccan streets and fueled by global ambition.
              Each piece merges local tradition with modern attitude — not just fashion, but identity —
            </p>
            <div className="features-grid-urban">
              {features.map((f, i) => (
                <div key={i} className="feature-card-urban">
                  <div className="feature-icon-urban">{f.icon}</div>
                  <div className="feature-content">
                    <h4 className="feature-title-urban">{f.title}</h4>
                    <p className="feature-desc-urban">{f.desc}</p>
                  </div>
                  <div className="feature-hover-line"></div>
                  <div className="feature-bg-gradient"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section 
        id="drop" 
        ref={addToRefs} 
        className={`countdown-section ${isVisible[2] ? 'visible' : ''}`}
      >
        <div className="countdown-urban-bg"></div>
        <div className="countdown-urban">
          <h2 className="countdown-title-urban">
            <span className="title-number">02</span>
            THE FIRST DROP
          </h2>
          <p className="countdown-subtitle-urban">Join the movement before it hits the streets.</p>
          <div className="timer-urban">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="time-unit-urban">
                <div className="time-card-urban">
                  <span className="time-number-urban">
                    {value || 0}
                  </span>
                </div>
                <p className="time-label-urban">{unit.toUpperCase()}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleNotifySubmit} className="notify-form-urban">
            <div className="input-group-urban">
              <input
                type="email"
                placeholder="YOUR EMAIL FOR EARLY ACCESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="urban-input"
              />
              <button type="submit" className="notify-btn-urban">NOTIFY ME</button>
            </div>
          </form>
        </div>
      </section>
      
      {/* CITIES SECTION */}
      <section 
        id="cities" 
        ref={addToRefs} 
        className={`cities-section ${isVisible[3] ? 'visible' : ''}`}
      >
        <div className="cities-urban-bg"></div>
        <h2 className="section-title-urban">
          <span className="title-number">03</span>
          Our Cities <span className="urban-accent">Story</span>
        </h2>
        <div className="cities-grid-urban">
          {cities.map((city, i) => (
            <div 
              key={i} 
              className={`city-card-urban ${flippedCardIndex === i ? 'active' : ''}`}
              onClick={() => handleCardClick(i)}
              style={{ 
                '--city-color': city.color,
                '--city-image': `url('/images/cities/${city.name.toLowerCase()}.jpg')`
              }}
            >
              <div className="city-card-inner-urban">
                <div className="city-card-front-urban">
                  <div className="city-number">0{i+1}</div>
                  <h3 className="city-name-urban">{city.name}</h3>
                  <div className="city-underline"></div>
                </div>
                <div className="city-card-back-urban">
                  <p className="city-desc-urban">{city.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEHIND THE BRAND SECTION */}
      <section 
        ref={addToRefs} 
        className={`brand-section ${isVisible[4] ? 'visible' : ''}`}
      >
        <div className="brand-urban-bg"></div>
        <div className="brand-content-urban">
          <h2 className="brand-title-urban">
            <span className="title-number">04</span>
            BEHIND THE BRAND
          </h2>
          <p className="brand-desc-urban">Bledland was born out of curiosity — to create something that carries the Moroccan identity in a new language: streetwear.
            We don’t chase trends. We build legacy.<br></br>
            Our pieces are crafted with the spirit of Morocco — bold, proud, and creative.
          </p>
          <div className="brand-stats-urban">
            <div className="brand-stat">
              <div className="brand-stat-number">100%</div>
              <div className="brand-stat-label">AUTHENTIC</div>
            </div>
            <div className="brand-stat">
              <div className="brand-stat-number">24/7</div>
              <div className="brand-stat-label">STREET READY</div>
            </div>
            <div className="brand-stat">
              <div className="brand-stat-number">∞</div>
              <div className="brand-stat-label">CULTURE</div>
            </div>
          </div>
          <a href="#newsletter" className="brand-btn-urban">BE PART OF THE STORY</a>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section 
        id="newsletter" 
        ref={addToRefs} 
        className={`newsletter-section ${isVisible[5] ? 'visible' : ''}`}
      >
        <div className="newsletter-urban-bg"></div>
        <div className="newsletter-content-urban">
          <h2 className="newsletter-title-urban">
            <span className="title-number">05</span>
            JOIN THE MOVEMENT
          </h2>
          <p className="newsletter-subtitle-urban">Early access. Secret drops. Exclusive news. <br></br>
            No spam. Just pure Bledland energy.</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form-urban">
            <div className="input-group-urban">
              <input
                type="email"
                placeholder="join the waitlist"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="urban-input"
              />
              <button type="submit" className="subscribe-btn-urban">Get Access</button>
            </div>
          </form>
          <div className="newsletter-footer-urban">
            <span>STREET CULTURE</span>
            <span>URBAN IDENTITY</span>
            <span>MOROCCAN SOUL</span>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          className="scroll-top-urban"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Home;
