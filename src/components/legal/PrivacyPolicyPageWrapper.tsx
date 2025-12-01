"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function PrivacyPolicyPageWrapper() {
  const sections = useMemo(
    () => [
      { id: "introduction", title: "Introduction" },
      { id: "information-we-collect", title: "Information We Collect" },
      { id: "how-we-use", title: "How We Use Your Information" },
      { id: "how-we-share", title: "How We Share Information" },
      { id: "data-security", title: "Data Security" },
      { id: "data-retention", title: "Data Retention" },
      { id: "your-privacy-rights", title: "Your Privacy Rights (U.S. Users)" },
      { id: "children-privacy", title: "Children's Privacy" },
      { id: "cookies-tracking", title: "Cookies & Tracking" },
      { id: "third-party-links", title: "Third-Party Links" },
      { id: "updates-to-policy", title: "Updates to This Policy" },
      { id: "contact-information", title: "Contact Information" },
    ],
    []
  );

  const now = new Date();
  const [activeId, setActiveId] = useState(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const [indicator, setIndicator] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });
  const [navHeight, setNavHeight] = useState(0);
  const [navTop, setNavTop] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        // Balance around viewport center: trigger when section crosses mid band
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Separate observer for the last section to handle bottom of page
    const lastSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if we're near the bottom of the page
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop =
              window.scrollY || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight;
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

            // If we're within 200px of the bottom and the last section is visible, activate it
            if (distanceFromBottom < 200) {
              setActiveId(entry.target.id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -80% 0px", // Trigger when section is in bottom 20% of viewport
        threshold: [0, 0.1, 0.2, 0.3],
      }
    );

    const observed: Element[] = [];
    const lastSectionId = sections[sections.length - 1]?.id;

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) {
        observer.observe(el);
        observed.push(el);

        // Also observe the last section with the special observer
        if (s.id === lastSectionId) {
          lastSectionObserver.observe(el);
        }
      }
    });

    // Also check on scroll if we're at the bottom
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // If we're at the bottom (within 50px), activate the last section
      if (distanceFromBottom < 50 && lastSectionId) {
        const lastSectionEl = document.getElementById(lastSectionId);
        if (lastSectionEl) {
          const rect = lastSectionEl.getBoundingClientRect();
          // Check if the last section is visible
          if (rect.top < clientHeight && rect.bottom > 0) {
            setActiveId(lastSectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      if (lastSectionId) {
        const lastSectionEl = document.getElementById(lastSectionId);
        if (lastSectionEl) {
          lastSectionObserver.unobserve(lastSectionEl);
        }
      }
      lastSectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeLink = container.querySelector(
      `a[href="#${activeId}"]`
    ) as HTMLElement | null;
    if (!activeLink) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const top = linkRect.top - containerRect.top;

    setIndicator({
      top,
      height: linkRect.height,
    });
  }, [activeId]);

  useEffect(() => {
    const navList = navListRef.current;
    const container = containerRef.current;
    if (!navList || !container) return;

    const updateNavDimensions = () => {
      const containerRect = container.getBoundingClientRect();
      const navRect = navList.getBoundingClientRect();
      const top = navRect.top - containerRect.top;
      const height = navRect.height;
      setNavTop(top);
      setNavHeight(height);
    };

    updateNavDimensions();
    window.addEventListener("resize", updateNavDimensions);

    return () => {
      window.removeEventListener("resize", updateNavDimensions);
    };
  }, []);

  return (
    <section className="custom-container  flex flex-col gap-[2.81rem] justify-start items-start">
      <div className="w-full flex items-center justify-center relative h-[300px] ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center  w-full leading-[48px] tracking-[0.8px] text-black text-[40px] md:text-[74px] font-bold font-circular-bold md:tracking-[1.48px] uppercase md:leading-[88.8px]">
            PRIVACY POLICY
          </h1>
          <div className="text-black font-circular-medium text-center text-base">
            Last updated: <span>{format(now, "MM/dd/yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 pb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
          {/* Sidebar */}
          <aside className="sticky top-4  lg:block hidden">
            <nav className="w-full">
              <div ref={containerRef} className="relative bg-white p-4">
                {navHeight > 0 && (
                  <div
                    className="pointer-events-none absolute left-[-1px] w-[3px] bg-gray-300 rounded-md"
                    style={{ top: navTop, height: navHeight }}
                  ></div>
                )}
                <div
                  className="pointer-events-none absolute left-[-1px] w-[3px] bg-main-green rounded-md transition-all duration-300 z-10"
                  style={{ top: indicator.top, height: indicator.height }}
                ></div>
                <h2 className="text-black font-circular-bold text-sm mb-3">
                  On this page
                </h2>
                <ul ref={navListRef} className="relative flex flex-col gap-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block text-sm transition-colors ${
                          activeId === s.id
                            ? "text-main-green font-circular-medium"
                            : "text-black/80 hover:text-main-green"
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <article className="w-full flex flex-col gap-10">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-[7.5rem] flex flex-col gap-4"
              >
                <h2 className="text-black font-circular-bold text-[1.5rem] md:text-[2rem]">
                  {s.title}
                </h2>
                {/* Add your content for this section below */}
                <div className="flex flex-col gap-3">
                  {s.id === "introduction" && (
                    <>
                      <p className="text-black">
                        Home360 respects your privacy and is committed to
                        protecting your personal information.
                      </p>
                      <p className="text-black">
                        This Privacy Policy applies to U.S. users of the Home360
                        platform and describes how we collect, use, disclose,
                        and safeguard your information.
                      </p>
                    </>
                  )}

                  {s.id === "information-we-collect" && (
                    <>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        2.1 Information You Provide
                      </h3>
                      <p className="text-black">This includes:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Home address (optional)</li>
                        <li>Property details</li>
                        <li>Home documentation</li>
                        <li>Maintenance and appliance data</li>
                        <li>Photos and notes</li>
                        <li>Service provider details</li>
                        <li>Optional home-related financial data</li>
                      </ul>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        2.2 Payment Information
                      </h3>
                      <p className="text-black">
                        Payments are handled by Stripe.
                      </p>
                      <p className="text-black">
                        We do not collect or store your full payment details.
                      </p>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        2.3 Information Collected Automatically
                      </h3>
                      <p className="text-black">We collect:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>IP address</li>
                        <li>Browser and device information</li>
                        <li>Usage activity (features used, time spent)</li>
                        <li>Diagnostic and log data</li>
                      </ul>
                    </>
                  )}

                  {s.id === "how-we-use" && (
                    <>
                      <p className="text-black">We use your information to:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Operate and maintain the Service</li>
                        <li>Provide customer support</li>
                        <li>Improve and personalize the platform</li>
                        <li>Send service-related communications</li>
                        <li>Process subscriptions via Stripe</li>
                        <li>Detect fraud and unauthorized activity</li>
                        <li>Send optional marketing updates</li>
                      </ul>
                    </>
                  )}

                  {s.id === "how-we-share" && (
                    <>
                      <p className="text-black">
                        We do not sell your personal information.
                      </p>
                      <p className="text-black">We may share data with:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Stripe for secure payment processing</li>
                        <li>Cloud hosting and storage providers</li>
                        <li>Analytics and customer support tools</li>
                        <li>Law enforcement, if required by law</li>
                        <li>
                          Potential buyers/investors in case of acquisition
                        </li>
                      </ul>
                    </>
                  )}

                  {s.id === "data-security" && (
                    <>
                      <p className="text-black">
                        We use reasonable technical safeguards, including:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Encryption in transit</li>
                        <li>Secure servers</li>
                        <li>Role-based access control</li>
                        <li>Regular system monitoring</li>
                      </ul>
                      <p className="text-black">
                        However, no digital system is 100% secure.
                      </p>
                    </>
                  )}

                  {s.id === "data-retention" && (
                    <>
                      <p className="text-black">We retain your data:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>As long as your account is active</li>
                        <li>As required for legal and operational purposes</li>
                      </ul>
                      <p className="text-black">
                        Upon deletion, your data is securely deleted or
                        anonymized within a reasonable period.
                      </p>
                    </>
                  )}

                  {s.id === "your-privacy-rights" && (
                    <>
                      <p className="text-black">You have the right to:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Access your personal data</li>
                        <li>Request corrections</li>
                        <li>Request deletion</li>
                        <li>Opt out of marketing emails</li>
                      </ul>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        California Residents (CCPA/CPRA Rights)
                      </h3>
                      <p className="text-black">
                        If you are a California resident, you have the right to:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Know what information we collect</li>
                        <li>Request deletion</li>
                        <li>
                          Opt out of data sharing (we currently do not sell
                          data)
                        </li>
                      </ul>
                      <p className="text-black">
                        To make a request, email:{" "}
                        <Link
                          href="mailto:privacy@myhomethreesixty.com"
                          className="underline underline-offset-2 text-black"
                        >
                          privacy@myhomethreesixty.com
                        </Link>
                      </p>
                    </>
                  )}

                  {s.id === "children-privacy" && (
                    <>
                      <p className="text-black">
                        Home360 is not intended for children under 13.
                      </p>
                      <p className="text-black">
                        We do not knowingly collect personal data from children.
                      </p>
                    </>
                  )}

                  {s.id === "cookies-tracking" && (
                    <>
                      <p className="text-black">We use cookies to:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Remember user preferences</li>
                        <li>Analyze traffic</li>
                        <li>Improve functionality</li>
                      </ul>
                      <p className="text-black">
                        You can control cookies via your browser settings.
                      </p>
                    </>
                  )}

                  {s.id === "third-party-links" && (
                    <>
                      <p className="text-black">
                        Our platform may link to third-party websites or
                        services.
                      </p>
                      <p className="text-black">
                        We are not responsible for their privacy practices.
                      </p>
                    </>
                  )}

                  {s.id === "updates-to-policy" && (
                    <>
                      <p className="text-black">
                        We may update this Privacy Policy at any time.
                      </p>
                      <p className="text-black">
                        Updates will be posted with a new &quot;Last
                        Updated&quot; date.
                      </p>
                    </>
                  )}

                  {s.id === "contact-information" && (
                    <>
                      <p className="text-black">
                        <span className="font-circular-bold">Home360</span>
                      </p>
                      <p className="text-black">Atlanta, Georgia</p>
                      <p className="text-black">
                        Email:{" "}
                        <Link
                          href="mailto:privacy@myhomethreesixty.com"
                          className="underline underline-offset-2 text-black"
                        >
                          privacy@myhomethreesixty.com
                        </Link>
                      </p>
                      <p className="text-black">
                        Website:{" "}
                        <Link
                          href="https://www.myhomethreesixty.com"
                          className="underline underline-offset-2 text-black"
                        >
                          https://www.myhomethreesixty.com
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
export default PrivacyPolicyPageWrapper;
