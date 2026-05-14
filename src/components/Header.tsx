import { 
  Search, ShoppingCart, Menu, User, Heart, LogOut, Settings, 
  MapPin, Phone, Clock, Mail, Facebook, Twitter, Instagram, Linkedin, LayoutDashboard,
  Zap, Tag, Truck, Gamepad2, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverBody,
  PopoverFooter
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/#products" },
  { name: "Services", href: "/#services" },
  { name: "Reviews", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="w-full relative z-50">
      {/* 1. TOP BAR - Black background */}
      <div className="bg-zinc-950 text-white py-1.5 px-4 hidden md:block">
        <div className="container flex justify-between items-center text-[13px] font-light opacity-90">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#FCA331]" />
              KUMASI, GHANA
            </span>
            <span className="flex items-center gap-2 border-l border-zinc-700 pl-6 cursor-pointer hover:text-[#FCA331] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#FCA331]" />
              +233 24 567 8901
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Twitter className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Instagram className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Linkedin className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </div>

      {/* 2. MIDDLE BAR - Branded Left-Align Logo Design */}
      <div className="bg-[#14213D] hidden md:block overflow-hidden">
        <div className="flex items-stretch min-h-[80px]">
          
          {/* Branded Logo Block (Navy Left) */}
          <div className="relative py-4 pl-8 pr-12 flex items-center shrink-0">
            <Link to="/" className="relative z-10 transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo.png" 
                alt="Tech Zone" 
                className="h-16 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Info & News Bar (White Right) with dynamic clip-path */}
          <div className="flex-1 bg-white flex items-center shadow-inner overflow-hidden"
               style={{ clipPath: 'polygon(45px 0, 100% 0, 100% 100%, 0 100%)' }}>
            
            {/* Scrolling News Marquee - CONTINUOUS LOOP */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center ml-16 mr-8">
              <motion.div 
                className="flex items-center gap-12 text-[#14213D] shrink-0 pointer-events-none"
                animate={{ x: [0, -1000] }} // Approximate width of one set
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* First Set */}
                <div className="flex items-center gap-12 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#FCA331] text-[#14213D] rounded-full text-[10px] font-bold uppercase tracking-tighter shrink-0">
                    <Zap className="h-3 w-3 fill-current" /> Flash News
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Tag className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      reduction of 10% discount on all items!
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Truck className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      Free GHANA-WIDE delivery on orders over GHC 500
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Gamepad2 className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      New arrivals in Gaming Laptops and Accessories!
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <ShieldCheck className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      24/7 technical support for all purchases
                    </span>
                  </div>
                </div>

                {/* Second Set (Duplicate for continuity) */}
                <div className="flex items-center gap-12 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#FCA331] text-[#14213D] rounded-full text-[10px] font-bold uppercase tracking-tighter shrink-0">
                    <Zap className="h-3 w-3 fill-current" /> Flash News
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Tag className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      reduction of 10% discount on all items!
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Truck className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      Free GHANA-WIDE delivery on orders over GHC 500
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Gamepad2 className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      New arrivals in Gaming Laptops and Accessories!
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <ShieldCheck className="h-4 w-4 text-[#FCA331]" />
                    <span className="text-[13px] font-bold uppercase tracking-wider italic">
                      24/7 technical support for all purchases
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Info Blocks (Right) */}
            <div className="flex shrink-0 items-center px-8 gap-6 lg:gap-10 border-l border-gray-100 h-full">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="h-8 w-8 bg-[#FCA331]/10 flex items-center justify-center rounded-full text-[#FCA331] border border-[#FCA331]/20 group-hover:bg-[#FCA331] group-hover:text-white transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="transition-transform group-hover:translate-x-1 duration-300 hidden lg:block">
                  <p className="text-[14px] font-black text-[#14213D] leading-none">Kumasi, Ghana</p>
                </div>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="h-8 w-8 bg-[#FCA331]/10 flex items-center justify-center rounded-full text-[#FCA331] border border-[#FCA331]/20 group-hover:bg-[#FCA331] group-hover:text-white transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="transition-transform group-hover:translate-x-1 duration-300 hidden lg:block">
                  <p className="text-[14px] font-black text-[#14213D] leading-none">info@techzone.com</p>
                </div>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer pr-4">
                <div className="h-8 w-8 bg-[#FCA331]/10 flex items-center justify-center rounded-full text-[#FCA331] border border-[#FCA331]/20 group-hover:bg-[#FCA331] group-hover:text-white transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="transition-transform group-hover:translate-x-1 duration-300 hidden lg:block">
                  <p className="text-[14px] font-black text-[#14213D] leading-none">+233 24 567 8901</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR - Branded Toggle (White on Mobile, Dark on Desktop) */}
      <div className="bg-white md:bg-zinc-900 text-[#14213D] md:text-white sticky top-0 md:relative md:top-auto shadow-sm md:shadow-lg">
        <div className="container flex items-center justify-between h-14 md:h-16 px-4">
          
          {/* Mobile View - Branded Logo Left */}
          <div className="md:hidden relative h-[57px] flex items-center -ml-4 pl-4 pr-8 bg-[#14213D]"
               style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0% 100%)' }}>
            <Link to="/" className="relative z-10 transition-opacity hover:opacity-90">
              <img src="/logo.png" alt="Tech Zone" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center h-full">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? location.pathname === "/" && !location.hash : location.pathname + location.hash === link.href;
              return (
              <Link 
                key={link.name} 
                to={link.href} 
                className={cn(
                  "text-[13px] font-black uppercase tracking-wider transition-colors relative group py-2 px-6",
                  isActive
                    ? "text-[#FCA331]" 
                    : "text-white/90 hover:text-[#FCA331]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-[#FCA331] transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            )})}
          </nav>

          {/* Actions - Desktop & Mobile */}
          <div className="flex items-center gap-1 md:gap-2 h-full">
            {/* Action Highlights (Cart & User) - Now Visible on Mobile */}
            <div className="flex items-center h-full gap-1 md:gap-2">
              <Link to="/cart" className="relative p-2.5 text-[#14213D] md:text-gray-300 hover:text-[#FCA331] transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FCA331] text-[9px] text-zinc-950 font-black shadow-sm border border-white md:border-zinc-900">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="h-8 md:h-10 w-8 md:w-10 rounded-full overflow-hidden border-2 border-[#14213D]/10 md:border-zinc-700 hover:border-[#FCA331] transition-all ring-offset-white md:ring-offset-zinc-900 focus-visible:ring-2 focus-visible:ring-[#FCA331]">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="bg-[#14213D] text-white uppercase font-bold text-xs md:text-sm">
                          {user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-zinc-950 border-zinc-800 text-white shadow-2xl" align="end" sideOffset={12}>
                    <PopoverHeader className="border-zinc-800">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border border-blue-600 shadow-lg shadow-blue-900/40">
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback className="bg-blue-600 text-white uppercase font-bold">
                            {user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <PopoverTitle className="truncate font-bold text-white">Your Hub</PopoverTitle>
                          <PopoverDescription className="text-xs truncate text-blue-300 font-medium">
                            {user.email}
                          </PopoverDescription>
                        </div>
                      </div>
                    </PopoverHeader>
                    <PopoverBody className="space-y-1 px-2 py-3 bg-zinc-900/50">
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#profile")}>
                        <User className="mr-3 h-4 w-4" />
                        Account Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#orders")}>
                        <ShoppingCart className="mr-3 h-4 w-4" />
                        Purchase History
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#wishlist")}>
                        <Heart className="mr-3 h-4 w-4" />
                        My Wishlist
                      </Button>
                    </PopoverBody>
                    <PopoverFooter className="border-zinc-800 p-2 bg-black">
                      <Button
                        variant="ghost"
                        className="w-full h-10 text-red-500 hover:text-white hover:bg-red-600 justify-center font-bold uppercase tracking-tighter text-xs"
                        size="sm"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Secure Logout
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="text-[#14213D] md:text-gray-300 hover:text-[#FCA331]">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* "Get In Touch" Button - Hidden on Mobile for cleaner UI */}
            <div className="hidden md:block relative group ml-8">
              <div 
                className="absolute inset-y-0 -left-6 -right-12 bg-[#FCA331] md:group-hover:bg-[#14213D] transition-all duration-300 z-0"
                style={{ clipPath: 'polygon(26px 0, 100% 0, calc(100% - 26px) 100%, 0% 100%)' }}
              />
              <Link 
                to="/#contact" 
                className="relative z-10 px-8 md:px-12 h-14 md:h-16 flex items-center justify-center font-black uppercase tracking-tighter text-[#14213D] md:group-hover:text-[#FCA331] transition-colors duration-300 text-sm md:text-base whitespace-nowrap"
              >
                Get In Touch
              </Link>
            </div>

            {/* Hamburger - Mobile only */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden ml-2 pr-4">
                <Button variant="ghost" size="icon" className="text-[#14213D]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#E5E5E5] border-l border-gray-300 p-0 overflow-hidden text-[#14213D] [&>button]:text-[#14213D] [&>button]:opacity-40 [&>button]:hover:opacity-100">
                {/* Mobile Menu Top Section - Clean & Branded */}
                <div className="p-6 flex items-center border-b border-[#14213D]/5">
                  <img src="/logo.png" alt="Tech Zone Logo" className="h-10 w-auto object-contain brightness-0" />
                </div>

                <div className="p-6 flex flex-col gap-8 h-full">
                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = link.href === "/" ? location.pathname === "/" && !location.hash : location.pathname + location.hash === link.href;
                      return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-lg font-semibold py-3 border-b border-[#14213D]/10 flex items-center justify-between group uppercase tracking-tighter transition-colors",
                          isActive ? "text-[#FCA331]" : "text-[#14213D]/80 hover:text-[#14213D]"
                        )}
                      >
                        {link.name}
                        <div className={cn(
                          "h-1 bg-[#FCA331] transition-all",
                          isActive ? "w-8" : "w-0 group-hover:w-8"
                        )} />
                      </Link>
                    )})}
                    {!user && (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-semibold text-[#14213D] py-3 mt-2 border-b border-[#14213D]/10 flex items-center justify-between group uppercase tracking-tighter"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-[#FCA331]/10 flex items-center justify-center rounded-full text-[#FCA331] border border-[#FCA331]/20">
                            <User className="h-4 w-4" />
                          </div>
                          Sign In / Register
                        </div>
                        <div className="h-1 w-0 bg-[#FCA331] transition-all group-hover:w-8" />
                      </Link>
                    )}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="mt-auto pb-10 flex flex-col gap-4 text-[#14213D]/60 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white border border-gray-200 flex items-center justify-center rounded-xl text-[#FCA331]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Accra, Ghana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white border border-gray-200 flex items-center justify-center rounded-xl text-[#FCA331]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="font-medium">info@techzone.com.gh</span>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 justify-center">
                      <a href="#" className="text-[#14213D]/40 hover:text-[#FCA331] transition-colors"><Facebook className="h-4 w-4" /></a>
                      <a href="#" className="text-[#14213D]/40 hover:text-[#FCA331] transition-colors"><Twitter className="h-4 w-4" /></a>
                      <a href="#" className="text-[#14213D]/40 hover:text-[#FCA331] transition-colors"><Instagram className="h-4 w-4" /></a>
                      <a href="#" className="text-[#14213D]/40 hover:text-[#FCA331] transition-colors"><Linkedin className="h-4 w-4" /></a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* 4. MOBILE NEWS MARQUEE - Visible ONLY on Mobile */}
      <div className="md:hidden bg-[#FCA331] py-1 border-b border-[#FCA331]/20 overflow-hidden">
        <motion.div 
          className="flex items-center gap-8 text-[#14213D] whitespace-nowrap"
          animate={{ x: [0, -500] }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-[#14213D] text-[#FCA331] px-2 py-0.5 rounded italic">
              Flash News
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider italic">
              reduction of 10% discount on all items!
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider italic">
              Free Delivery over GHC 500
            </span>
          </div>
          {/* Duplicate for continuity */}
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-[#14213D] text-[#FCA331] px-2 py-0.5 rounded italic">
              Flash News
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider italic">
              reduction of 10% discount on all items!
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider italic">
              Free Delivery over GHC 500
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
