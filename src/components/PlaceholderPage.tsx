import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { SEO } from './SEO';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <SEO
        title={`${title} | Jashom - Coming Soon`}
        description={description}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#ffffff]/20 to-[#d1d5db]/20 border border-[#ffffff]/30 mb-8">
            <Construction className="w-12 h-12 text-[#d1d5db]" />
          </div>

          <h1 className="mb-4 text-gradient">{title}</h1>

          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            {description}
          </p>

          <p className="text-white/50 mb-12">
            This page is currently under construction. Check back soon for updates!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffffff] to-[#d1d5db] text-black hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-[#ffffff]/30 text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 mb-6">Meanwhile, explore our other pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/" className="text-[#d1d5db] hover:text-white transition-colors">
                Services
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/capability/" className="text-[#d1d5db] hover:text-white transition-colors">
                Capabilities
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/portfolio/" className="text-[#d1d5db] hover:text-white transition-colors">
                Portfolio
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/contact/" className="text-[#d1d5db] hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
