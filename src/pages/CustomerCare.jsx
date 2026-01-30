import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, ShoppingCart, Package, RefreshCw, Mail, Shield, ChevronDown, Search, Phone, MessageCircle, MapPin } from 'lucide-react';


export default function CustomerCare() {
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  const sections = [
    {
      id: 'help',
      title: 'HELP CENTER',
      icon: HelpCircle,
      description: 'Find answers to your questions',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      content: {
        type: 'faq',
        items: [
          { 
            q: 'How do I track my order?', 
            a: 'You can track your order using the tracking number sent to your email. Simply enter it in our tracking portal or click the tracking link provided.' 
          },
          { 
            q: 'What payment methods do you accept?', 
            a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for corporate accounts.' 
          },
          { 
            q: 'How long does shipping take?', 
            a: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight options are available at checkout.' 
          },
          { 
            q: 'Can I modify my order after placing it?', 
            a: 'Orders can be modified within 2 hours of placement. Contact our support team immediately via live chat or phone for assistance.' 
          },
          { 
            q: 'Do you ship internationally?', 
            a: 'Yes, we ship to over 150 countries worldwide. International shipping times and costs vary by destination and are calculated at checkout.' 
          }
        ]
      }
    },
    {
      id: 'buy',
      title: 'HOW TO BUY',
      icon: ShoppingCart,
      description: 'Simple steps to complete your purchase',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      content: {
        type: 'steps',
        items: [
          { title: 'Browse Products', desc: 'Explore our catalog and add items to your cart' },
          { title: 'Review Cart', desc: 'Check your selections and apply any discount codes' },
          { title: 'Enter Details', desc: 'Provide shipping address and contact information' },
          { title: 'Choose Payment', desc: 'Select your preferred payment method' },
          { title: 'Confirm Order', desc: 'Review everything and place your order' },
          { title: 'Track Delivery', desc: 'Monitor your shipment status in real-time' }
        ]
      }
    },
    {
      id: 'bulk',
      title: 'CORPORATE & BULK PURCHASING',
      icon: Package,
      description: 'Special solutions for businesses',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      content: {
        type: 'benefits',
        items: [
          { title: 'Volume Discounts', desc: 'Tiered pricing starting at 50+ units with savings up to 35%' },
          { title: 'Dedicated Support', desc: 'Personal account manager for all your business needs' },
          { title: 'Flexible Terms', desc: 'Net-30, Net-60 payment options for qualified accounts' },
          { title: 'Custom Invoicing', desc: 'Purchase orders and customized billing statements' },
          { title: 'Priority Processing', desc: 'Expedited handling and preferential shipping slots' },
          { title: 'Bulk Customization', desc: 'Product personalization and branding options available' }
        ],
        cta: 'Request Enterprise Quote'
      }
    },
    {
      id: 'returns',
      title: 'RETURNS & REFUNDS',
      icon: RefreshCw,
      description: 'Hassle-free return process',
      gradient: 'from-purple-500/20 to-pink-500/20',
      content: {
        type: 'policy',
        items: [
          { title: '30-Day Window', desc: 'Return most items within 30 days of delivery' },
          { title: 'Original Condition', desc: 'Products must be unused with all original packaging and tags' },
          { title: 'Free Returns', desc: 'Complimentary return shipping for defective or incorrect items' },
          { title: 'Quick Refunds', desc: 'Refunds processed within 5-7 business days after receipt' },
          { title: 'Store Credit', desc: 'Opt for store credit to receive instant value for exchanges' },
          { title: 'Easy Process', desc: 'Initiate returns online through your account dashboard' }
        ],
        cta: 'Start a Return'
      }
    },
    {
      id: 'contact',
      title: 'CONTACT US',
      icon: Mail,
      description: 'We\'re here to help',
      gradient: 'from-pink-500/20 to-rose-500/20',
      content: {
        type: 'contact',
        items: [
          { type: 'Email', value: 'support@company.com', subtext: 'Response within 24 hours', icon: Mail },
          { type: 'Phone', value: '+1 (800) 123-4567', subtext: 'Mon-Fri, 9AM-6PM EST', icon: Phone },
          { type: 'Live Chat', value: 'Start Conversation', subtext: 'Available 9AM-6PM EST', icon: MessageCircle }
        ],
        address: {
          street: '123 Commerce Street, Suite 500',
          city: 'New York, NY 10001',
          country: 'United States'
        }
      }
    },
    {
      id: 'protection',
      title: 'PURCHASE PROTECTION',
      icon: Shield,
      description: 'Shop with confidence',
      gradient: 'from-rose-500/20 to-orange-500/20',
      content: {
        type: 'features',
        items: [
          { title: 'Secure Checkout', desc: '256-bit SSL encryption protects all transactions' },
          { title: 'Money-Back Guarantee', desc: 'Full refund if you\'re not completely satisfied' },
          { title: 'Fraud Protection', desc: 'Advanced security measures prevent unauthorized charges' },
          { title: 'Extended Warranty', desc: 'Optional coverage plans for added peace of mind' },
          { title: 'Price Match', desc: 'We\'ll match any lower price from authorized retailers' },
          { title: 'Data Privacy', desc: 'Your information is never shared or sold to third parties' }
        ]
      }
    }
  ];

  // Auto-open section based on URL hash from footer links
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      // Immediately open the section
      setActiveSection(hash);
      
      // Direct instant scroll to section
      requestAnimationFrame(() => {
        const element = sectionRefs.current[hash];
        if (element) {
          // Get element position and scroll instantly
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 80; // 80px offset from top
          
          window.scrollTo(0, targetPosition); // Instant scroll without behavior option
        }
      });
    }
  }, [location.hash]);

  // Additional scroll on mount for initial page load
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = sectionRefs.current[hash];
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 80;
          
          window.scrollTo(0, targetPosition);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="customer-care">
      {/* Animated Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="header-container">
        {/* Header Section */}
        <section className="hero-header">
          <div className="header-content">
            <h1 className="main-title">Customer Care</h1>
            <p className="main-subtitle">Your satisfaction is our priority. We're here to help you every step of the way.</p>
          </div>
          
          {/* Search Bar */}
          <div className="search-wrapper">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="sections-grid">
          {filteredSections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className={`section-card ${isActive ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Card Header */}
                <div 
                  className="card-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className={`icon-container bg-gradient-to-br ${section.gradient}`}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className="header-text">
                    <h2 className="card-title">{section.title}</h2>
                    <p className="card-description">{section.description}</p>
                  </div>
                  <ChevronDown 
                    className={`chevron-icon ${isActive ? 'rotated' : ''}`}
                    size={20}
                  />
                </div>

                {/* Expandable Content */}
                {isActive && (
                  <div className="card-content">
                    {/* FAQ Content */}
                    {section.content.type === 'faq' && (
                      <div className="faq-container">
                        {section.content.items.map((faq, i) => (
                          <div key={i} className="faq-item">
                            <button
                              className={`faq-question ${expandedFaq === `${section.id}-${i}` ? 'active' : ''}`}
                              onClick={() => setExpandedFaq(expandedFaq === `${section.id}-${i}` ? null : `${section.id}-${i}`)}
                            >
                              <span>{faq.q}</span>
                              <ChevronDown 
                                size={16} 
                                className={expandedFaq === `${section.id}-${i}` ? 'rotated' : ''}
                              />
                            </button>
                            {expandedFaq === `${section.id}-${i}` && (
                              <div className="faq-answer">{faq.a}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Steps Content */}
                    {section.content.type === 'steps' && (
                      <div className="steps-container">
                        {section.content.items.map((step, i) => (
                          <div key={i} className="step-item">
                            <div className="step-number">{i + 1}</div>
                            <div className="step-text">
                              <h4>{step.title}</h4>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Benefits/Policy/Features Content */}
                    {(section.content.type === 'benefits' || 
                      section.content.type === 'policy' || 
                      section.content.type === 'features') && (
                      <div className="info-container">
                        <div className="info-grid">
                          {section.content.items.map((item, i) => (
                            <div key={i} className="info-item">
                              <div className="info-dot"></div>
                              <div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {section.content.cta && (
                          <button className="cta-button">{section.content.cta}</button>
                        )}
                      </div>
                    )}

                    {/* Contact Content */}
                    {section.content.type === 'contact' && (
                      <div className="contact-container">
                        <div className="contact-methods">
                          {section.content.items.map((method, i) => {
                            const MethodIcon = method.icon;
                            return (
                              <div key={i} className="contact-card">
                                <div className="contact-icon">
                                  <MethodIcon size={20} />
                                </div>
                                <div className="contact-info">
                                  <h4>{method.type}</h4>
                                  <p className="contact-value">{method.value}</p>
                                  <p className="contact-subtext">{method.subtext}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {section.content.address && (
                          <div className="address-card">
                            <MapPin size={20} className="address-icon" />
                            <div>
                              <h4>Office Address</h4>
                              <p>{section.content.address.street}</p>
                              <p>{section.content.address.city}</p>
                              <p>{section.content.address.country}</p>
                            </div>
                          </div>
                        )}
                        
                        <button className="cta-button">Send us a Message</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}