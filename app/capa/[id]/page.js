import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  UserRound,
} from "lucide-react";
import { Shell, StatusPill } from "../../components";
import { capas, questions } from "../../data";
import Fishbone from "./fishbone";

export default async function CapaPage({ params }) {
  const { id } = await params;
  const q = questions.find((x) => x.id === Number(id)) || questions[1];
  const c = capas[id] || {
    ...capas[2],
    title: "Create corrective action plan",
    finding: `The audit response to “${q.question}” is No and requires documented investigation.`,
  };
  const smartRows = [
    { criterion: "Specific", detail: c.correctiveAction },
    { criterion: "Measurable", detail: c.objective },
    {
      criterion: "Achievable",
      detail: `${c.owner} owns the action, with progress monitored by ${c.monitor}.`,
    },
    {
      criterion: "Relevant",
      detail: `Directly addresses the identified nonconformity: ${c.finding}`,
    },
    {
      criterion: "Time-bound",
      detail: `Complete the objective and retain approval evidence by ${c.due}.`,
    },
  ];
  return (
    <Shell
      eyebrow={`Finding NC-${String(q.id).padStart(3, "0")}`}
      title={c.title}
      subtitle={`Clause ${q.clause} · ${q.section}`}
      actions={
        <>
          <Link href="/dashboard" className="button ghost">
            <ArrowLeft size={17} />
            Dashboard
          </Link>
          <button className="button primary">
            <CheckCircle2 size={17} />
            Update CAPA
          </button>
        </>
      }
    >
      <section className="capa-hero">
        <div>
          <span className="priority high">{c.priority}</span>
          <StatusPill status={c.status} />
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
              <ClipboardList size={19} />
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
              <span className="eyebrow">Immediate correction</span>
              <h2>Contain the current gap</h2>
              <p>{c.correction}</p>
            </div>
          </article>
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
            <h2>Objective breakdown</h2>
            <div className="smart-table-wrap">
              <table className="smart-table">
                <thead>
                  <tr>
                    <th>SMART criterion</th>
                    <th>Objective detail</th>
                  </tr>
                </thead>
                <tbody>
                  {smartRows.map((row) => (
                    <tr key={row.criterion}>
                      <th scope="row">{row.criterion}</th>
                      <td>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
        <aside className="capa-sidebar">
          <div className="side-card">
            <span className="eyebrow">Execution</span>
            <h2>Action control</h2>
            <dl>
              <div>
                <dt>
                  <UserRound size={16} />
                  Responsible
                </dt>
                <dd>{c.owner}</dd>
              </div>
              <div>
                <dt>
                  <UserRound size={16} />
                  Monitoring
                </dt>
                <dd>{c.monitor}</dd>
              </div>
              <div>
                <dt>
                  <CalendarDays size={16} />
                  Due date
                </dt>
                <dd>{c.due}</dd>
              </div>
            </dl>
          </div>
          <div className="side-card">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Progress</span>
                <h2>{c.progress}% complete</h2>
              </div>
            </div>
            <div className="large-progress">
              <i style={{ width: `${c.progress}%` }} />
            </div>
            <p className="muted">Dummy progress for prototype review.</p>
          </div>
          <div className="side-card next-step">
            <span className="eyebrow">Next milestone</span>
            <h2>Approve review criteria</h2>
            <p>Quality Manager · 30 Sep 2026</p>
          </div>
        </aside>
      </section>
    </Shell>
  );
}
