import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Send } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { SHOW_BLOG_SECTION } from '../config/featureFlags';

const menuItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

type NavPathItem = { path: string; label: string };
type NavDropdownItem = { label: string; dropdown: NavPathItem[] };
type NavItemType = NavPathItem | NavDropdownItem;

type NavLinkBlockProps = {
  item: NavItemType;
  index: number;
  location: { pathname: string };
  activeDropdown: string | null;
  setActiveDropdown: (s: string | null) => void;
  handleLinkClick: () => void;
  light?: boolean;
  contactOutline?: boolean;
};

const NAV_ANIM_DELAY_STEP = 0.05;

function getNavClasses(light?: boolean, contactOutline?: boolean) {
  const textClass = light ? 'text-[#333333] hover:text-gray-600' : 'text-white hover:text-gray-300';
  const activeText = light ? 'text-[#333333]' : 'text-white';
  const indicatorClass = light ? 'bg-[#333333]' : 'bg-white';
  const outlineClass = contactOutline ? 'border border-[#3B82F6] rounded-lg px-3 py-1.5 hover:bg-[#3B82F6]/10' : '';

  return { textClass, activeText, indicatorClass, outlineClass };
}

function isDropdown(item: NavItemType): item is NavDropdownItem {
  return 'dropdown' in item && !!item.dropdown;
}

function getItemPath(item: NavItemType): string {
  return 'path' in item ? item.path : '/';
}

function getIsActive(location: { pathname: string }, path: string) {
  return location.pathname === path;
}

