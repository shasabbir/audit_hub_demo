"use client";

import { useState } from "react";
import { Activity, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const causes = [
  {
    id: "method",
    label: "Method",
    side: "top",
    pos: 17,
    tone: "emerald",
    cause: "No formal method is established",
    evidence:
      "There is no controlled method for identifying and documenting relevant internal and external QMS issues.",
    status: "Probable cause",
  },
  {
    id: "manpower",
    label: "Manpower",
    side: "top",
    pos: 43,
    tone: "blue",
    cause: "Review responsibility is unclear",
    evidence:
      "Responsibility for reviewing organizational context is not clearly assigned.",
    status: "Probable cause",
  },
  {
    id: "management",
    label: "Management",
    side: "top",
    pos: 69,
    tone: "violet",
    cause: "Changes are not reviewed as planned",
    evidence:
      "Management has not established planned intervals or change-triggered reviews for internal and external issues.",
    status: "Probable cause",
  },
  {
    id: "measurement",
    label: "Measurement",
    side: "bottom",
    pos: 22,
    tone: "cyan",
    cause: "No significant cause identified",
    evidence:
      "No measurement-related cause has been confirmed at this stage of the investigation.",
    status: "Not identified",
  },
  {
    id: "material",
    label: "Material",
    side: "bottom",
    pos: 48,
    tone: "orange",
    cause: "No significant cause identified",
    evidence:
      "No material or information-input cause has been confirmed at this stage.",
    status: "Not identified",
  },
  {
    id: "machine",
    label: "Machine",
    side: "bottom",
    pos: 74,
    tone: "green",
    cause: "No significant cause identified",
    evidence:
      "No equipment, software, or infrastructure cause has been confirmed at this stage.",
    status: "Not identified",
  },
];

export default function Fishbone({ finding }) {
  const [active, setActive] = useState(causes[0]);

  return (
    <article className="fishbone-card fishbone-v2">
      <div className="fishbone-heading">
        <div>
          <span className="eyebrow">Root cause analysis</span>
          <h2>Interactive 6M fishbone diagram</h2>
          <p>Explore each category to review probable and excluded causes.</p>
        </div>
        <span className="pulse-label">
          <Sparkles size={14} />
          Live analysis
        </span>
      </div>

      <div className="fishbone-stage">
        <div className="fishbone-grid" />
        <div className="fish-spine">
          <span className="spine-flow" />
        </div>
        <div className="fish-tail">
          <i />
          <i />
        </div>
        <div className="fish-head">
          <span className="effect-icon">
            <Activity size={20} />
          </span>
          <span>Effect</span>
          <strong>QMS context gap</strong>
        </div>

        {causes.map((cause, index) => (
          <button
            key={cause.id}
            style={{
              left: `${cause.pos}%`,
              "--delay": `${index * 0.13}s`,
            }}
            onClick={() => setActive(cause)}
            className={`fish-cause ${cause.side} ${cause.tone} ${
              active.id === cause.id ? "active" : ""
            }`}
          >
            <span className="branch" />
            <i className="node" />
            <span className="cause-label">
              <b>M</b>
              <strong>{cause.label}</strong>
            </span>
            <small>
              <ArrowRight size={13} />
              {cause.cause}
            </small>
          </button>
        ))}
      </div>

      <div className={`cause-detail ${active.tone}`} key={active.id}>
        <span className="cause-badge">M</span>
        <div>
          <span className="detail-meta">
            {active.label} · {active.status}
          </span>
          <strong>{active.cause}</strong>
          <p>{active.evidence}</p>
        </div>
        <CheckCircle2 size={22} />
      </div>

      <p className="fish-caption">
        <strong>Observed effect:</strong> {finding}
      </p>
    </article>
  );
}
