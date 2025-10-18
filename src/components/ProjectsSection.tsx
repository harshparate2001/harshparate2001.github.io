"use client";
import React, { useState, useRef, useEffect } from "react";
import { projects } from "@/lib/data";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Github, X } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/ImageCarousel";

export default function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | undefined)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new ResizeObserver(() => {
        setHeights((prev) => {
          const newHeights = [...prev];
          newHeights[index] = el.offsetHeight;
          return newHeights;
        });
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [projects]);

  return (
      <section id="projects" className="py-12 relative">
        <div className="container max-w-6xl mx-auto px-6 md:px-4">
          <MotionWrapper>
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
              🚀 Projects
            </h2>
          </MotionWrapper>

          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
                <MotionWrapper key={project.title} delay={index * 0.2}>
                  <div className="flex flex-col md:flex-row items-start gap-6 w-full">
                    {/* ==== PROJECT CARD ==== */}
                    <GlassCard
                        ref={(el) => { cardRefs.current[index] = el ?? undefined; }}
                        className="group overflow-hidden dark:border-purple-500/10 w-full md:w-1/2 flex flex-col"
                    >
                      <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                        <CardTitle className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <ul className="list-disc ml-4 space-y-1 text-sm group-hover:space-y-2 transition-all duration-300">
                          {project.description.map((desc, i) => (
                              <motion.li
                                  key={i}
                                  className="text-muted-foreground"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  viewport={{ once: true }}
                              >
                                {desc}
                              </motion.li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="flex justify-center md:justify-start items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link pt-8"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                          <Github className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                          View on GitHub 🔗
                        </motion.a>
                      </CardFooter>
                    </GlassCard>

                    {/* ==== IMAGE SLIDER ==== */}
                    {project.images && project.images.length > 0 && heights[index] && (
                        <div
                            className="w-full md:w-1/2 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg overflow-hidden flex items-center justify-center"
                            style={{ height: heights[index] }}
                        >
                          <ImageCarousel
                              images={project.images}
                              height={heights[index]}
                              onImageClick={(src) => setSelectedImage(src)}
                          />
                        </div>
                    )}
                  </div>
                </MotionWrapper>
            ))}
          </div>
        </div>

        {/* ==== LIGHTBOX MODAL ==== */}
        {selectedImage && (
            <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedImage(null)}
            >
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-w-full w-full sm:max-w-3xl flex items-center justify-center"
              >
                <button
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white z-10"
                    onClick={() => setSelectedImage(null)}
                >
                  <X size={22} />
                </button>
                <img
                    src={selectedImage}
                    alt="Full View"
                    className="max-w-[90vw] max-h-[80vh] w-auto h-auto rounded-lg object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </div>
        )}
      </section>
  );
}
