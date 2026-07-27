"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
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
        localStorage.getItem("lqtm-audit-answers-v2") || "{}",
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
  const clauseGroups = useMemo(() => {
    const groups = new Map();
    visible.forEach((question) => {
      if (!groups.has(question.clause)) groups.set(question.clause, []);
      groups.get(question.clause).push(question);
    });
    return [...groups.entries()];
  }, [visible]);
  const answered = questions.filter((q) => q.answer !== "").length;
  const compliant = questions.filter((q) => q.answer === "yes").length;
  const noncompliant = questions.filter((q) => q.answer === "no").length;
  const applicable = compliant + noncompliant;
  const update = (id, answer) =>
    setQuestions((items) => {
      const updated = items.map((q) => (q.id === id ? { ...q, answer } : q));
      localStorage.setItem(
        "lqtm-audit-answers-v2",
        JSON.stringify(
          Object.fromEntries(updated.map((q) => [q.id, q.answer])),
        ),
      );
      return updated;
    });

  return (
    <Shell
      eyebrow="ISO 9001:2015 Standard"
      title="Laboratory Quality Audit"
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
          <strong>
            {applicable ? Math.round((compliant / applicable) * 100) : 0}%
          </strong>
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
      <div className="clause-list">
        {clauseGroups.map(([clause, items], groupIndex) => {
          const allClauseQuestions = questions.filter(
            (question) => question.clause === clause,
          );
          const yes = allClauseQuestions.filter(
            (question) => question.answer === "yes",
          ).length;
          const no = allClauseQuestions.filter(
            (question) => question.answer === "no",
          ).length;
          const na = allClauseQuestions.filter(
            (question) => question.answer === "na",
          ).length;
          const clauseApplicable = yes + no;
          const rate = clauseApplicable
            ? Math.round((yes / clauseApplicable) * 100)
            : 0;
          const majorClause = clause.split(".")[0];
          const previousMajorClause =
            groupIndex > 0 ? clauseGroups[groupIndex - 1][0].split(".")[0] : "";
          const majorClauseRates = [
            ...new Set(
              questions
                .filter((question) =>
                  question.clause.startsWith(`${majorClause}.`),
                )
                .map((question) => question.clause),
            ),
          ].map((childClause) => {
            const childQuestions = questions.filter(
              (question) => question.clause === childClause,
            );
            const childYes = childQuestions.filter(
              (question) => question.answer === "yes",
            ).length;
            const childNo = childQuestions.filter(
              (question) => question.answer === "no",
            ).length;
            return childYes + childNo
              ? Math.round((childYes / (childYes + childNo)) * 100)
              : 0;
          });
          const majorAverage = Math.round(
            majorClauseRates.reduce(
              (total, childRate) => total + childRate,
              0,
            ) / majorClauseRates.length,
          );
          return (
            <Fragment key={clause}>
              {majorClause !== previousMajorClause && (
                <header className="major-clause">
                  <div>
                    <span>Clause {majorClause}.0</span>
                    <h2>
                      {majorClause === "4"
                        ? "Context of the organization"
                        : "Leadership"}
                    </h2>
                  </div>
                  <div className="major-clause-score">
                    <strong>{majorAverage}%</strong>
                    <span>Average conformance</span>
                    <div>
                      <i style={{ width: `${majorAverage}%` }} />
                    </div>
                  </div>
                </header>
              )}
              <section className="clause-group">
                <header className="clause-summary">
                  <div>
                    <span className="eyebrow">Clause {clause}</span>
                    <h2>{items[0].section}</h2>
                    <p>
                      {yes} Yes · {no} No · {na} N/A · {clauseApplicable}{" "}
                      applicable
                    </p>
                  </div>
                  <div className="clause-score">
                    <strong>{rate}%</strong>
                    <span>Conformance</span>
                    <div className="clause-progress">
                      <i style={{ width: `${rate}%` }} />
                    </div>
                  </div>
                </header>
                <div className="question-list">
                  {items.map((q) => (
                    <article className={`question-card ${q.answer}`} key={q.id}>
                      <div className="question-number">
                        {String(
                          questions.findIndex(
                            (question) => question.id === q.id,
                          ) + 1,
                        ).padStart(2, "0")}
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
                          <span>
                            {q.evidence || "Add evidence or auditor note"}
                          </span>
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </Fragment>
          );
        })}
      </div>
    </Shell>
  );
}
