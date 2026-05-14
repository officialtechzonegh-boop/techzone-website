import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { testBrevoEmail } from "./lib/test-email";

// Make test function available globally for debugging
if (import.meta.env.DEV) {
  (window as any).testBrevoEmail = testBrevoEmail;
  console.log("🔧 Dev Mode: Email test utility available. Run testBrevoEmail() in console");
}

createRoot(document.getElementById("root")!).render(<App />);
