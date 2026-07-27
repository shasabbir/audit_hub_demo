"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Save,
  Search,
} from "lucide-react";
import { Shell } from "../components";
import { questions as seed } from "../data";

export default function AuditPage() {
  const [questions, setQuestions] = useState(seed);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("lqtm-audit-answers") || "{}",
      );
      setQuestions((items) =>
        items.map((question) => ({
          ...question,
          answer: saved[question.id] || question.answer,
        })),
      );
    } catch {
      // Keep the bundled dummy answers if local storage is unavailable.
    }
  }, []);
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
  const answered = questions.filter((q) => q.answer !== "").length;
  const compliant = questions.filter((q) => q.answer === "yes").length;
  const update = (id, answer) =>
    setQuestions((items) => {
      const updated = items.map((q) => (q.id === id ? { ...q, answer } : q));
      localStorage.setItem(
        "lqtm-audit-answers",
        JSON.stringify(
          Object.fromEntries(updated.map((q) => [q.id, q.answer])),
        ),
      );
      return updated;
    });

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
          <Link href="/" className="button primary">
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
            {answered}/{questions.length}
          </strong>
        </div>
        <div>
          <span>Conforming</span>
          <strong>{Math.round((compliant / questions.length) * 100)}%</strong>
        </div>
        <div className="progress-cell">
          <span>Audit progress</span>
          <div className="progress-track">
            <i style={{ width: `${(answered / questions.length) * 100}%` }} />
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
        {visible.map((q, index) => (
          <article className={`question-card ${q.answer}`} key={q.id}>
            <div className="question-number">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="question-body">
              <div className="question-meta">
                <span>Clause {q.clause}</span>
                <span>{q.section}</span>
              </div>
              <h2>{q.question}</h2>
              <div className="answer-row">
                <div className="answer-options">
                  {["yes", "no", "na"].map((answer) => (
                    <button
                      key={answer}
                      onClick={() => update(q.id, answer)}
                      className={q.answer === answer ? "active" : ""}
                    >
                      {answer === "yes" && <Check size={16} />}{" "}
                      {answer === "no" && <CircleAlert size={16} />}{" "}
                      {answer.toUpperCase()}
                    </button>
                  ))}
                </div>
                {q.answer === "no" && (
                  <Link className="capa-link" href={`/capa/${q.id}`}>
                    Open finding <ArrowRight size={15} />
                  </Link>
                )}
              </div>
              <button className="evidence">
                <span>{q.evidence || "Add evidence or auditor note"}</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}
