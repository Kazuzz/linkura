import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Home from "./pages/Home";
import Sticker from "./pages/Sticker";
import "./App.css";

function App() {
  const location = useLocation();
  const nodeRef = useRef(null); // 🔹 This replaces findDOMNode

  return (
    <>
      <nav className="header">
        <Link to="/" className={`tab ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link to="/sticker" className={`tab ${location.pathname === "/sticker" ? "active" : ""}`}>Sticker</Link>
      </nav>

      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
          nodeRef={nodeRef} // 🔹 Avoid findDOMNode
        >
          <div ref={nodeRef}>
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