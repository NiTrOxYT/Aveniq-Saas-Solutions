import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function BookDemoPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the section
    gsap.fromTo(
      sectionRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate the form
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6">Book a Demo</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Schedule a personalized consultation with our team to discuss your project and how we can help bring it to life.
          </p>
        </div>

        <div ref={formRef} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/30"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">Company</label>
              <input
                type="text"
                id="company"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/30"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Project Details</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/30"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Schedule Demo <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
