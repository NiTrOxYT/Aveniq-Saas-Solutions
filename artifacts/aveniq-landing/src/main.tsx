import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
if (!window.location.hash) {
  const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  resetScroll();
  window.addEventListener("pageshow", resetScroll, { once: true });
}

createRoot(document.getElementById("root")!).render(<App />);
