import { useEffect, useState, useRef } from "react";

export default function ScrollProgressBar() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = (scrollTop / docHeight) * 100;

      targetRef.current = percent;
      setVisible(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      progressRef.current += (targetRef.current - progressRef.current) * 0.08;

      if (barRef.current) {
        barRef.current.style.width = `${progressRef.current}%`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed left-0 h-[3px] w-full bg-[#c6eaff] z-40 transition-opacity duration-500"
        style={{
          top: "86px",
          opacity: visible ? 1 : 0,
        }}
      />

      <div
        ref={barRef}
        className="
          fixed left-0 h-[3px] z-50
          transition-all duration-200 
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
        style={{
          top: "86px",
          backgroundColor: "#1CBCCF",
          opacity: visible ? 1 : 0,
          width: "0%",
        }}
      />
    </>
  );
}
