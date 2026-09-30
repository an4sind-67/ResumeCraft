import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Builder from "./pages/Builder.jsx";
import Preview from "./pages/Preview.jsx";
import useHashRoute from "./hooks/useHashRoute.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { sampleResume } from "./utils/sampleData.js";

export default function App() {
  const { path, navigate } = useHashRoute();
  const [resumes, setResumes] = useLocalStorage("resumecraft.resumes", [sampleResume()]);

  const [, view, id] = path.split("/");
  const current = resumes.find((r) => r.id === id);

  // patch one resume and stamp the edit time
  const update = (patch) =>
    setResumes((list) => list.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: Date.now() } : r)));

  useEffect(() => {
    document.title = current && view ? `${current.title} - ResumeCraft` : "ResumeCraft";
  }, [current, view]);

  let page;
  if (view === "builder" && current) page = <Builder resume={current} onUpdate={update} navigate={navigate} />;
  else if (view === "preview" && current) page = <Preview resume={current} onUpdate={update} navigate={navigate} />;
  else if (!view) page = <Dashboard resumes={resumes} setResumes={setResumes} navigate={navigate} />;
  else
    page = (
      <main className="page"><p className="empty">That resume was not found.</p>
        <p className="center"><button className="btn primary" onClick={() => navigate("/")}>Go to My Resumes</button></p></main>
    );

  return (
    <>
      <Navbar path={path} navigate={navigate} />
      {page}
    </>
  );
}
