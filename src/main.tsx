import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force redirect to homepage on every page load/refresh BEFORE React renders
// This runs synchronously before the app mounts
const currentPath = window.location.pathname;
const currentHash = window.location.hash;

// Always redirect to homepage if not already there
if (currentPath !== "/" || currentHash) {
  // Use replaceState to change URL without reload
  window.history.replaceState(null, "", "/");
}

// Scroll to top on fresh page load
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);
