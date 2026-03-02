import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { SEO } from './SEO';
import { MagneticButton } from './MagneticButton';
import { Cpu, Heart, UtensilsCrossed, ShoppingCart, TrendingUp, Leaf, Package, Scale } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, rotateX: -10 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

export function SolutionsPage() {
  const solutions = [
    {
      icon: Heart,
      title: 'HealthTech',
      path: '/solutions/healthtech/',
      description: 'Empower healthcare providers with AI-driven insights, predictive analytics, and automated workflows.',
      features: ['AI-Powered Diagnostics', 'Predictive Care', 'EHR Automation', 'Virtual Assistants']
    },
    {
      icon: Package,
      title: 'Supply Chain',
      path: '/solutions/supply-chain/',
      description: 'Optimize, automate, and forecast your supply chain with AI-powered precision.',
      features: ['Demand Forecasting', 'Route Optimization', 'Warehouse Automation', 'Digital Twins']
    },
    {
      icon: TrendingUp,
      title: 'FinTech',
      path: '/solutions/fintech/',
      description: 'Accelerate financial innovation with secure, intelligent, and scalable AI systems.',
      features: ['Fraud Detection', 'Credit Underwriting', 'Compliance & KYC', 'Robo-Advisors']
    },
    {
      icon: Leaf,
      title: 'EnvironmentTech',
      path: '/solutions/environmenttech/',
      description: 'Use AI to monitor, predict, and protect the environment for sustainable decision-making.',
      features: ['Carbon Analysis', 'Climate Prediction', 'Energy Management', 'Waste Automation']
    },
    {
      icon: Scale,
      title: 'Legal & Tax',
      path: '/solutions/legal-and-tax/',
      description: 'Transform legal and tax workflows with AI assistants and automated document processing.',
      features: ['Contract Review', 'Tax Compliance', 'Legal Research', 'Document Extraction']
    },
    {
      icon: ShoppingCart,
      title: 'RetailTech',
      path: '/solutions/retail-tech/',
      description: 'Reimagine retail with AI-driven personalization, automation, and predictive intelligence.',
      features: ['Personalization', 'Sales Forecasting', 'Computer Vision', 'Store Analytics']
    },
    {
      icon: UtensilsCrossed,
      title: 'FoodTech',
      path: '/solutions/foodtech/',
      description: 'Modernize food operations with AI systems that improve safety, quality, and production.',
      features: ['Quality Detection', 'Yield Optimization', 'Traceability', 'Demand Forecasting']
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <SEO
        title="AI Solutions by Industry | Jashom - Healthcare, FinTech, Retail & More"
        description="Discover tailored AI and GPU optimization solutions for Healthcare, FinTech, FoodTech, Retail, and Environmental sectors. Industry-specific expertise delivering measurable impact."
        keywords="AI healthcare solutions, fintech AI, retail AI, foodtech optimization, environmental AI, GPU optimization by industry, AI implementation"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-effect border border-[#ffffff]/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#d1d5db] text-xs sm:text-sm">Industry Solutions</span>
          </motion.div>
          <h1 className="mb-4 sm:mb-6 text-gradient text-3xl sm:text-4xl md:text-5xl px-2">Our Solutions</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Tailored AI and GPU optimization solutions across diverse industries,
            delivering measurable impact and transformative results.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              id={solution.title.toLowerCase().replace(/ /g, '-')}
            >
              <Link to={solution.path}>
                <GlassCard delay={0}>
                  <div className="flex flex-col h-full">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center mb-4"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.15
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <solution.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="mb-3 text-white">{solution.title}</h3>
                    <p className="text-white/70 mb-6 flex-grow">{solution.description}</p>
                    <div className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center text-white/80 group cursor-pointer"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-[#ffffff] mr-2"
                            whileHover={{ scale: 2 }}
                          />
                          <span className="text-sm group-hover:text-white transition-colors">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 border border-[#ffffff]/30 relative overflow-hidden"
            whileHover={{
              borderColor: 'rgba(0, 255, 255, 0.5)',
              boxShadow: "0 20px 60px rgba(30, 144, 255, 0.3)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/10 to-[#d1d5db]/10"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative z-10">
              <h2 className="mb-3 sm:mb-4 text-gradient text-xl sm:text-2xl md:text-3xl px-2">Ready to Transform Your Industry?</h2>
              <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
                Let's discuss how our AI solutions can drive innovation in your specific domain.
              </p>
              <MagneticButton
                href="/contact/"
                className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-black border border-white text-white transition-all duration-300 hover:bg-white hover:text-black text-sm sm:text-base"
              >
                Schedule Consultation
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
