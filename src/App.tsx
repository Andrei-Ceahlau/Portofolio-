import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Rocket, Sparkles, Github, ExternalLink, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from '@/components/theme-provider';
import { GitHubProjects } from '@/components/GitHubProjects';

// Aici poți să adaugi proiectele tale
const projects = [
  {
    title: "Numele Proiectului Tău",
    description: "O scurtă descriere a proiectului tău",
    // Înlocuiește cu link-ul către imaginea proiectului tău
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    // Adaugă tehnologiile folosite în proiect
    tech: ["React", "Node.js", "MongoDB"],
    // Adaugă link-ul către proiectul tău live sau repository
    link: "https://proiectul-tau.com"
  },
  {
    title: "Al Doilea Proiect",
    description: "Descrierea celui de-al doilea proiect",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
    tech: ["TypeScript", "Next.js", "Prisma"],
    link: "https://github.com/username/project"
  },
  {
    title: "Al Treilea Proiect",
    description: "Descrierea celui de-al treilea proiect",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop",
    tech: ["Vue.js", "Firebase", "Tailwind"],
    link: "https://proiect3.com"
  }
];

function App() {
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary)) 0.5px, transparent 0.5px)',
          backgroundSize: '2rem 2rem',
        }}
      />

      {/* Header */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-border/40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Portfolio</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="min-h-screen flex items-center justify-center relative py-32"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 -z-10"
          style={{ y: backgroundY }}
        />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                background: [
                  "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)))",
                  "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
                  "linear-gradient(to right, hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)))"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 opacity-30 blur-3xl -z-10"
            />
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Creating Digital Magic
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transforming ideas into exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 relative overflow-hidden group"
                onClick={() => window.open('https://github.com/Andrei-Ceahlau?tab=repositories', '_blank')}
              >
                <span className="relative z-10">View Projects</span>
                <Rocket className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open('https://github.com/Andrei-Ceahlau', '_blank')}
              >
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </div>
          </motion.div>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="py-32 relative">
        <div 
          className="absolute inset-0 bg-muted/50 -z-10"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Proiectele Mele
          </motion.h2>

          {/* GitHub Projects */}
          <GitHubProjects username="Andrei-Ceahlau" />

          {/* Featured Projects */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 mt-32"
          >
            Proiecte Evidențiate
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(tech => (
                        <span 
                          key={tech}
                          className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      className="gap-2 group/button" 
                      onClick={() => window.open('https://github.com/Andrei-Ceahlau?tab=repositories', '_blank')}
                    >
                      Vezi Proiectul 
                      <ExternalLink className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              "radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Contactează-mă</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hai să aducem ideile tale la viață! Contactează-mă și putem crea ceva extraordinar împreună.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 group"
                onClick={() => window.open('https://www.linkedin.com/in/andrei-ceahlau-526436331/', '_blank')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:scale-110 transition-transform">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 group"
                onClick={() => window.location.href = 'mailto:andrei.ceahlau@yahoo.com'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:scale-110 transition-transform">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                andrei.ceahlau@yahoo.com
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;