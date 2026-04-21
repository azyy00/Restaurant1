/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, Phone, MapPin, Clock, Star, X, CheckCircle, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { menuItems, reviews } from './data';

// TORN EDGE COMPONENT
const TornEdge = ({ position = 'top', colorClass = 'bg-[#FDF6EE]', className = "" }) => {
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
  
  const categories = ['All', 'Burgers', 'Café Drinks', 'Snacks', 'Combos'];
  
  const filteredMenu = activeTab === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="font-sans bg-[#FDF6EE] text-[#1E0F00] min-h-screen">
      
      {/* STICKY NAVIGATION */}
      <nav className="fixed w-full z-50 bg-charcoal/95 backdrop-blur-md text-white shadow-xl">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <a href="#" className="bg-orange-accent text-white px-4 py-1.5 rounded-full font-cursive text-xl md:text-2xl tracking-wider hover:bg-orange-light transition-colors">
                A-Delpha's
              </a>
            </motion.div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Menu', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm font-bold uppercase tracking-widest hover:text-orange-accent transition-colors py-2 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              <button 
                onClick={handleAddToCart}
                className="bg-orange-accent hover:bg-orange-light text-white px-6 py-2 rounded-full font-bold transition flex items-center space-x-2 shadow-lg shadow-orange-accent/20"
              >
                <ShoppingCart size={18} />
                <span className="text-sm">Order</span>
                {cartBadge > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white text-orange-accent text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartBadge}
                  </motion.span>
                )}
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button className="relative p-2 text-white">
                <ShoppingCart size={24} />
                {cartBadge > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-accent text-white text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                    {cartBadge}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:text-orange-accent transition-colors"
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
              className="md:hidden bg-brown-dark border-t border-brown-light overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {['About', 'Menu', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="block text-xl font-bold hover:text-orange-accent transition-colors border-b border-white/5 pb-2" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full bg-orange-accent text-white px-6 py-4 rounded-xl font-bold flex justify-center items-center space-x-3 shadow-lg">
                  <ShoppingCart size={20} />
                  <span>Order Now ({cartBadge})</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-charcoal text-white overflow-hidden" id="home">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-accent opacity-5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange-accent opacity-5 blur-[100px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-brown-dark/50 border border-orange-accent/30 text-orange-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest pulsing uppercase">
                <span className="w-2 h-2 rounded-full bg-orange-accent animate-pulse" />
                <span>Open Daily • Closes 7PM</span>
              </div>
              
              <h1 className="font-cursive text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] md:leading-tight">
                Authentic <br/>
                <span className="text-orange-accent">Flavor</span> In <br className="hidden lg:block"/> Every Bite
              </h1>
              
              <p className="font-body text-base md:text-xl text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Experience the soulful fusion of premium homegrown ingredients and innovative cafe culture in Goa, Camarines Sur.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 justify-center md:justify-start">
                <a href="#menu" className="group w-full sm:w-auto bg-orange-accent hover:bg-orange-light text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl shadow-orange-accent/20 flex justify-center items-center space-x-2">
                  <span>Explore Menu</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center space-x-2 text-gray-300 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="text-orange-accent fill-orange-accent" size={14} />
                    ))}
                  </div>
                  <span className="font-bold text-white">4.8</span>
                  <span className="text-xs">(42 reviews)</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative flex justify-center items-center mt-8 md:mt-0"
            >
              {/* Glowing orange circle */}
              <div className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-orange-accent rounded-full blur-[60px] md:blur-[80px] opacity-20"></div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-accent rounded-full scale-105 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl px-4" />
                <img 
                  src="https://picsum.photos/seed/delpha1/800/800" 
                  alt="A-Delpha's Signature Burger" 
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[450px] lg:h-[450px] object-cover rounded-full border-[8px] border-orange-accent/80 shadow-2xl floating relative z-10"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating elements with motion */}
                {[
                  { emoji: '🍔', top: '-10%', left: '0%', delay: 0 },
                  { emoji: '☕', top: '10%', right: '-5%', delay: 0.5 },
                  { emoji: '🍟', bottom: '15%', left: '-10%', delay: 1 },
                  { emoji: '🧀', bottom: '-5%', right: '10%', delay: 1.5 }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
                    className="absolute text-3xl md:text-4xl lg:text-5xl drop-shadow-xl z-20 pointer-events-none"
                    style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <TornEdge position="top" colorClass="bg-[#FDF6EE]" />

      {/* ABOUT US */}
      <section className="py-16 md:py-24 bg-cream-warm" id="about">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mx-auto md:mx-0 max-w-[280px] sm:max-w-sm"
            >
              <div className="relative z-10">
                <img 
                  src="https://picsum.photos/seed/delphacafe/600/600" 
                  alt="A-Delpha's Atmosphere" 
                  className="w-full aspect-square object-cover rounded-full border-[8px] md:border-[12px] border-charcoal shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-orange-accent/20 rounded-full animate-spin-slow pointer-events-none" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[3px] border-dashed border-orange-accent rounded-full transform translate-x-4 translate-y-4 -z-0 opacity-40 shrink-0" 
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl z-20 border border-cream-warm hidden sm:block">
                <div className="flex items-center space-x-2">
                  <Star fill="#E8821A" className="text-orange-accent" size={20} />
                  <span className="font-bold text-charcoal">4.8 / 5.0</span>
                </div>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Community Favorite</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="space-y-2">
                <h2 className="font-cursive text-orange-accent text-3xl md:text-4xl">Our Story</h2>
                <h3 className="font-sans text-3xl md:text-5xl font-bold text-charcoal leading-tight">Homegrown Passion, <br className="hidden md:block"/> Innovative Flavors</h3>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base md:text-lg">
                  Located tucked away behind Jollibee on San Isidro St, Goa, <span className="font-bold text-charcoal">A-Delpha's Burger And Cafe</span> is more than just a restaurant—it's a destination for flavor enthusiasts.
                </p>
                <p className="text-base md:text-lg">
                  We started with a simple vision: to bring the comfort of a neighborhood cafe together with the bold innovation of premium smash burgers. Every patty is handcrafted, every bean is selected with care.
                </p>
              </div>
              
              <div className="pt-6 grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-accent/10 text-center">
                  <div className="font-bold text-3xl text-orange-accent">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brown-light">Fresh Beef</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-accent/10 text-center">
                  <div className="font-bold text-3xl text-orange-accent">Local</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brown-light">Support</div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <TornEdge position="bottom" colorClass="bg-[#1E0F00]" />

      {/* PHOTO GALLERY */}
      <section className="py-16 md:py-24 bg-charcoal text-white overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center lg:text-left"
            >
              <h2 className="font-cursive text-orange-accent text-4xl">Our Space</h2>
              <h3 className="font-sans text-4xl md:text-5xl font-bold leading-tight">Good Food. <br className="hidden md:block"/> Great Times.</h3>
              <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step into a cozy sanctuary where modern aesthetics meet rustic charm. We've crafted A-Delpha's to be your neighborhood living room—a place to unwind, celebrate, and indulge.
              </p>
              <div className="pt-6">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="inline-flex items-center space-x-3 bg-white/5 border-2 border-orange-accent/40 text-orange-accent hover:border-orange-accent hover:bg-orange-accent hover:text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
                >
                   <Instagram size={20} />
                   <span>Join our Community</span>
                </motion.a>
              </div>
            </motion.div>

            <div className="relative">
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-3 md:space-y-4 pt-10"
                  >
                     <img src="https://picsum.photos/seed/delphavibe1/400/500" alt="Cafe Vibes" className="w-full rounded-2xl md:rounded-3xl object-cover aspect-[3/4] border-2 border-white/5 hover:border-orange-accent transition duration-500 shadow-2xl" referrerPolicy="no-referrer" />
                     <img src="https://picsum.photos/seed/delphavibe2/400/400" alt="Cafe Detail" className="w-full rounded-2xl md:rounded-3xl object-cover aspect-square border-2 border-white/5 hover:border-orange-accent transition duration-500 shadow-2xl" referrerPolicy="no-referrer" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-3 md:space-y-4"
                  >
                     <img src="https://picsum.photos/seed/delphavibe3/400/400" alt="Cafe Prep" className="w-full rounded-2xl md:rounded-3xl object-cover aspect-square border-2 border-white/5 hover:border-orange-accent transition duration-500 shadow-2xl" referrerPolicy="no-referrer" />
                     <img src="https://picsum.photos/seed/delphavibe4/400/500" alt="Cafe Smiles" className="w-full rounded-2xl md:rounded-3xl object-cover aspect-[3/4] border-2 border-white/5 hover:border-orange-accent transition duration-500 shadow-2xl" referrerPolicy="no-referrer" />
                  </motion.div>
               </div>
               
               {/* Decorative floating labels */}
               <div className="absolute -top-4 -right-4 bg-orange-accent text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-xl rotate-6 hidden md:block">
                 Est. 2023
               </div>
            </div>
            
          </div>
        </div>
      </section>

      <TornEdge position="top" colorClass="bg-[#2D1800]" />

      {/* BEST SELLERS */}
      <section className="py-20 md:py-24 bg-brown-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#E8821A,transparent)] opacity-5 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-cursive text-orange-accent text-3xl md:text-4xl mb-2">Crowd Favorites</h2>
            <h3 className="font-sans text-4xl md:text-6xl font-bold">The Hall of Fame</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-charcoal/50 backdrop-blur-md p-6 md:p-10 rounded-[40px] border border-white/5 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute right-0 top-0 w-1/2 h-full bg-orange-accent opacity-5 rounded-l-full transform translate-x-1/4" />
              <ul className="space-y-8 md:space-y-10 relative z-10">
                {menuItems.filter(item => item.bestseller).map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-6 md:space-x-8 group/item"
                  >
                    <div className="relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border-2 border-orange-accent/30 object-cover group-hover/item:border-orange-accent transition-colors duration-300 shadow-xl" referrerPolicy="no-referrer" />
                      <div className="absolute -top-2 -right-2 bg-orange-accent text-white text-[8px] font-bold py-1 px-2 rounded-full rotate-12 shadow-lg">#1</div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-sans text-xl md:text-2xl font-bold flex flex-wrap items-center gap-2">
                        <span>{item.name}</span>
                      </h4>
                      <p className="text-orange-light font-bold text-lg md:text-xl mt-1">₱{item.price}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden group shadow-2xl border-4 border-charcoal"
            >
              <img src="https://picsum.photos/seed/delphabestseller/600/800" alt="A-Delpha's Pride" className="w-full h-auto aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60" />
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-orange-accent text-white p-6 rounded-full w-28 h-28 md:w-40 md:h-40 flex flex-col justify-center items-center shadow-2xl z-20"
              >
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">Starting</span>
                <span className="font-cursive text-4xl md:text-6xl tracking-tight">₱85</span>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <TornEdge position="top" colorClass="bg-[#FDF6EE]" />

      {/* FULL MENU */}
      <section className="py-20 md:py-28 bg-cream-warm" id="menu">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-cursive text-orange-accent text-3xl md:text-5xl mb-3"
            >
              Taste the Craft
            </motion.h2>
            <h3 className="font-sans text-4xl md:text-6xl font-bold text-charcoal">The Full Roster</h3>
          </div>
          
          {/* Menu Tabs - Optimized for touch Scrolling */}
          <div className="flex overflow-x-auto pb-4 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`whitespace-nowrap px-6 md:px-8 py-2 md:py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base border-2 ${
                  activeTab === category 
                    ? 'bg-orange-accent border-orange-accent text-white shadow-xl shadow-orange-accent/20' 
                    : 'bg-white border-charcoal/5 text-charcoal hover:border-orange-accent hover:text-orange-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Menu Grid */}
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map(item => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-charcoal/5 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    {item.bestseller && (
                      <div className="absolute top-3 left-3 bg-charcoal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10">
                        Top Rated
                      </div>
                    )}
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] font-bold text-orange-accent uppercase tracking-widest">{item.category}</p>
                      <span className="font-bold text-charcoal">₱{item.price}</span>
                    </div>
                    <h4 className="font-sans text-xl font-bold text-charcoal group-hover:text-orange-accent transition-colors duration-300">{item.name}</h4>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="mt-6 w-full py-4 rounded-2xl bg-charcoal text-white font-bold hover:bg-orange-accent transition-colors duration-300 flex items-center justify-center space-x-3 group/btn shadow-lg"
                  >
                    <ShoppingCart size={18} className="transition-transform group-hover/btn:-translate-y-1" />
                    <span className="text-sm">Add to Order</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      <TornEdge position="bottom" colorClass="bg-[#1E0F00]" />

      {/* ONLINE ORDERING & INFO */}
      <section className="py-16 md:py-24 bg-charcoal text-white relative" id="order">
        <div className="container-custom text-center space-y-12">
          <div className="space-y-4">
            <h2 className="font-sans text-4xl md:text-6xl font-bold">Quick Fix?</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Craving A-Delpha's from the comfort of your home? Grab us on your favorite platforms or swing by for a quick pickup.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <motion.button 
              whileHover={{ y: -5 }}
              className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/10 transition flex items-center space-x-3 w-full sm:w-auto justify-center"
            >
               <span className="text-2xl">🟢</span>
               <span>GrabFood</span>
            </motion.button>
            <motion.button 
              whileHover={{ y: -5 }}
              className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-pink-500/10 transition flex items-center space-x-3 w-full sm:w-auto justify-center"
            >
               <span className="text-2xl">🐼</span>
               <span>FoodPanda</span>
            </motion.button>
          </div>
          
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 border-t border-white/5 max-w-4xl mx-auto">
            <div className="flex items-center space-x-5 p-6 bg-white/5 rounded-[32px] border border-white/5 group hover:border-orange-accent/30 transition-colors">
              <div className="bg-orange-accent p-4 rounded-2xl shadow-lg ring-4 ring-orange-accent/10">
                <MapPin size={28} />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-white">Find Us</p>
                <p className="text-gray-400 text-sm">Behind Jollibee, San Isidro St, Goa</p>
              </div>
            </div>
            <div className="flex items-center space-x-5 p-6 bg-white/5 rounded-[32px] border border-white/5 group hover:border-orange-accent/30 transition-colors">
              <div className="bg-orange-accent p-4 rounded-2xl shadow-lg ring-4 ring-orange-accent/10">
                <Clock size={28} />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-white">Hours</p>
                <p className="text-gray-400 text-sm">Open Daily • 9AM - 7PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge position="top" colorClass="bg-cream-dark" />

      {/* CONTACT */}
      <section className="py-20 md:py-24 bg-cream-dark" id="contact">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-cursive text-orange-accent text-3xl md:text-4xl mb-2">Connect</h2>
            <h3 className="font-sans text-4xl md:text-6xl font-bold text-charcoal">Get In Touch</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-charcoal/5">
            {/* Contact Info (Left) */}
            <div className="bg-charcoal p-8 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-accent opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10" />
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="font-cursive text-4xl text-orange-accent mb-3">Hello there!</h3>
                  <p className="font-sans text-2xl md:text-3xl text-white/90 leading-snug">Whether it's for feedback or just to say hi, we're here.</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { icon: MapPin, text: "San Isidro St, Goa, Camarines Sur (Back of Jollibee)" },
                    { icon: Phone, text: "Message us on Facebook for quick orders" },
                    { icon: Clock, text: "Mon - Sun: 9:00 AM - 7:00 PM" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-5 group/info">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover/info:border-orange-accent/50 transition-colors">
                        <item.icon className="text-orange-accent" size={20} />
                      </div>
                      <p className="text-gray-300 text-base md:text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 w-full h-48 md:h-64 bg-brown-dark rounded-3xl overflow-hidden relative border border-white/5 shadow-inner">
                 <img src="https://picsum.photos/seed/delphamap/800/400" alt="Map Location" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin fill="#E8821A" size={48} className="text-white drop-shadow-2xl"/>
                    </motion.div>
                    <span className="font-bold text-white tracking-[0.2em] text-xs drop-shadow-lg bg-black/40 px-5 py-2 rounded-full mt-2 backdrop-blur-sm border border-white/10">GOA, CAM SUR</span>
                 </div>
              </div>
            </div>
            
            {/* Contact Form (Right) */}
            <div className="p-8 md:p-14">
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-charcoal/40 uppercase tracking-widest ml-1">Your Name</label>
                    <input type="text" className="w-full bg-cream-warm/50 border-2 border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:border-orange-accent/30 focus:bg-white transition-all duration-300 font-bold" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-charcoal/40 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" className="w-full bg-cream-warm/50 border-2 border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:border-orange-accent/30 focus:bg-white transition-all duration-300 font-bold" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-charcoal/40 uppercase tracking-widest ml-1">Tell us something</label>
                  <textarea rows={5} className="w-full bg-cream-warm/50 border-2 border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:border-orange-accent/30 focus:bg-white transition-all duration-300 font-bold resize-none" placeholder="What's on your mind?" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-orange-accent text-white py-5 rounded-[20px] font-bold text-lg hover:bg-charcoal transition-all duration-500 shadow-xl shadow-orange-accent/20"
                >
                  Send to A-Delpha's
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <TornEdge position="bottom" colorClass="bg-charcoal" />

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-charcoal text-white relative">
        <div className="container-custom">
          
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-10 mb-16 md:mb-24">
            <div className="text-center lg:text-left space-y-4">
               <h2 className="font-cursive text-orange-accent text-3xl md:text-5xl">The Verdict</h2>
               <h3 className="font-sans text-4xl md:text-6xl font-bold">Love From Camarines</h3>
            </div>
             <div className="flex flex-col items-center bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md shadow-2xl">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="font-sans text-6xl font-bold text-orange-accent">4.8</span>
                  <div className="flex text-orange-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24}/>)}
                  </div>
                </div>
                <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Based on 42 Local Reviews</span>
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map(review => (
              <motion.div 
                key={review.id} 
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[40px] shadow-lg relative transition duration-500 hover:bg-white/10 hover:border-orange-accent/30 group"
              >
                 <div className="text-orange-accent absolute top-6 right-8 opacity-10 group-hover:opacity-30 transition-opacity font-cursive text-8xl leading-none">"</div>
                 <div className="flex text-orange-accent mb-6 space-x-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <p className="text-gray-200 italic mb-8 relative z-10 font-sans text-lg md:text-xl leading-relaxed">"{review.text}"</p>
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-accent rounded-full flex items-center justify-center font-bold text-xl">{review.name.charAt(0)}</div>
                    <div>
                        <p className="font-bold text-white">{review.name}</p>
                        <p className="text-[10px] text-orange-accent uppercase tracking-[0.2em] font-black">Verified Guest</p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      <TornEdge position="top" colorClass="bg-charcoal" />

      {/* FOOTER */}
      <footer className="bg-charcoal text-white pt-16 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-orange-accent/5 blur-[120px] rounded-full -z-0" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            <div className="space-y-6">
              <div className="inline-block bg-orange-accent text-white px-5 py-2 rounded-full font-cursive text-2xl tracking-wider shadow-lg">
                A-Delpha's
              </div>
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
            <p>&copy; {new Date().getFullYear()} A-Delpha's Burger And Cafe.</p>
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
