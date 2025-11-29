import { useEffect } from "react";

export default function BootstrapSection({ children }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL(
      "bootstrap/dist/css/bootstrap.min.css",
      import.meta.url
    ).href;
    // "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css";

    // "bootstrap/dist/css/bootstrap.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <div>{children}</div>;
}
