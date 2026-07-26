import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  FileWarning,
  FlaskConical,
  LayoutDashboard,
  Save,
  Search,
  Target,
} from "lucide-react";
import { questions as seed, capas } from "../app/data";
import "../app/globals.css";

const go = (path) => {
  history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

function Link({ to, className = "", children }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        go(to);
      }}
    >
      {children}
    </a>
  );
}

function Shell({ children, eyebrow, title, subtitle, actions }) {
  const path = location.pathname;
  return (
    <div className="site-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <FlaskConical size={22} />
          </span>
          <span>
            <strong>LQTM</strong>
            <small>Audit Hub</small>
          </span>
        </Link>
        <nav>
          <p className="nav-label">Workspace</p>
          <Link to="/" className={`nav-item ${path === "/" ? "active" : ""}`}>
            <ClipboardCheck size={18} />
            Audit
          </Link>
          <Link
            to="/dashboard"
            className={`nav-item ${path === "/dashboard" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            Analysis
          </Link>
          <Link
            to="/capa/2"
            className={`nav-item ${path.startsWith("/capa") ? "active" : ""}`}
          >
            <FileWarning size={18} />
            CAPA
          </Link>
        </nav>
        <div className="audit-card">
          <span className="live-dot" />
          <div>
            <strong>Internal audit</strong>
            <small>Draft · Jul 2026</small>
          </div>
        </div>
      </aside>
      <main>
        <header className="page-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="header-actions">{actions}</div>
        </header>
        {children}
      </main>
    </div>
  );
}

function Status({ status }) {
  return (
    <span
      className={`status-pill ${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      {status}
    </span>
  );
}

function Audit() {
  const [questions, setQuestions] = useState(seed),
    [filter, setFilter] = useState("all"),
    [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      questions.filter(
        (q) =>
          (filter === "all" || q.answer === filter) &&
          (q.question.toLowerCase().includes(query.toLowerCase()) ||
            q.clause.includes(query)),
      ),
    [questions, filter, query],
  );
  const compliant = questions.filter((q) => q.answer === "yes").length;
  return (
    <Shell
      eyebrow="ISO 9001:2015"
      title="Laboratory quality audit"
      subtitle="Assess each requirement, attach evidence, and open a CAPA when a response is nonconforming."
      actions={
        <>
          <button className="button ghost">
            <Save size={17} />
            Save draft
          </button>
          <Link to="/dashboard" className="button primary">
            Finish audit
            <ArrowRight size={17} />
          </Link>
        </>
      }
    >
      <section className="summary-strip">
        <div>
          <span>Questions</span>
          <strong>{questions.length}</strong>
        </div>
        <div>
          <span>Answered</span>
          <strong>
            {questions.length}/{questions.length}
          </strong>
        </div>
        <div>
          <span>Conforming</span>
          <strong>{Math.round((compliant / questions.length) * 100)}%</strong>
        </div>
        <div className="progress-cell">
          <span>Audit progress</span>
          <div className="progress-track">
            <i style={{ width: "100%" }} />
          </div>
        </div>
      </section>
      <section className="toolbar">
        <div className="search">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search question or clause"
          />
        </div>
        <div className="segmented">
          {["all", "yes", "no", "na"].map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={filter === x ? "selected" : ""}
            >
              {x === "all" ? "All" : x.toUpperCase()}
            </button>
          ))}
        </div>
      </section>
      <div className="question-list">
        {visible.map((q, i) => (
          <article className={`question-card ${q.answer}`} key={q.id}>
            <div className="question-number">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="question-body">
              <div className="question-meta">
                <span>Clause {q.clause}</span>
                <span>{q.section}</span>
              </div>
              <h2>{q.question}</h2>
              <div className="answer-row">
                <div className="answer-options">
                  {["yes", "no", "na"].map((a) => (
                    <button
                      key={a}
                      className={q.answer === a ? "active" : ""}
                      onClick={() =>
                        setQuestions((xs) =>
                          xs.map((x) =>
                            x.id === q.id ? { ...x, answer: a } : x,
                          ),
                        )
                      }
                    >
                      {a === "yes" && <Check size={16} />}{" "}
                      {a === "no" && <CircleAlert size={16} />}{" "}
                      {a.toUpperCase()}
                    </button>
                  ))}
                </div>
                {q.answer === "no" && (
                  <Link to={`/capa/${q.id}`} className="capa-link">
                    Open finding <ArrowRight size={15} />
                  </Link>
                )}
              </div>
              <button className="evidence">
                {q.evidence || "Add evidence or auditor note"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

function Dashboard() {
  const yes = seed.filter((q) => q.answer === "yes").length,
    no = seed.filter((q) => q.answer === "no").length,
    rate = Math.round((yes / (yes + no)) * 100);
  return (
    <Shell
      eyebrow="Overall analysis"
      title="Audit dashboard"
      subtitle="A decision-ready view of conformance, open findings, ownership, and CAPA progress."
      actions={
        <Link to="/" className="button primary">
          Continue audit
        </Link>
      }
    >
      <section className="metric-grid">
        <div className="metric-card accent">
          <span>Conformance rate</span>
          <strong>{rate}%</strong>
          <small>5 of 8 applicable controls</small>
          <Target size={24} />
        </div>
        <div className="metric-card">
          <span>Open findings</span>
          <strong>{no}</strong>
          <small>2 high · 1 medium</small>
          <AlertTriangle size={24} />
        </div>
        <div className="metric-card">
          <span>CAPA completion</span>
          <strong>26%</strong>
          <small>Average across open actions</small>
        </div>
        <div className="metric-card">
          <span>Evidence coverage</span>
          <strong>67%</strong>
          <small>6 of 9 questions supported</small>
          <CheckCircle2 size={24} />
        </div>
      </section>
      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Assessment</span>
              <h2>Response distribution</h2>
            </div>
          </div>
          <div className="donut-wrap">
            <div
              className="donut"
              style={{
                "--yes": `${(yes / 9) * 360}deg`,
                "--no": `${((yes + no) / 9) * 360}deg`,
              }}
            >
              <div>
                <strong>{rate}%</strong>
                <span>Conforming</span>
              </div>
            </div>
            <div className="legend">
              <div>
                <i className="yes-dot" />
                <span>Yes</span>
                <strong>5</strong>
              </div>
              <div>
                <i className="no-dot" />
                <span>No</span>
                <strong>3</strong>
              </div>
              <div>
                <i className="na-dot" />
                <span>N/A</span>
                <strong>1</strong>
              </div>
            </div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Clause health</span>
              <h2>Performance by section</h2>
            </div>
          </div>
          <div className="clause-bars">
            {[
              ["4.1 Context", 33, "critical"],
              ["4.2 Interested parties", 50, "warn"],
              ["4.3 Scope", 100, "good"],
              ["5 Leadership", 100, "good"],
              ["6 Planning", 0, "neutral"],
            ].map(([l, v, t]) => (
              <div key={l}>
                <div>
                  <span>{l}</span>
                  <strong>{v}%</strong>
                </div>
                <div className="bar">
                  <i className={t} style={{ width: `${Math.max(v, 3)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="panel findings-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Action required</span>
            <h2>Nonconformities & CAPA</h2>
          </div>
          <span className="muted">Click a row to investigate</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Finding</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Due</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(capas).map(([id, c]) => (
                <tr key={id}>
                  <td>
                    <Link to={`/capa/${id}`}>
                      <FileWarning size={17} />
                      <span>
                        <strong>{c.title}</strong>
                        <small>Question {id}</small>
                      </span>
                    </Link>
                  </td>
                  <td>
                    <span className={`priority ${c.priority.toLowerCase()}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td>{c.owner}</td>
                  <td>{c.due}</td>
                  <td>{c.progress}%</td>
                  <td>
                    <Status status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}

const fishCauses = [
  [
    "Method",
    "No controlled context-review method",
    "The procedure does not define criteria, frequency, or approval.",
  ],
  [
    "People",
    "Ownership is unclear",
    "No accountable role is assigned in the responsibility matrix.",
  ],
  [
    "Measurement",
    "No effectiveness criteria",
    "Success measures document production, not adequacy.",
  ],
  [
    "System",
    "Review is not workflow-driven",
    "Context review is absent from management-review inputs.",
  ],
  [
    "Environment",
    "Changes are not trigger events",
    "Regulatory, market, technology, and climate changes do not initiate review.",
  ],
  [
    "Records",
    "Evidence is not retained",
    "Version, approval, decisions, and actions are not consistently recorded.",
  ],
];
function Fishbone({ finding }) {
  const [active, setActive] = useState(0);
  return (
    <article className="fishbone-card">
      <div className="fishbone-heading">
        <div>
          <span className="eyebrow">Cause & effect analysis</span>
          <h2>Interactive fishbone · 6M</h2>
        </div>
        <span className="pulse-label">
          <i />
          Click a cause
        </span>
      </div>
      <div className="fishbone-stage">
        <div className="fish-spine" />
        <div className="fish-tail">
          <i />
          <i />
        </div>
        <div className="fish-head">
          <Activity size={19} />
          <span>Effect</span>
          <strong>QMS context gap</strong>
        </div>
        {fishCauses.map((c, i) => (
          <button
            key={c[0]}
            style={{ left: `${13 + i * 14.6}%`, "--delay": `${i * 0.12}s` }}
            onClick={() => setActive(i)}
            className={`fish-cause ${i % 2 ? "bottom" : "top"} ${active === i ? "active" : ""}`}
          >
            <span className="branch" />
            <i className="node" />
            <strong>{c[0]}</strong>
            <small>{c[1]}</small>
          </button>
        ))}
      </div>
      <div className="cause-detail" key={active}>
        <span className="cause-badge">{fishCauses[active][0]}</span>
        <div>
          <strong>{fishCauses[active][1]}</strong>
          <p>{fishCauses[active][2]}</p>
        </div>
        <ArrowRight size={20} />
      </div>
      <p className="fish-caption">
        <strong>Observed effect:</strong> {finding}
      </p>
    </article>
  );
}
function Capa({ id }) {
  const q = seed.find((x) => x.id === Number(id)) || seed[1],
    c = capas[id] || {
      ...capas[2],
      title: "Create corrective action plan",
      finding: `The response to “${q.question}” is No and requires investigation.`,
    };
  return (
    <Shell
      eyebrow={`Finding NC-${String(q.id).padStart(3, "0")}`}
      title={c.title}
      subtitle={`Clause ${q.clause} · ${q.section}`}
      actions={
        <Link to="/dashboard" className="button ghost">
          <ArrowLeft size={17} />
          Dashboard
        </Link>
      }
    >
      <section className="capa-hero">
        <div>
          <span className="priority high">{c.priority}</span>
          <Status status={c.status} />
        </div>
        <blockquote>
          <CircleAlert size={20} />
          <div>
            <span>Audit question</span>
            <p>{q.question}</p>
          </div>
          <strong>NO</strong>
        </blockquote>
      </section>
      <section className="capa-layout">
        <div className="capa-main">
          <article className="detail-card">
            <span className="section-icon">
              <FileWarning size={19} />
            </span>
            <div>
              <span className="eyebrow">Finding</span>
              <h2>Observed nonconformity</h2>
              <p>{c.finding}</p>
            </div>
          </article>
          <article className="detail-card danger">
            <span className="section-icon">
              <CircleAlert size={19} />
            </span>
            <div>
              <span className="eyebrow">Root cause</span>
              <h2>Systemic cause</h2>
              <p>{c.rootCause}</p>
            </div>
          </article>
          <Fishbone finding={c.finding} />
          <article className="detail-card">
            <span className="section-icon">
              <CheckCircle2 size={19} />
            </span>
            <div>
              <span className="eyebrow">Corrective action</span>
              <h2>Prevent recurrence</h2>
              <p>{c.correctiveAction}</p>
            </div>
          </article>
          <article className="smart-card">
            <span className="eyebrow">SMART objective</span>
            <h2>{c.objective}</h2>
            <div className="smart-tags">
              {[
                "Specific",
                "Measurable",
                "Achievable",
                "Relevant",
                "Time-bound",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </article>
        </div>
        <aside className="capa-sidebar">
          <div className="side-card">
            <span className="eyebrow">Execution</span>
            <h2>Action control</h2>
            <dl>
              <div>
                <dt>Responsible</dt>
                <dd>{c.owner}</dd>
              </div>
              <div>
                <dt>Monitoring</dt>
                <dd>{c.monitor}</dd>
              </div>
              <div>
                <dt>Due date</dt>
                <dd>{c.due}</dd>
              </div>
            </dl>
          </div>
          <div className="side-card">
            <span className="eyebrow">Progress</span>
            <h2>{c.progress}% complete</h2>
            <div className="large-progress">
              <i style={{ width: `${c.progress}%` }} />
            </div>
            <p className="muted">Dummy progress for prototype review.</p>
          </div>
        </aside>
      </section>
    </Shell>
  );
}
function App() {
  const [path, setPath] = useState(location.pathname);
  React.useEffect(() => {
    const h = () => setPath(location.pathname);
    addEventListener("popstate", h);
    return () => removeEventListener("popstate", h);
  }, []);
  if (path === "/dashboard") return <Dashboard />;
  if (path.startsWith("/capa/")) return <Capa id={path.split("/")[2]} />;
  return <Audit />;
}
createRoot(document.getElementById("root")).render(<App />);
