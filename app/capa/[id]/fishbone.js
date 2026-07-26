"use client";

import { useState } from "react";
import { Activity, ChevronRight } from "lucide-react";

const causes = [
  {
    id: "method",
    label: "Method",
    side: "top",
    pos: 13,
    cause: "No controlled context-review method",
    evidence:
      "The QMS procedure does not define review criteria, frequency, or approval.",
  },
  {
    id: "people",
    label: "People",
    side: "bottom",
    pos: 28,
    cause: "Ownership is unclear",
    evidence: "No accountable role is assigned in the responsibility matrix.",
  },
  {
    id: "measurement",
    label: "Measurement",
    side: "top",
    pos: 43,
    cause: "No effectiveness criteria",
    evidence:
      "Completion is measured as one document, not adequacy or sustained performance.",
  },
  {
    id: "system",
    label: "System",
    side: "bottom",
    pos: 58,
    cause: "Review is not workflow-driven",
    evidence:
      "Context review is absent from management-review inputs and reminders.",
  },
  {
    id: "environment",
    label: "Environment",
    side: "top",
    pos: 73,
    cause: "Changes are not trigger events",
    evidence:
      "Regulatory, market, technology, and climate changes do not initiate review.",
  },
  {
    id: "records",
    label: "Records",
    side: "bottom",
    pos: 86,
    cause: "Evidence is not retained",
    evidence:
      "Version, approval, decisions, and follow-up actions are not consistently recorded.",
  },
];

export default function Fishbone({ finding }) {
  const [active, setActive] = useState(causes[0]);
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
        {causes.map((c, i) => (
          <button
            key={c.id}
            style={{ left: `${c.pos}%`, "--delay": `${i * 0.12}s` }}
            onClick={() => setActive(c)}
            className={`fish-cause ${c.side} ${active.id === c.id ? "active" : ""}`}
          >
            <span className="branch" />
            <i className="node" />
            <strong>{c.label}</strong>
            <small>{c.cause}</small>
          </button>
        ))}
      </div>
      <div className="cause-detail" key={active.id}>
        <span className="cause-badge">{active.label}</span>
        <div>
          <strong>{active.cause}</strong>
          <p>{active.evidence}</p>
        </div>
        <ChevronRight size={20} />
      </div>
      <p className="fish-caption">
        <strong>Observed effect:</strong> {finding}
      </p>
    </article>
  );
}
