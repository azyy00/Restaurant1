/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, Phone, MapPin, Clock, Star, X, CheckCircle, Facebook, Instagram, Twitter, ArrowRight, MessageCircle, Navigation, ExternalLink, User, Mail, MessageSquare, Send, Lock, ShieldCheck, Zap, Heart } from 'lucide-react';
import { menuItems, reviews } from './data';

// TORN EDGE COMPONENT
const TornEdge = ({ position = 'top', colorClass = 'bg-black', className = "" }) => {
  return (
    <div className={`w-full h-12 md:h-20 lg:h-24 ${colorClass} ${position === 'top' ? 'torn-edge-top' : 'torn-edge-bottom'} ${className}`} aria-hidden="true" />
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [cartBadge, setCartBadge] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleAddToCart = () => {
    setCartBadge(prev => prev + 1);
  };
  
  const categories = ['All', 'Burgers', 'Drinks', 'Pastries', 'Cakes', 'Snacks', 'Combos'];
  
  const filteredMenu = activeTab === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="font-sans bg-black text-white min-h-screen">
      
      {/* STICKY NAVIGATION */}
      <nav className="fixed w-full z-50 bg-black/95 backdrop-blur-md text-white shadow-xl transition-all duration-500">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <a href="#" className="flex items-center gap-1 group">
                <span className="font-sans font-black text-2xl md:text-4xl text-orange-accent tracking-tighter drop-shadow-[0_0_15px_rgba(232,130,26,0.5)]">ADEL</span>
                <span className="font-sans font-black text-2xl md:text-4xl text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">PHAS</span>
              </a>
            </motion.div>
            
            {/* Desktop Nav - Screenshot Style */}
            <div className="hidden lg:flex items-center space-x-12">
              {['Home', 'About', 'Menu', 'Review', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm font-bold hover:text-orange-accent transition-colors py-2 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <button 
                onClick={handleAddToCart}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2.5 rounded-full font-black text-sm transition-all duration-300 shadow-xl shadow-yellow-400/10 active:scale-95"
              >
                Order now
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:text-yellow-400 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black border-t border-white/5 overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-8 space-y-6 text-center">
                {['Home', 'About', 'Menu', 'Review', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="block text-xl font-bold hover:text-yellow-400 transition-colors" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4">
                  <button className="w-full bg-yellow-400 text-black px-6 py-4 rounded-full font-black flex justify-center items-center space-x-3 shadow-lg">
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 md:pt-28 pb-10 bg-black text-white overflow-hidden" id="home">
        {/* Cinematic Smoke Effect */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-charcoal/80 to-transparent z-[1]" />
        <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent blur-3xl animate-pulse" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 mb-8"
            >
              <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight drop-shadow-2xl">
                Adelpha's <span className="text-orange-accent block md:inline font-sans font-black italic uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest">Burger</span>
              </h1>
              <p className="font-body text-gray-400 max-w-lg mx-auto text-sm md:text-base uppercase tracking-[0.3em] font-bold">
                Affordable Premium • Homegrown in Goa
              </p>
            </motion.div>
            
            <div className="relative w-full max-w-4xl mx-auto flex justify-center items-end mt-4 sm:mt-8">
              {/* MAIN BURGER IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[320px] sm:max-w-md lg:max-w-2xl px-4"
              >
                <img 
                  src="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-PNG-Image.png" 
                  alt="Adelpha's Signature Burger" 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(232,130,26,0.5)]"
                  referrerPolicy="no-referrer"
                />
                
                {/* 99 PESOS BADGE */}
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute -top-10 -right-4 sm:top-0 sm:right-0 bg-yellow-400 text-black w-24 h-24 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-2 shadow-2xl border-4 border-dashed border-black/10 z-20"
                  style={{
                    clipPath: "polygon(100% 50%, 95% 65%, 85% 75%, 75% 85%, 65% 95%, 50% 100%, 35% 95%, 25% 85%, 15% 75%, 5% 65%, 0% 50%, 5% 35%, 15% 25%, 25% 15%, 35% 5%, 50% 0%, 65% 5%, 75% 15%, 85% 25%, 95% 35%)"
                  }}
                >
                  <span className="font-black text-3xl sm:text-5xl leading-none">99</span>
                  <span className="font-black text-[10px] sm:text-xs uppercase tracking-tighter">Pesos</span>
                </motion.div>
              </motion.div>

              {/* Smoke Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[5] h-32 md:h-48" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 z-20"
            >
              <a href="#menu" className="bg-orange-accent hover:bg-orange-light text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl shadow-orange-accent/30 tracking-widest flex items-center space-x-2">
                <span>DISCOVER MORE</span>
                <ArrowRight size={20} />
              </a>
              <div className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">
                Limited Offer • T&C Apply
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <TornEdge position="bottom" colorClass="bg-black" />

      {/* ABOUT SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 bg-black text-white relative overflow-hidden" 
        id="about"
      >
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://scontent.fwnp1-1.fna.fbcdn.net/v/t39.30808-6/671527371_969227295644477_7609068944753754601_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH0VARYHlXYyOApZIghXGVP0adtfBUz8ZfRp218FTPxl8uCDxMzmop7PprrNkfw5PoT68kY_TlahIc90vgdNy5a&_nc_ohc=fIGEMBPl4AkQ7kNvwEvPxtE&_nc_oc=Adr4jednFRKsSmE-f85UN9b2no1Y9Tb43pmTAim-QdIpwii1vOuKHdFbrTphrH_d-cg&_nc_zt=23&_nc_ht=scontent.fwnp1-1.fna&_nc_gid=Ref7r3jFsjDeYVKA8zrJ8Q&_nc_ss=7a3a8&oh=00_Af2VOkhhFMj3Y1CDRB8DGcdipp3Gi-zeULhCCU5x7r2HNw&oe=69ED66FF"
                  alt="Adelpha's Team"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-accent/20 blur-3xl rounded-full" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-accent/20 blur-3xl rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="font-cursive text-orange-accent text-3xl md:text-5xl">Our Story</h2>
                <h3 className="font-sans text-4xl md:text-6xl font-black text-white leading-tight">Homegrown Passion. <br/>Innovative Flavor.</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Located behind Jollibee on San Isidro St, Goa, Adelpha's Burger And Cafe is more than just a restaurant—it's a destination for flavor enthusiasts. We bring the comfort of a neighborhood cafe together with the bold innovation of premium smash burgers.
              </p>
              <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/5">
                <div>
                  <h4 className="text-white font-black text-2xl">100%</h4>
                  <p className="text-xs uppercase tracking-widest text-orange-accent font-bold">Pure Fresh Beef</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl">Daily</h4>
                  <p className="text-xs uppercase tracking-widest text-orange-accent font-bold">Freshly Brewed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <TornEdge position="top" colorClass="bg-black" />

      {/* FULL MENU */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 bg-black text-white relative" 
        id="menu"
      >
        <div className="container-custom">
          <div className="text-center mb-16 md:mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              Our Best & Delicious Menu
            </motion.h2>
            <div className="w-24 h-1 bg-orange-accent mx-auto rounded-full" />
          </div>
          
          {/* Menu Tabs - Screenshot Style */}
          <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 justify-start sm:justify-center gap-6 md:gap-10 mb-16 md:mb-20">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`group relative whitespace-nowrap py-2 text-sm md:text-base font-bold transition-all duration-300 ${
                  activeTab === category 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {category}
                {activeTab === category && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-1 left-0 w-full h-1 bg-white rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Menu Grid - Screenshot Style */}
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map(item => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#121212] rounded-[32px] p-6 md:p-8 border border-white/5 flex flex-col items-center text-left relative group transition-all duration-500 hover:bg-[#1a1a1a] hover:border-white/10"
                >
                  <div className="relative w-full h-40 md:h-48 mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain drop-shadow-2xl" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  
                  <div className="w-full space-y-3">
                    <h4 className="font-sans text-xl md:text-2xl font-black">{item.name}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {item.description || "Our signature premium flavor packed into every bite."}
                    </p>
                    
                    <div className="pt-2 flex justify-between items-center w-full">
                      <span className="font-black text-2xl leading-none">₱{item.price}</span>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                        className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center text-orange-accent hover:bg-orange-accent hover:border-orange-accent hover:text-black transition-all duration-300"
                      >
                        <ShoppingCart size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 md:mt-24 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('All')}
              className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-orange-accent hover:text-white transition-all duration-300"
            >
              See All
            </motion.button>
          </div>
        </div>
      </motion.section>

      <TornEdge position="top" colorClass="bg-[#050505]" />

      {/* CONTACT */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 bg-[#050505] text-white" 
        id="contact"
      >
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-cursive text-orange-accent text-3xl md:text-5xl mb-4 text-center">Visit Us</h2>
            <h3 className="font-sans text-4xl md:text-7xl font-black text-center">Get In Touch</h3>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
            {/* Contact Details */}
            <div className="space-y-12">
              <div className="space-y-10">
                <div className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1a] shrink-0 group-hover:border-orange-accent/50 transition-colors">
                    <MapPin size={24} className="text-orange-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Location</h4>
                    <p className="text-gray-400">San Isidro St, Goa, Camarines Sur<br/>(Back of Jollibee)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1a] shrink-0 group-hover:border-orange-accent/50 transition-colors">
                    <Clock size={24} className="text-orange-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Hours</h4>
                    <p className="text-gray-400 flex items-center">
                      Mon – Sun <span className="mx-2 text-orange-accent font-black">•</span> 9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1a] shrink-0 group-hover:border-orange-accent/50 transition-colors">
                    <MessageCircle size={24} className="text-orange-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Contact</h4>
                    <p className="text-gray-400">Message us on Facebook for orders</p>
                  </div>
                </div>
              </div>

              {/* Map Holder */}
              <div className="mt-12 h-64 md:h-72 rounded-[32px] overflow-hidden border border-white/10 relative group bg-black/50">
                <iframe 
                  title="Adelpha's Location"
                  src="https://maps.google.com/maps?q=13.699061478263891,123.48976055863386&hl=en&z=17&output=embed" 
                  className="w-full h-full border-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=13.699061478263891,123.48976055863386" 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute bottom-4 left-4 bg-[#121212]/90 backdrop-blur-md border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-[#1a1a1a] hover:text-orange-accent transition-colors"
                >
                  <Navigation size={16} className="text-orange-accent" />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#101010] p-8 md:p-10 rounded-[32px] border border-white/5 shadow-2xl relative">
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center space-x-2 text-xs text-gray-300 hidden sm:flex">
                <Zap size={14} className="text-orange-accent" />
                <span>We reply within 1–2 hours</span>
              </div>

              <form className="space-y-6 pt-8 sm:pt-12 md:pt-14" onSubmit={e => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input type="text" placeholder="John Doe" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-accent transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-500" />
                    </div>
                    <input type="email" placeholder="john@example.com" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-accent transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Message</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <MessageSquare size={18} className="text-gray-500" />
                    </div>
                    <textarea rows={4} placeholder="Tell us what you need..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-accent transition-colors resize-none" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center space-x-2 text-lg"
                >
                  <span>Send Message</span>
                  <Send size={20} />
                </motion.button>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-2 text-center">
                  <Lock size={14} className="shrink-0" />
                  <span>Your information is safe with us. We won't share your details.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      <TornEdge position="top" colorClass="bg-black" />

      {/* REVIEWS SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 bg-black text-white relative" 
        id="review"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="space-y-2">
                <h2 className="font-cursive text-orange-accent text-3xl md:text-5xl">The Verdict</h2>
                <h3 className="font-sans text-4xl md:text-7xl font-black">Love From Camarines</h3>
              </div>
              
              <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 max-w-sm inline-block mx-auto lg:mx-0">
                <div className="flex items-center space-x-5">
                  <div className="text-5xl font-black">4.8</div>
                  <div className="space-y-1 text-left">
                    <div className="flex text-orange-accent">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Based on 42 local reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 relative">
              {reviews.map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="bg-[#121212] p-8 rounded-[32px] border border-white/5 relative group hover:border-orange-accent/30 transition-all duration-300"
                >
                  <div className="flex text-orange-accent mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-medium italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-accent rounded-full flex items-center justify-center font-black text-black">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase text-xs tracking-widest">{testimonial.name}</p>
                        <p className="text-[10px] font-bold text-orange-accent uppercase tracking-tighter">Verified Guest</p>
                      </div>
                    </div>
                    {/* Make sure we also display the date */}
                    {testimonial.date && (
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{testimonial.date}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <TornEdge position="top" colorClass="bg-black" />

      {/* FOOTER */}
      <footer className="bg-charcoal text-white pt-16 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-orange-accent/5 blur-[120px] rounded-full -z-0" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-1 group">
                <span className="font-sans font-black text-2xl text-orange-accent tracking-tighter">ADEL</span>
                <span className="font-sans font-black text-2xl text-white tracking-tighter">PHAS</span>
              </a>
              <p className="text-gray-500 text-sm leading-relaxed font-bold">
                Your homegrown cozy cafe and burger joint in Goa, Camarines Sur. Serving premium quality fuel for your soul since 2023.
              </p>
              <div className="flex items-center space-x-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-xl text-gray-400 hover:text-orange-accent hover:bg-white/10 transition-all duration-300">
                    <Icon size={18}/>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:ml-auto">
              <h4 className="font-bold mb-8 text-lg md:text-xl tracking-tight text-white uppercase italic">Explore</h4>
              <ul className="space-y-4 text-gray-500 font-bold text-sm">
                {['Home', 'About', 'Menu', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-orange-accent transition-colors flex items-center group">
                      <span className="w-1 h-1 bg-orange-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:ml-auto">
              <h4 className="font-bold mb-8 text-lg md:text-xl tracking-tight text-white uppercase italic">Services</h4>
              <ul className="space-y-4 text-gray-500 font-bold text-sm">
                {['Dine-in Rituals', 'Curbside Pickup', 'No-contact Delivery', 'Events & Catering'].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-orange-accent/50"/>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="lg:ml-auto">
              <h4 className="font-bold mb-8 text-lg md:text-xl tracking-tight text-white uppercase italic">Location</h4>
              <ul className="space-y-6 text-gray-500 font-bold text-sm">
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-orange-accent shrink-0" />
                  <span className="leading-relaxed">San Isidro St, Goa, Camarines Sur (Back of Jollibee)</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Clock size={20} className="text-orange-accent shrink-0" />
                  <span>Daily until 7:00 PM</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-600">
            <div className="space-y-2 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Adelpha's Burger And Cafe.</p>
              <p className="text-gray-700">Design and Developed by Anthony Azuela</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span className="text-orange-accent/50">₱₱ Affordable Premium</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
