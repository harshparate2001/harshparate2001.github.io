import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ImageCarousel({
                                          images,
                                          height = 240,
                                          autoPlayDelay = 3000,
                                          showDots = true,
                                          showArrows = true,
                                          onImageClick,
                                      }: {
    images: string[];
    height?: number;
    autoPlayDelay?: number;
    showDots?: boolean;
    showArrows?: boolean;
    onImageClick?: (src: string) => void;
}) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setCurrent((prev) => (prev + 1) % images.length),
            autoPlayDelay
        );
        return () => clearInterval(interval);
    }, [images.length, autoPlayDelay]);

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-purple-500/10 shadow-md bg-gradient-to-b from-muted/30 to-background/10">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        className="min-w-full flex items-center justify-center bg-black/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={src}
                            alt={`Project image ${i + 1}`}
                            className="w-full h-full object-contain cursor-pointer"
                            style={{ height }}
                            onClick={() => onImageClick && onImageClick(src)}
                        />
                    </motion.div>
                ))}
            </div>

            {/* dots */}
            {showDots && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                                i === current ? "bg-purple-500" : "bg-gray-400/50"
                            }`}
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>
            )}

            {/* arrows */}
            {showArrows && (
                <>
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                        onClick={() =>
                            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                        }
                    >
                        ‹
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
                    >
                        ›
                    </button>
                </>
            )}
        </div>
    );
}
