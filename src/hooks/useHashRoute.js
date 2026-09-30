import { useCallback, useEffect, useState } from "react";

const readHash = () => window.location.hash.replace(/^#/, "") || "/";

// Tiny hash-based router: "#/", "#/builder/<id>", "#/preview/<id>"
export default function useHashRoute() {
  const [path, setPath] = useState(readHash);

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
  }, []);

  return { path, navigate };
}
