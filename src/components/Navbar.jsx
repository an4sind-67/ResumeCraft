export default function Navbar({ path, navigate }) {
  const onHome = path === "/";
  return (
    <header className="navbar no-print">
      <a className="brand" href="#/" aria-label="ResumeCraft home">
        <span className="brand-mark">R</span> ResumeCraft
      </a>
      <nav>
        <button className={`nav-link ${onHome ? "active" : ""}`} onClick={() => navigate("/")}>
          My Resumes
        </button>
      </nav>
    </header>
  );
}
