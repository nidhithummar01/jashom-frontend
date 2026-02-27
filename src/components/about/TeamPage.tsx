import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { SEO } from '../SEO';
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
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function TeamPage() {
  const teamMembers = [
    {
      name: 'Jay Dave',
      role: 'Founder',
      bio: 'Visionary founder leading the company\'s strategy, innovation, and long-term growth.',
      linkedin: 'https://www.linkedin.com/in/jayksdave',
      image: '/images/team/jay-dave-hiring.png'
    },
    {
      name: 'Maxime Derian',
      role: 'Partner (Europe Region)',
      bio: 'Leads business growth and partnerships across the European market.',
      linkedin: 'https://www.linkedin.com/in/maxime-derian/',
      image: '/images/team/maxime-derian.jpg'
    },
    {
      name: 'Soham Thaker',
      role: 'Tech Lead',
      bio: 'Leads technical strategy and architecture, ensuring scalable and high-quality solutions across projects.',
      linkedin: 'https://www.linkedin.com/in/thakersoham/',
      image: '/images/team/soham-thaker.jpg'
    },
    {
      name: 'Dhwanan Gadani',
      role: 'Partner & Delivery Head',
      bio: 'Manages project delivery and client success, ensuring timely execution and quality outcomes.',
      linkedin: 'https://www.linkedin.com/in/dhwanan',
      image: '/images/team/dhwanan-gadani.jpg'
    },
    {
      name: 'Archana Trivedi',
      role: 'Operations Manager',
      bio: 'Oversees day-to-day operations to ensure smooth execution, efficiency, and process excellence.',
      linkedin: 'https://www.linkedin.com/in/archana-trivedi-326b65110',
      image: '/images/team/archana-trivedi.jpg'
    },
    {
      name: 'Abhishek Bhagwat',
      role: 'Sales Manager',
      bio: 'Drives sales strategy and client acquisition by aligning business needs with tailored solutions.',
      linkedin: 'https://www.linkedin.com/in/abhishek-bhagwat-037221248/',
      image: '/images/team/abhishek-bhagwat.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="About Jashom | GPU Optimization & CUDA Development Experts"
        description="Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications"
        keywords="about Jashom, GPU experts, CUDA development team, AI company, high-performance computing"
      />

      {/* Team Section */}
      <section className="pt-24 pb-20">
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
                    <motion.div
                      className="mb-4 flex justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {member.image ? (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5 flex-shrink-0 aspect-square">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center block"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center">
                                    <span class="text-white/40 text-2xl sm:text-3xl font-semibold">
                                      ${getInitials(member.name)}
                                    </span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-white/40 text-2xl sm:text-3xl font-semibold">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <h3 className="text-white mb-2 text-lg sm:text-xl">{member.name}</h3>
                    <p className="text-white/70 mb-3 text-sm sm:text-base">{member.role}</p>
                    {member.bio && (
                      <p className="text-white/60 mb-5 text-sm leading-relaxed px-2">{member.bio}</p>
                    )}
                    <a
                      href={member.linkedin || '#'}
                      target={member.linkedin ? "_blank" : undefined}
                      rel={member.linkedin ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-center text-[#d1d5db] hover:text-white transition-colors mt-1"
                      onClick={(e) => {
                        if (!member.linkedin) {
                          e.preventDefault();
                        }
                      }}
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

