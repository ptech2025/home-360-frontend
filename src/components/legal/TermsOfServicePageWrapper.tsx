"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function TermsOfServicePageWrapper() {
  const sections = useMemo(
    () => [
      { id: "agreement-to-terms", title: "Agreement to Terms" },
      { id: "about-home360", title: "About Home360" },
      { id: "eligibility", title: "Eligibility" },
      {
        id: "account-registration-security",
        title: "Account Registration & Security",
      },
      { id: "acceptable-use", title: "Acceptable Use" },
      { id: "user-content", title: "User Content" },
      { id: "subscriptions-payments", title: "Subscriptions & Payments" },
      { id: "third-party-services", title: "Third-Party Services" },
      { id: "disclaimer-of-warranties", title: "Disclaimer of Warranties" },
      { id: "limitation-of-liability", title: "Limitation of Liability" },
      { id: "termination", title: "Termination" },
      {
        id: "governing-law-jurisdiction",
        title: "Governing Law & Jurisdiction",
      },
      { id: "changes-to-terms", title: "Changes to Terms" },
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
            TERMS OF SERVICE
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
            {/* Intro / Hero content */}
            <section
              id="intro"
              className="scroll-mt-[7.5rem] flex flex-col gap-4"
            >
              <h2 className="text-black font-circular-bold text-[1.5rem] md:text-[2rem]">
                Welcome
              </h2>
              <div className="flex flex-col gap-3">
                <p className="text-black">
                  Welcome to{" "}
                  <Link
                    href="/"
                    className="underline underline-offset-2 text-black"
                  >
                    Home360
                  </Link>
                  . These Terms and Conditions (&quot;Terms&quot;) govern your
                  access to and use of the Home360 platform, including our
                  website located at{" "}
                  <Link
                    href="https://www.myhomethreesixty.com"
                    className="underline underline-offset-2 text-black"
                  >
                    https://www.myhomethreesixty.com
                  </Link>{" "}
                  and all related services, features, and applications
                  (collectively, the &quot;Service&quot;).
                </p>
                <p className="text-black">
                  By creating an account, accessing, or using the Service, you
                  agree to be legally bound by these Terms. If you do not agree,
                  you must not use the Service.
                </p>
              </div>
            </section>

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
                  {s.id === "agreement-to-terms" && (
                    <>
                      <p className="text-black">
                        These Terms and Conditions (&quot;Terms&quot;) govern
                        your access to and use of the Home360 platform,
                        including our website located at{" "}
                        <Link
                          href="https://www.myhomethreesixty.com"
                          className="underline underline-offset-2 text-black"
                        >
                          https://www.myhomethreesixty.com
                        </Link>{" "}
                        and all related services, features, and applications
                        (collectively, the &quot;Service&quot;).
                      </p>
                      <p className="text-black">
                        By creating an account, accessing, or using the Service,
                        you agree to be legally bound by these Terms.
                      </p>
                      <p className="text-black">
                        If you do not agree, you must not use the Service.
                      </p>
                    </>
                  )}

                  {s.id === "about-home360" && (
                    <>
                      <p className="text-black">
                        Home360 is an all-in-one digital home management
                        platform designed to help homeowners organize and manage
                        home-related information, including:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Property details</li>
                        <li>
                          Home documents (e.g., deeds, warranties, receipts)
                        </li>
                        <li>Maintenance schedules and logs</li>
                        <li>Appliance and system information</li>
                        <li>Service provider contacts</li>
                        <li>Home-related financial records and expenses</li>
                      </ul>
                      <p className="text-black">
                        Home360 provides organizational tools only and does not
                        provide legal, financial, real estate, or home
                        inspection advice.
                      </p>
                    </>
                  )}

                  {s.id === "eligibility" && (
                    <>
                      <p className="text-black">You must be:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>At least 18 years old, and</li>
                        <li>
                          Legally capable of entering a binding agreement under
                          U.S. law.
                        </li>
                      </ul>
                      <p className="text-black">
                        By using the Service, you confirm that you meet these
                        requirements.
                      </p>
                    </>
                  )}

                  {s.id === "account-registration-security" && (
                    <>
                      <p className="text-black">
                        You must create an account to use most features of the
                        Service.
                      </p>
                      <p className="text-black">You agree to:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Provide accurate and complete information.</li>
                        <li>Keep your login credentials confidential.</li>
                        <li>
                          Notify us immediately of suspicious or unauthorized
                          account activity.
                        </li>
                      </ul>
                      <p className="text-black">
                        We reserve the right to suspend or terminate your
                        account if you violate these Terms.
                      </p>
                    </>
                  )}

                  {s.id === "acceptable-use" && (
                    <>
                      <p className="text-black">You agree that you will not:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Use the Service for any unlawful purpose.</li>
                        <li>
                          Upload false, misleading, illegal, or infringing
                          content.
                        </li>
                        <li>
                          Try to access another user&apos;s data without
                          authorization.
                        </li>
                        <li>
                          Attempt to hack, disrupt, or reverse engineer the
                          Service.
                        </li>
                      </ul>
                      <p className="text-black">
                        You are responsible for the accuracy of the information
                        you upload and for maintaining your own backups.
                      </p>
                    </>
                  )}

                  {s.id === "user-content" && (
                    <>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        6.1 Ownership
                      </h3>
                      <p className="text-black">
                        You retain all ownership rights to your uploaded content
                        (&quot;User Content&quot;).
                      </p>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        6.2 License to Home360
                      </h3>
                      <p className="text-black">
                        By using Home360, you grant us a limited, non-exclusive,
                        worldwide, royalty-free license to:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Store your content</li>
                        <li>Display it within your account</li>
                        <li>Process it for Service functionality</li>
                        <li>Back it up and secure it</li>
                      </ul>
                      <p className="text-black">
                        We do not sell or claim ownership over your data.
                      </p>
                    </>
                  )}

                  {s.id === "subscriptions-payments" && (
                    <>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        7.1 Payments via Stripe
                      </h3>
                      <p className="text-black">
                        Home360 uses Stripe as a third-party payment processor.
                      </p>
                      <p className="text-black">
                        By subscribing, you also agree to Stripe&apos;s terms
                        and privacy policy.
                      </p>
                      <p className="text-black">
                        Home360 does not store or directly process your full
                        payment information.
                      </p>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        7.2 Billing
                      </h3>
                      <p className="text-black">Subscription fees are:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>
                          Charged on a recurring basis (monthly or annual).
                        </li>
                        <li>Auto-renewed until canceled.</li>
                      </ul>
                      <h3 className="text-black font-circular-bold text-base md:text-lg mt-2">
                        7.3 Cancellation
                      </h3>
                      <p className="text-black">
                        You may cancel your subscription at any time through
                        your account settings.
                      </p>
                      <p className="text-black">
                        Unless otherwise stated, payments are non-refundable.
                      </p>
                    </>
                  )}

                  {s.id === "third-party-services" && (
                    <>
                      <p className="text-black">
                        The Service may integrate or link with third-party
                        services, including:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Stripe (payments)</li>
                        <li>Cloud storage providers</li>
                        <li>Analytics services</li>
                      </ul>
                      <p className="text-black">
                        We are not responsible for third-party services or their
                        policies.
                      </p>
                    </>
                  )}

                  {s.id === "disclaimer-of-warranties" && (
                    <>
                      <p className="text-black">
                        The Service is provided on an &quot;as is&quot; and
                        &quot;as available&quot; basis.
                      </p>
                      <p className="text-black">We do not guarantee:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>That your data will be perfectly accurate</li>
                        <li>That your home value or condition will improve</li>
                        <li>
                          That the Service will be uninterrupted or error-free
                        </li>
                      </ul>
                      <p className="text-black">
                        Use the Service at your own risk.
                      </p>
                    </>
                  )}

                  {s.id === "limitation-of-liability" && (
                    <>
                      <p className="text-black">
                        To the maximum extent allowed by Georgia law:
                      </p>
                      <p className="text-black">
                        Home360 shall not be liable for:
                      </p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Loss of data</li>
                        <li>Property damage</li>
                        <li>Loss of profits</li>
                        <li>Home maintenance failures</li>
                        <li>Indirect or consequential damages</li>
                      </ul>
                      <p className="text-black">
                        Our total liability shall not exceed the amount you paid
                        to us in the last 12 months.
                      </p>
                    </>
                  )}

                  {s.id === "termination" && (
                    <>
                      <p className="text-black">
                        We may suspend or terminate your account at our
                        discretion for violations of these Terms.
                      </p>
                      <p className="text-black">Upon termination:</p>
                      <ul className="list-disc pl-6 flex flex-col gap-2 text-black">
                        <li>Your access ends immediately.</li>
                        <li>
                          Your data may be deleted after a reasonable period.
                        </li>
                      </ul>
                    </>
                  )}

                  {s.id === "governing-law-jurisdiction" && (
                    <>
                      <p className="text-black">
                        These Terms shall be governed by the laws of the State
                        of Georgia, without regard to conflict of law rules.
                      </p>
                      <p className="text-black">
                        Any disputes shall be resolved solely in the state or
                        federal courts located in Fulton County, Georgia.
                      </p>
                    </>
                  )}

                  {s.id === "changes-to-terms" && (
                    <>
                      <p className="text-black">
                        We may update these Terms at any time.
                      </p>
                      <p className="text-black">
                        Revisions will be posted on our website with a new
                        &quot;Last Updated&quot; date.
                      </p>
                      <p className="text-black">
                        Your continued use of the Service means you accept the
                        updated Terms.
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
                          href="mailto:support@myhomethreesixty.com"
                          className="underline underline-offset-2 text-black"
                        >
                          support@myhomethreesixty.com
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
export default TermsOfServicePageWrapper;
