import { motion } from 'motion/react';
import { SEO } from './SEO';
import { ArrowRight } from 'lucide-react';

export function ServicesPage() {
  // AI Services
  const aiServices = [
    { title: 'AI GPU Optimization & Attestation', path: '/services/ai-gpu-optimization/' },
    { title: 'RAG Applications', path: '/services/rag-applications/' },
    { title: 'AI Agentic Systems (N8N automation)', path: '/services/ai-agentic-systems/' },
    { title: 'AI Integration & Workflow Automation', path: '/services/ai-automation/' }
  ];

  // Cybersecurity
  const securityServices = [
    { title: 'Cybersecurity', path: '/services/cyber-security/' },
    { title: 'VAPT', path: '/services/vapt/' },
    { title: 'Compliance & Risk', path: '/services/compliance-risk/' }
  ];

  // Cloud & DevOps Engineering
  const cloudDevOpsServices = [
    { title: 'DevOps & DevSecOps', path: '/services/devops-devsecops/' },
    { title: 'Cloud Computing', path: '/services/devops-cloud/' },
    { title: 'Edge Computing', path: '/services/edge-computing/' },
    { title: 'CI/CD Automation', path: '/services/cicd-automation/' }
  ];

  // Product Engineering
  const productServices = [
    { title: 'Product Engineering (Full-Stack Development)', path: '/services/product-engineering/' },
    { title: 'Custom Development', path: '/services/custom-development/' },
    { title: 'Micro-SaaS Development', path: '/services/micro-saas/' }
  ];


  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <SEO
        title="Our Services | AI, Cloud, DevOps, Product Engineering & Security | Jashom"
        description="Comprehensive technology services: AI & GPU Optimization, Cloud & DevOps Engineering, Product Development, Cybersecurity, and Staff Augmentation."
        keywords="AI services, cloud computing, DevOps, product engineering, cybersecurity, staff augmentation"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-effect border border-[#ffffff]/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#d1d5db] text-xs sm:text-sm">What We Offer</span>
          </motion.div>
          <h1 className="mb-4 sm:mb-6 text-gradient text-3xl sm:text-4xl md:text-5xl px-2">Our Services</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Comprehensive technology solutions tailored to transform your business with cutting-edge innovation and domain expertise
          </p>
        </motion.div>

        {/* Services Grid - Side by Side Layout */}
        <section className="py-12 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Left Column: AI Services & Cybersecurity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-16 sm:space-y-20 lg:space-y-24"
            >
              {/* AI Services Section */}
              <div>
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-10">AI Services</h2>
                <div className="space-y-3 sm:space-y-5">
                  {aiServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.path}
                      className="block text-white/80 hover:text-white transition-colors text-base sm:text-lg py-2 sm:py-3 break-words"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {service.title}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Cybersecurity Section */}
              <div>
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-10">Cybersecurity</h2>
                <div className="space-y-3 sm:space-y-5">
                  {securityServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.path}
                      className="block text-white/80 hover:text-white transition-colors text-base sm:text-lg py-2 sm:py-3 break-words"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (aiServices.length + index) * 0.05 }}
                    >
                      {service.title}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Cloud & DevOps Engineering & Product Engineering */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-16 sm:space-y-20 lg:space-y-24"
            >
              {/* Cloud & DevOps Engineering Section */}
              <div>
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-10">Cloud & DevOps Engineering</h2>
                <div className="space-y-3 sm:space-y-5">
                  {cloudDevOpsServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.path}
                      className="block text-white/80 hover:text-white transition-colors text-base sm:text-lg py-2 sm:py-3 break-words"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      {service.title}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Product Engineering Section */}
              <div>
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-10">Product Engineering</h2>
                <div className="space-y-3 sm:space-y-5">
                  {productServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.path}
                      className="block text-white/80 hover:text-white transition-colors text-base sm:text-lg py-2 sm:py-3 break-words"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (cloudDevOpsServices.length + index) * 0.05 }}
                    >
                      {service.title}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          className="mt-12 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-20 lg:p-24 border border-[#ffffff]/30">
            <h2 className="mb-4 sm:mb-8 text-white text-xl sm:text-2xl font-bold px-2">Ready to Transform Your Business?</h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Let's discuss how our services and expertise can address your specific business challenges and unlock new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-transparent text-white hover:bg-white/10 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
