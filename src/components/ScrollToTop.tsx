import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // On route change, scroll to top
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }

    // Handle hash scrolling for same-page navigation
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};