function NavDropdown({
  item,
  location,
  activeDropdown,
  setActiveDropdown,
  handleLinkClick,
}: Readonly<{
  item: NavDropdownItem;
  location: { pathname: string };
  activeDropdown: string | null;
  setActiveDropdown: (s: string | null) => void;
  handleLinkClick: () => void;
}>) {
  const isOpen = activeDropdown === item.label;
  const isHireExpert = item.label === 'Hire Expert';
  const containerClasses = `absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 border border-white/25 rounded-lg shadow-xl py-2 backdrop-blur-xl ${
    isHireExpert ? 'whitespace-nowrap' : ''
  }`;

  const renderDropdownLink = (link: NavPathItem) => {
    const active = getIsActive(location, link.path);
    const base = 'block px-6 py-3 transition-colors whitespace-nowrap cursor-pointer';
    const stateClass = active ? 'text-white bg-white/10' : 'text-white hover:bg-white/5';

    return (
      <Link
        key={link.path}
        to={link.path}
        onClick={handleLinkClick}
        className={`${base} ${stateClass}`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onMouseEnter={() => setActiveDropdown(item.label)}
          onMouseLeave={() => setActiveDropdown(null)}
          className={containerClasses}
          style={{ minWidth: 'max-content', backgroundColor: 'rgba(31, 41, 55, 0.95)' }}
        >
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: 'rgba(31, 41, 55, 0.95)' }}
          />
          {item.dropdown.map(renderDropdownLink)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavLinkBlock({
  item,
  index,
  location,
  activeDropdown,
  setActiveDropdown,
  handleLinkClick,
  light,
  contactOutline,
}: Readonly<NavLinkBlockProps>) {
  const { textClass, activeText, indicatorClass, outlineClass } = getNavClasses(light, contactOutline);

  const isDropdownItem = isDropdown(item);
  const path = getItemPath(item);
  const isActive = getIsActive(location, path);
  const isHome = item.label === 'Home';

  const baseLinkClass = 'relative transition-colors cursor-pointer whitespace-nowrap leading-normal font-medium';
  const linkTextClass = isActive ? activeText : textClass;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * NAV_ANIM_DELAY_STEP }}
      className="relative"
    >
      {isDropdownItem ? (
        <div className="relative">
          <button
            type="button"
            className={`flex items-center gap-1 whitespace-nowrap font-medium leading-normal ${textClass} transition-colors cursor-pointer ${outlineClass}`}
            style={{ fontSize: '1rem' }}
            aria-haspopup="true"
            aria-expanded={activeDropdown === item.label}
            onMouseEnter={() => setActiveDropdown(item.label)}
            onClick={() =>
              setActiveDropdown(activeDropdown === item.label ? null : item.label)
            }
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {item.label}
            </motion.span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
            />
          </button>

          <NavDropdown
            item={item}
            location={location}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            handleLinkClick={handleLinkClick}
          />
        </div>
      ) : (
        <Link
          to={path}
          className={`${baseLinkClass} ${linkTextClass} ${outlineClass}`}
          style={{
            fontSize: '1rem',
            ...(isHome && { fontWeight: 600 }),
          }}
          onClick={handleLinkClick}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {item.label}
          </motion.span>
          {isActive && !contactOutline && (
            <motion.div
              layoutId="nav-indicator"
              className={`absolute -bottom-[21px] left-0 right-0 h-0.5 ${indicatorClass}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      )}
    </motion.div>
  );
}

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    // NEW SERVICES NAVBAR (CLEAN)
    {
      label: 'Services',
      dropdown: [
        { path: '/gpu-optimization-service/', label: 'GPU Optimization Service' },
        { path: '/cuda-development-service/', label: 'CUDA Development Service' }
      ]
    },
    // HIRE EXPERT WITH HOVER DROPDOWN
    {
      label: 'Hire Expert',
      dropdown: [
        { path: '/hire-cuda-developer/', label: 'Hire CUDA Developer' }
      ]
    },
    {
      label: 'Company',
      dropdown: [
        { path: '/about/', label: 'About Us' },
        { path: '/about/team/', label: 'Team' },
        { path: '/about/portfolio/', label: 'Portfolio' },
        ...(SHOW_BLOG_SECTION ? [{ path: '/blogs/', label: 'Blog' as const }] : []),
        { path: '/about/career/', label: 'Career' }
      ]
    },
    { path: '/contact/', label: 'Contact Us' },
    // COMMENTED OUT - Old Services temporarily hidden from UI but preserved in codebase
    /*
    {
      label: 'Services',
      dropdown: [
        {
          label: 'AI Services',
          subItems: [
            { path: '/services/ai-gpu-optimization/', label: 'AI GPU Optimization & Attestation' },
            { path: '/services/rag-applications/', label: 'RAG Applications' },
            { path: '/services/ai-agentic-systems/', label: 'AI Agentic Systems' },
            { path: '/services/ai-automation/', label: 'AI Integration & Workflow Automation' }
          ]
        },
        {
          label: 'Cybersecurity',
          subItems: [
            { path: '/services/cyber-security/', label: 'Cybersecurity' },
            { path: '/services/vapt/', label: 'VAPT' },
            { path: '/services/compliance-risk/', label: 'Compliance & Risk' }
          ]
        },
        {
          label: 'Cloud & DevOps Engineering',
          subItems: [
            { path: '/services/devops-devsecops/', label: 'DevOps & DevSecOps' },
            { path: '/services/devops-cloud/', label: 'Cloud Computing' },
            { path: '/services/edge-computing/', label: 'Edge Computing' },
            { path: '/services/cicd-automation/', label: 'CI/CD Automation' }
          ]
        },
        {
          label: 'Product Engineering',
          subItems: [
            { path: '/services/product-engineering/', label: 'Product Engineering' },
            { path: '/services/custom-development/', label: 'Custom Development' },
            { path: '/services/micro-saas/', label: 'SaaS Development' }
          ]
        }
      ]
    },
    */
    // COMMENTED OUT - Solutions temporarily hidden from UI but preserved in codebase
    /*
    {
      label: 'Solutions',
      dropdown: [
        { path: '/solutions/healthtech/', label: 'HealthTech' },
        { path: '/solutions/supply-chain/', label: 'Supply Chain' },
        { path: '/solutions/fintech/', label: 'FinTech' },
        { path: '/solutions/environmenttech/', label: 'EnvironmentTech' },
        { path: '/solutions/legal-and-tax/', label: 'Legal & Tax' },
        { path: '/solutions/retail-tech/', label: 'RetailTech' },
        { path: '/solutions/foodtech/', label: 'FoodTech' }
      ]
    },
    */
    // COMMENTED OUT - AI for Industry temporarily hidden from UI but preserved in codebase
    /*
    {
      label: 'AI for Industry',
      dropdown: [
        { path: '/ai-for-industry/sales/', label: 'AI for Sales' },
        { path: '/ai-for-industry/legal/', label: 'AI for Legal' },
        { path: '/ai-for-industry/accounting/', label: 'AI for Accounting' },
        { path: '/ai-for-industry/healthcare/', label: 'AI for Healthcare' },
        { path: '/ai-for-industry/marketing/', label: 'AI for Marketing' },
        { path: '/ai-for-industry/rnd/', label: 'AI for R&D' }
      ]
    },
    */
    // Thank You pages are accessible via routing but not shown in navbar (used for form redirects)
    // Contact Us will be handled separately as modal trigger
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
      {/* Logo + badha options ek j pill ma */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ minHeight: 56 }}>
        {/* Left: mobile par logo (content width), desktop par khali (pill center rahe) */}
        <div className="flex justify-start min-w-0 md:flex-1">
          <Link to="/" className="flex items-center flex-shrink-0 md:hidden">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }}>
              <img src="/jashom-logo-header-70px.png" alt="Jashom" className="w-auto object-contain" style={{ height: 40, maxWidth: 135 }} />
            </motion.div>
          </Link>
        </div>

        {/* Desktop: pill screen na center ma */}
        <div className="hidden md:flex flex-1 justify-center min-w-0">
          <div
            className="flex w-max min-w-[42rem] rounded-full border-2 border-white/25 backdrop-blur-xl shadow-lg items-center justify-center px-5 sm:px-6"
            style={{ backgroundColor: 'rgba(31, 41, 55, 0.65)', minHeight: 56, height: 56 }}
          >
          <div className="flex items-center">
            {/* Logo ane Home vache gap */}
            <Link to="/" className="flex items-center flex-shrink-0" style={{ marginRight: 56 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }}>
                <img src="/jashom-logo-header-70px.png" alt="Jashom" className="w-auto object-contain" style={{ height: 54, maxWidth: 140 }} />
              </motion.div>
            </Link>
            {/* Home thi badha options - ek sarkho gap */}
            <div className="flex items-center gap-6 sm:gap-7">
            {navItems.map((item, index) => (
              <NavLinkBlock
                key={item.label}
                item={item}
                index={index}
                location={location}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                handleLinkClick={handleLinkClick}
                contactOutline={item.label === 'Contact Us'}
              />
            ))}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              onClick={() => setIsContactModalOpen(true)}
              className="relative text-white hover:text-[#22D3EE] transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/10"
              aria-label="Quick Contact"
            >
              <motion.div whileHover={{ scale: 1.1, rotate: -15 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
                <Send className="w-5 h-5" />
              </motion.div>
            </motion.button>
            </div>
          </div>
          </div>
        </div>

        {/* Right: mobile menu button (content width so logo left / menu right on mobile) */}
        <div className="flex justify-end min-w-0 md:flex-1">
          <motion.button
            className="md:hidden text-white z-50 flex-shrink-0 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay to close menu when clicking outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={handleLinkClick}
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', maxHeight: 'calc(100vh - 5rem)' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-[#333333] mt-2 relative z-50 bg-black"
                style={{ maxHeight: 'calc(100vh - 5rem)', overflowY: 'auto' }}
              >
                <div className="pb-4 space-y-1 pt-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={menuItemVariants}
                  >
                    {item.dropdown ? (
                      <div>
                        {item.label === 'Solutions' ? (
                          <Link
                            to="/solutions/"
                            onClick={handleLinkClick}
                            className={`block py-3 px-4 sm:px-6 rounded-lg transition-all min-h-[44px] flex items-center text-sm sm:text-base font-medium ${location.pathname === '/solutions'
                              ? 'text-white bg-white/10'
                              : 'text-white hover:bg-white/10 hover:text-white'
                              }`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <div className="py-3 px-4 text-white/60 text-sm font-medium">
                            {item.label}
                          </div>
                        )}
                        {item.dropdown.map((subItem, subIndex) => {
                          const hasSubItems = (subItem as any).subItems && (subItem as any).subItems.length > 0;
                          const subMenuKey = `${item.label}-${subItem.label}-${subIndex}`;
                          
                          if (hasSubItems && item.label === 'Services') {
                            // Services: Click-based behavior for mobile - show only clicked category
                            const isOpen = openSubMenus[subMenuKey];
                            const hasOpenCategory = Object.values(openSubMenus).some(v => v === true);
                            
                            // If a category is open, only show that category and its sub-items
                            if (hasOpenCategory && !isOpen) {
                              return null; // Hide other categories when one is open
                            }
                            
                            return (
                              <div key={subItem.label || subIndex}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Close all other service categories, toggle this one
                                    const newState: { [key: string]: boolean } = {};
                                    if (!isOpen) {
                                      newState[subMenuKey] = true;
                                    }
                                    setOpenSubMenus(newState);
                                  }}
                                  className={`w-full py-3 px-6 sm:px-8 rounded-lg transition-all min-h-[44px] flex items-center justify-between text-sm sm:text-base text-white hover:bg-white/10 ${isOpen ? 'bg-white/10' : ''}`}
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                  <div className="pl-4">
                                    {(subItem as any).subItems.map((subSubItem: any) => (
                                      <Link
                                        key={subSubItem.path}
                                        to={subSubItem.path}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleLinkClick();
                                        }}
                                        className={`block py-3 px-6 sm:px-8 rounded-lg transition-all min-h-[44px] flex items-center text-sm sm:text-base ${location.pathname === subSubItem.path
                                          ? 'text-white bg-white/10'
                                          : 'text-white hover:bg-white/10 hover:text-white'
                                          }`}
                                      >
                                        {subSubItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          
                          if (!(subItem as any).path) return null;
                          return (
                            <Link
                              key={(subItem as any).path}
                              to={(subItem as any).path}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLinkClick();
                              }}
                              className={`block py-3 px-6 sm:px-8 rounded-lg transition-all min-h-[44px] flex items-center text-sm sm:text-base ${item.label === 'AI for Industry' ? 'whitespace-nowrap' : ''} ${location.pathname === (subItem as any).path
                                ? 'text-white bg-white/10'
                                : 'text-white hover:bg-white/10 hover:text-white'
                                }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`block py-3 px-4 sm:px-6 rounded-lg transition-all min-h-[44px] flex items-center text-sm sm:text-base cursor-pointer ${location.pathname === item.path
                          ? 'text-white bg-white/10'
                          : 'text-white hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                {/* QUICK CONTACT ICON - Mobile */}
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => {
                    setIsContactModalOpen(true);
                    handleLinkClick();
                  }}
                  className="flex items-center gap-3 py-3 px-4 sm:px-6 rounded-lg transition-all min-h-[44px] text-sm sm:text-base text-white hover:bg-white/10 hover:text-white w-full cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Quick Contact</span>
                </motion.button>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </motion.nav>
    
    {/* Contact Modal */}
    <ContactModal 
      isOpen={isContactModalOpen} 
      onClose={() => setIsContactModalOpen(false)} 
    />
    </>
  );
}
