import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // This hook listens to the URL
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the pathname changes, scroll to the top instantly
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything visually
};

export default ScrollToTop;
