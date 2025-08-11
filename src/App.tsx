import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useRef, useState, useEffect } from "react";
import Home from "./pages/Home";
import Sticker from "./pages/Sticker";
import "./App.css";

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // Keep track of previous path to decide animation direction
  const prevPathRef = useRef(location.pathname);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const order = ["/", "/sticker"];

    const currentIndex = order.indexOf(location.pathname);
    const prevIndex = order.indexOf(prevPath);

    if (currentIndex !== -1 && prevIndex !== -1) {
      if (currentIndex > prevIndex) {
        setDirection("right");
      } else if (currentIndex < prevIndex) {
        setDirection("left");
      }
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // A ref per page to avoid animation conflicts
  const nodeRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "/": useRef<HTMLDivElement | null>(null),
    "/sticker": useRef<HTMLDivElement | null>(null),
  };

  return (
    <>
      {/* Fixed header navigation */}
      <nav className="header">
        <Link
          to="/"
          className={`tab ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/sticker"
          className={`tab ${
            location.pathname === "/sticker" ? "active" : ""
          }`}
        >
          Sticker
        </Link>
      </nav>

      <ScrollToTop />

      {/* Transition wrapper */}
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames={`slide-${direction}`}
          timeout={300}
          nodeRef={nodeRefs[location.pathname] || nodeRefs["/"]}
          unmountOnExit
        >
          <div ref={nodeRefs[location.pathname] || nodeRefs["/"]}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/sticker" element={<Sticker />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;