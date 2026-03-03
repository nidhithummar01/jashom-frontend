import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about/' },
      { label: 'Company Brochure', path: '/brochure/' },
      { label: 'Case Studies', path: '/portfolio/' },
      { label: 'Contact Us', path: '/contact/' }
    ],
    services: [
      { label: 'GPU Optimization Service', path: '/gpu-optimization-service/' },
      { label: 'CUDA Development Service', path: '/cuda-development-service/' },
      { label: 'Hire CUDA Developer', path: '/hire-cuda-developer/' }
    ],
    resources: [
      { label: 'Blog', path: '/blogs/' },
      { label: 'Case Studies', path: '/portfolio/' },
      { label: 'Documentation', path: '/docs/' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy/' },
      { label: 'Terms of Service', path: '/terms/' },
      { label: 'Cookie Policy', path: '/cookies/' },
      { label: 'Security Policy', path: '/security/' }
    ]
  };

  const socialLinks = [
    { 
      href: 'https://www.linkedin.com/company/jashom/', 
      label: 'LinkedIn',
      image: '/images/social-media/linkedin.png.png'
    },
    { 
      href: 'https://www.instagram.com/jashomtechnologies_', 
      label: 'Instagram',
      image: '/images/social-media/instagram.png.png'
    },
    { 
      href: 'https://youtube.com/@infojashom', 
      label: 'YouTube',
      image: '/images/social-media/youtube.png.png'
    },
    { 
      href: 'https://reddit.com/r/jashom', 
      label: 'Reddit',
      image: '/images/social-media/reddit.png.png'
    }
  ];

  return (
    <footer 
      className="relative overflow-hidden mb-2" 
      style={{ 
        background: '#0a0a0a',
        borderTop: '1px solid rgba(34, 211, 238, 0.15)',
        paddingTop: '3rem'
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20 mb-12 pb-8 px-4 md:px-8">
          
          {/* COLUMN 1: Logo + Description + Address + Map */}
          <div>
            {/* Logo + Description */}
            <div>
              <Link to="/" className="inline-block mb-5" aria-label="Jashom home">
                <motion.img
                  src="/jashom-logo-header-70px.png"
                  alt="Jashom"
                  className="h-14 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#9CA3AF' }}
              >
                Empowering businesses with modern GPU optimization and CUDA development for high-performance computing.
              </p>
            </div>

            {/* Address + Map */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Address
              </h4>
              <div className="text-sm mb-4 space-y-1" style={{ color: '#9CA3AF', lineHeight: '1.7' }}>
                <div className="font-semibold" style={{ color: '#22D3EE' }}>
                  Ahmedabad, India
                </div>
                <div>414, Satyam-2,</div>
                <div>Amba Business Park</div>
                <div>ATPL, Adalaj, Gujarat</div>
              </div>

              {/* Map */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=414+Satyam-2+Amba+Business+Park+ATPL+Adalaj+Gujarat+India"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] block"
                style={{
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                  boxShadow: '0 4px 20px rgba(34, 211, 238, 0.1)',
                  height: '140px'
                }}
                aria-label="Open Jashom office location in Google Maps"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.234!2d72.5840!3d23.1645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA5JzUyLjIiTiA3MsKwMzUnMDIuNCJF!5e0!3m2!1sen!2sin!4v1707734400000!5m2!1sen!2sin&z=16&gestureHandling=none&maptype=roadmap&style=feature:all|element:geometry|color:0x212121&style=feature:all|element:labels.icon|visibility:off&style=feature:all|element:labels.text.fill|color:0x757575&style=feature:all|element:labels.text.stroke|color:0x212121&style=feature:administrative|element:geometry|color:0x757575&style=feature:landscape|element:geometry|color:0x212121&style=feature:poi|element:geometry|color:0x212121&style=feature:road|element:geometry.fill|color:0x2c2c2c&style=feature:road|element:labels.text.fill|color:0x8a8a8a&style=feature:road.arterial|element:geometry|color:0x373737&style=feature:road.highway|element:geometry|color:0x3c3c3c&style=feature:road.highway.controlled_access|element:geometry|color:0x4e4e4e&style=feature:road.local|element:labels.text.fill|color:0x616161&style=feature:transit|element:labels.text.fill|color:0x757575&style=feature:water|element:geometry|color:0x000000&style=feature:water|element:labels.text.fill|color:0x3d3d3d"
                  width="100%"
                  height="140"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jashom Office Location"
                />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Get in Touch + Company + Services */}
          <div style={{ paddingLeft: '120px' }}>
            {/* Get in Touch */}
            <div>
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Get in Touch
              </h4>
              <div className="space-y-4">
                <a 
                  href="tel:+919023906363"
                  className="flex items-center gap-3 text-base transition-colors group"
                  style={{ color: '#9CA3AF' }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#22D3EE' }} />
                  <span className="group-hover:text-[#22D3EE]">+91 90239 06363</span>
                </a>
                <a 
                  href="mailto:info@jashom.com"
                  className="flex items-center gap-3 text-base transition-colors group"
                  style={{ color: '#9CA3AF' }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#22D3EE' }} />
                  <span className="group-hover:text-[#22D3EE]">info@jashom.com</span>
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Company
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base transition-colors inline-block hover:translate-x-1 duration-200"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                    >
                      &gt; {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Services
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base transition-colors inline-block hover:translate-x-1 duration-200"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                    >
                      &gt; {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 3: Quick Links + Resources */}
          <div style={{ paddingLeft: '110px' }}>
            {/* Quick Links (Social) */}
            <div>
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Quick Links
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1
                    }}
                    aria-label={social.label}
                  >
                    <img 
                      src={social.image}
                      alt={social.label}
                      style={{ 
                        objectFit: 'contain', 
                        width: social.label === 'Reddit' ? '32px' : '38px', 
                        height: social.label === 'Reddit' ? '32px' : '38px',
                        display: 'block',
                        background: 'transparent'
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: '#FFFFFF' }}>
                Resources
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-base transition-colors inline-block hover:translate-x-1 duration-200"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                    >
                      &gt; {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="border-t mb-8"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {footerLinks.legal.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="transition-colors"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
            >
              {link.label}
            </Link>
          ))}
          <span style={{ color: '#4B5563' }}>|</span>
          <span style={{ color: '#FFFFFF' }}>© {currentYear} Jashom. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
