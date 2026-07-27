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
  const smartObjectives = {
    2: {
      objective: "Strategic Alignment of Internal and External Issues",
      target: "100% of documented issues",
      timeline: "Dec 2026",
      status: "Planned",
    },
    3: {
      objective: "Periodic Review of Internal and External Issues",
      target: "1 Review System",
      timeline: "Dec 2026",
      status: "Planned",
    },
    5: {
      objective: "Review of Interested-Party Requirements",
      target: "100% of applicable requirements",
      timeline: "Nov 2026",
      status: "In progress",
    },
  };
  const smart = smartObjectives[q.id] || {
    objective: c.title,
    target: "1 Corrective Action Plan",
    timeline: c.due,
    status: "Planned",
  };
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
            <h2>Action and accountability plan</h2>
            <div className="smart-table-wrap">
              <table className="smart-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Objectives</th>
                    <th>Target</th>
                    <th>Timeline</th>
                    <th>Action Plan</th>
                    <th>Person Responsible</th>
                    <th>Person Monitoring</th>
                    <th>Achievement / Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{String(q.id).padStart(2, "0")}</th>
                    <td>{smart.objective}</td>
                    <td>{smart.target}</td>
                    <td>{smart.timeline}</td>
                    <td>{c.correctiveAction}</td>
                    <td>{c.owner}</td>
                    <td>{c.monitor}</td>
                    <td>
                      <span className="smart-status">{smart.status}</span>
                    </td>
                  </tr>
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
