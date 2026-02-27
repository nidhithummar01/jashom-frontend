import { motion } from 'motion/react';
import { SEO } from '../SEO';
import { PortfolioGrid } from '../portfolio/PortfolioGrid';

export function AboutPortfolioPage() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Portfolio | About Us | Jashom - Success Stories"
        description="Real-world transformations powered by our AI and GPU optimization expertise. Discover how we've helped organizations achieve breakthrough results."
        keywords="Jashom portfolio, case studies, AI projects, success stories"
      />

      <section className="pt-24 pb-20">
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

          <PortfolioGrid />
        </div>
      </section>
    </div>
  );
}
