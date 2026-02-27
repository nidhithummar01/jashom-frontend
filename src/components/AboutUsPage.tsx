import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { SEO } from './SEO';
import { PortfolioGrid } from './portfolio/PortfolioGrid';
import { Linkedin } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export function AboutUsPage() {
  const location = useLocation();

  // Determine which section to show based on hash
  // Use both pathname and hash to ensure re-render on navigation
  const hash = location.hash.substring(1); // Remove the '#' symbol
  const pathAndHash = `${location.pathname}${location.hash}`;

  // Show Team if hash is 'team' or if on /about with no hash (default to Team)
  const showTeam = hash === 'team' || (location.pathname === '/about' && !hash);
  // Show Portfolio only if hash is 'portfolio'
  const showPortfolio = hash === 'portfolio';

  useEffect(() => {
    // Force scroll to top when hash changes to ensure proper rendering
    if (location.hash) {
      const hashValue = location.hash.substring(1);
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(hashValue);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If element not found, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else if (location.pathname === '/about') {
      // If on /about with no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const teamMembers = [
    {
      name: 'Jay Dave',
      role: 'Founder',
      linkedin: null
    },
    {
      name: 'Soham Thaker',
      role: 'Tech Lead',
      linkedin: null
    },
    {
      name: 'Archana Trivedi',
      role: 'Operation Manager',
      linkedin: null
    },
    {
      name: 'Arpit',
      role: 'DevOps and Security Head (CISO)',
      linkedin: null
    },
    {
      name: 'Dhwana Gadani',
      role: 'Partner & Delivery Head',
      linkedin: null
    },
    {
      name: 'Maxime Derian',
      role: 'Partner â€“ Europe Region',
      linkedin: null
    },
    {
      name: 'Abhishek Bhagwat',
      role: 'Sales Manager',
      linkedin: null
    }
  ];

  return (
    <>
      <SEO
        title="About Jashom | GPU Optimization & CUDA Development Experts"
        description="Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications"
      />

      <div className="about us">
        <div className="min-h-screen bg-black" key={pathAndHash}>

          {/* Team Section - Only render if hash is 'team' or no hash on /about */}
          {showTeam && (
            <section id="team" className="pt-24 pb-20" key="team-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#d1d5db]">Our Team</span>
                  </motion.div>
                  <h1 className="mb-4 text-gradient font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Meet the Team</h1>
                  <p className="text-white/70 max-w-3xl mx-auto">
                    The talented individuals driving innovation and excellence at Jashom.
                  </p>
                </motion.div>

                {/* Team Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.name}
                      variants={staggerItem}
                    >
                      <GlassCard>
                        <div className="text-center relative">
                          <h3 className="text-white mb-2 text-lg sm:text-xl">{member.name}</h3>
                          <p className="text-white/70 mb-4 text-sm sm:text-base">{member.role}</p>
                          <a
                            href={member.linkedin || '#'}
                            target={member.linkedin ? "_blank" : undefined}
                            rel={member.linkedin ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors"
                            onClick={(e) => {
                              if (!member.linkedin) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm">LinkedIn</span>
                          </a>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* Portfolio Section - Only render if hash is 'portfolio' */}
          {showPortfolio && (
            <section id="portfolio" className="pt-24 pb-20" key="portfolio-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#d1d5db]">Success Stories</span>
                  </motion.div>
                  <h1 className="mb-4 text-gradient">Portfolio</h1>
                  <p className="text-white/70 max-w-3xl mx-auto">
                    Real-world transformations powered by our AI and GPU optimization expertise.
                    Discover how we've helped organizations achieve breakthrough results.
                  </p>
                </motion.div>

                <PortfolioGrid />
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
