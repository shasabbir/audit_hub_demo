import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileWarning,
  Target,
} from "lucide-react";
import { Shell, StatusPill } from "../components";
import { capas, questions } from "../data";

export default function Dashboard() {
  const yes = questions.filter((q) => q.answer === "yes").length;
  const no = questions.filter((q) => q.answer === "no").length;
  const na = questions.filter((q) => q.answer === "na").length;
  const rate = Math.round((yes / (yes + no)) * 100);
  const findings = Object.entries(capas);
  return (
    <Shell
      eyebrow="Overall analysis"
      title="Audit dashboard"
      subtitle="A decision-ready view of conformance, open findings, ownership, and CAPA progress."
      actions={
        <Link className="button primary" href="/">
          Continue audit <ArrowUpRight size={17} />
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
          <Clock3 size={24} />
        </div>
        <div className="metric-card">
          <span>Evidence coverage</span>
          <strong>67%</strong>
          <small>6 of 9 questions supported</small>
          <CheckCircle2 size={24} />
        </div>
      </section>
      <section className="dashboard-grid">
        <article className="panel score-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Assessment</span>
              <h2>Response distribution</h2>
            </div>
            <span className="muted">9 questions</span>
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
                <strong>{yes}</strong>
              </div>
              <div>
                <i className="no-dot" />
                <span>No</span>
                <strong>{no}</strong>
              </div>
              <div>
                <i className="na-dot" />
                <span>N/A</span>
                <strong>{na}</strong>
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
            ].map(([label, val, tone]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{val}%</strong>
                </div>
                <div className="bar">
                  <i
                    className={tone}
                    style={{ width: `${Math.max(val, 3)}%` }}
                  />
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
                <th>Due date</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {findings.map(([id, c]) => (
                <tr key={id}>
                  <td>
                    <Link href={`/capa/${id}`}>
                      <FileWarning size={17} />
                      <span>
                        <strong>{c.title}</strong>
                        <small>
                          Question {id} · Clause{" "}
                          {questions.find((q) => q.id === Number(id))?.clause}
                        </small>
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
                  <td>
                    <div className="mini-progress">
                      <i style={{ width: `${c.progress}%` }} />
                    </div>
                    <small>{c.progress}%</small>
                  </td>
                  <td>
                    <StatusPill status={c.status} />
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
