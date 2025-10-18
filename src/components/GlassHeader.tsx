import ThemeToggle from "./ui/theme-toggle";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false); // Toast state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ["experience", "skills", "projects", "education"];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80; // adjust for sticky header
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    let start = window.scrollY;
    let distance = offsetPosition - start;
    let startTime: number | null = null;
    const duration = 400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, start + distance * percentage);
      if (progress < duration) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
    setIsMenuOpen(false);
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Harsh_Parate_Resume.pdf";
    link.click();
    setIsMenuOpen(false);

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  return (
      <header className="sticky top-0 z-50 w-full backdrop-blur-md backdrop-filter bg-background/70 dark:bg-background/40 border-b border-border/40">
        <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center">
          <motion.a
              href="/"
              className="flex items-center text-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            ✨ {personalInfo.name}
          </motion.a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, index) => (
                <motion.button
                    key={item}
                    onClick={() => handleScroll(item)}
                    className="cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                >
                  {item === "experience" && "💼 "}
                  {item === "skills" && "🛠️ "}
                  {item === "projects" && "🚀 "}
                  {item === "education" && "🎓 "}
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
            ))}

            {/* Download Resume */}
            <motion.button
                onClick={handleResumeDownload}
                className="flex items-center gap-1 cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: navItems.length * 0.1 }}
                whileHover={{ y: -2 }}
            >
              <Download size={16} /> Resume
            </motion.button>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <motion.button
                className="md:hidden p-2 text-foreground"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  className="md:hidden py-4 px-4 border-t border-border/10 backdrop-blur-md backdrop-filter bg-background/80 dark:bg-background/40"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
              >
                <nav className="flex flex-col space-y-4 text-sm font-medium">
                  {navItems.map((item, index) => (
                      <motion.button
                          key={item}
                          onClick={() => handleScroll(item)}
                          className="text-left w-full cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 py-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        {item === "experience" && "💼 "}
                        {item === "skills" && "🛠️ "}
                        {item === "projects" && "🚀 "}
                        {item === "education" && "🎓 "}
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </motion.button>
                  ))}

                  {/* Mobile Resume Download */}
                  <motion.button
                      onClick={handleResumeDownload}
                      className="flex items-center gap-1 w-full text-left cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: navItems.length * 0.1 }}
                  >
                    <Download size={16} /> Resume
                  </motion.button>
                </nav>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        {showToast && (
            <motion.div
                className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
              ✅ Your download has started!
            </motion.div>
        )}
      </header>
  );
}
