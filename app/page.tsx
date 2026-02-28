"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const carRef = useRef<HTMLImageElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 🔥 Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {

      // 🔥 Headline intro animation
      if (headlineRef.current) {
        gsap.from(headlineRef.current.children, {
          y: 80,
          opacity: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // 🔥 Stats intro animation
      gsap.from(statsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
      });

      // 🔥 Car scroll animation (phase 1)
      if (carRef.current) {
  gsap.to(carRef.current, {
    x: 1050,
    scale: 1.06,
    rotate: 0.8,
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "65% center",
      scrub: 1.3,
    },
  });
}

      // 🔥 Headline fade (phase 2)
      if (headlineRef.current) {
       gsap.to(headlineRef.current, {
  opacity: 0,
  y: -50,
  scrollTrigger: {
    trigger: containerRef.current,
    start: "55% center",
    end: "bottom bottom",
    scrub: true,
  },
});
      }

      // 🔥 Stats fade (phase 2)
      gsap.to(statsRef.current, {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "55% center",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 🔥 Parallax background light
      if (lightRef.current) {
        gsap.to(lightRef.current, {
          x: 300,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const text = "WELCOME ITZFIZZ";

  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* Scroll Area */}
      <section ref={containerRef} className="h-[200vh] relative">

        {/* Sticky Hero */}
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center relative overflow-hidden">

          {/* Moving Light */}
          <div
            ref={lightRef}
            className="absolute w-[800px] h-[800px] bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-full blur-3xl left-[-400px] top-[10%]"
          />

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-6xl md:text-8xl font-bold tracking-[0.4em] flex text-center z-10"
          >
            {text.split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>

          {/* Stats */}
          <div className="flex gap-16 mt-16 z-10">
            {[
              { value: "90%", label: "Growth" },
              { value: "75%", label: "Engagement" },
              { value: "120%", label: "ROI" },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) statsRef.current[i] = el;
                }}
                className="text-center"
              >
                <h2 className="text-4xl font-semibold">{item.value}</h2>
                <p className="text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Glow */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[600px] h-[40px] bg-white/10 blur-3xl rounded-full"></div>

          {/* Car */}
          <img
            ref={carRef}
            src="/car.png"
            alt="Car"
            className="absolute bottom-12 left-[-220px] w-[580px] drop-shadow-[0_80px_120px_rgba(255,255,255,0.15)] will-change-transform"
          />

        </div>
      </section>

      <section className="h-screen bg-zinc-900 flex items-center justify-center">
        <h2 className="text-4xl text-gray-400">
          Cinematic Scroll Complete 🚀
        </h2>
      </section>

    </main>
  );
}