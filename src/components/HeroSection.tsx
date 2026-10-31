import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section
      aria-label="Introduction & Hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 select-none"
      style={{ backgroundColor: "#262626" }}
    >
      {/* Tactile Noise Grain Texture Layer - Opacity strictly preserved at 0.8 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none grain-overlay"
        style={{
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />

      {/* Centerpiece: Clean Outlined ck0x aligned to 80% grid */}
      <div className="relative z-10 flex w-[80%] items-center justify-center">
        <h1
          className="select-none text-center whitespace-nowrap text-8xl font-black tracking-tighter sm:text-[12rem] md:text-[15rem] lg:text-[18rem] xl:text-[22rem] transition-all duration-500 ease-out hover:scale-[1.015] hover:opacity-85 active:scale-[0.99]"
          style={{
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.32)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            opacity: 0.5,
            fontFamily:
              "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          ck0x
          <span className="sr-only">
            {" "}— {siteConfig.name} ({siteConfig.handle} / {siteConfig.shortHandle}) | Creative Developer, Web Designer & Video Editor
          </span>
        </h1>
      </div>

      {/* Screen-reader and Search-crawler accessible semantic summary (GIGW / WCAG / SEO) */}
      <div className="sr-only">
        <h2>About {siteConfig.name} ({siteConfig.handle})</h2>
        <p>
          Welcome to the official portfolio of Chintan Kukadiya, also known online as ck, ck0x, 0x, and ck0xDev.
          A Creative Frontend Developer, Web Designer, and Cinematic Video Editor based in Gujarat, India.
        </p>
        <p>
          Specializing in crafting bespoke, minimalist, high-performance web applications, luxury UI/UX design,
          cinematic storytelling, and creative direction.
        </p>
        <ul>
          {siteConfig.disciplines.map((discipline) => (
            <li key={discipline}>{discipline}</li>
          ))}
        </ul>
        <p>Location: Gujarat, India | Inquiries: Available via verified channels</p>
      </div>
    </section>
  );
}
