import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PortfolioGrid } from './portfolio/PortfolioGrid';

const PORTFOLIO_STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Retention' },
  { value: '$2B+', label: 'Value Generated' },
  { value: '50+', label: 'Industries Served' }
] as const;

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <SEO
        title="Portfolio & Case Studies | AI Success Stories | Jashom"
        description="Real-world AI transformations: Healthcare diagnostics, fraud detection, supply chain optimization, and more. See how we've delivered $2B+ in value across 500+ projects."
        keywords="AI case studies, machine learning portfolio, AI success stories, GPU optimization results, AI implementation examples, enterprise AI projects"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Real-world transformations powered by our AI and GPU optimization expertise. Discover how we've helped
            organizations achieve breakthrough results.
          </p>
        </motion.div>

        <PortfolioGrid variant="withImage" />

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center mb-12 text-gradient">By The Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {PORTFOLIO_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-2 text-gradient">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 border border-[#ffffff]/30">
            <h2 className="mb-3 sm:mb-4 text-gradient text-xl sm:text-2xl md:text-3xl px-2">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              Join leading organizations that have transformed their operations with Jashom.
            </p>
            <Link
              to="/contact/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-black text-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-center"
              style={{
                border: '1px solid #ffffff',
                boxShadow: '0 0 0 1px #ffffff'
              }}
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
