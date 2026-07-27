"use client";

import { useEffect, useState } from "react";
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
  const [auditQuestions, setAuditQuestions] = useState(questions);
  useEffect(() => {
    const loadAnswers = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("lqtm-audit-answers-v2") || "{}",
        );
        setAuditQuestions((items) =>
          items.map((question) => ({
            ...question,
            answer: saved[question.id] || question.answer,
          })),
        );
      } catch {
        // Keep the bundled dummy answers if local storage is unavailable.
      }
    };
    loadAnswers();
    window.addEventListener("storage", loadAnswers);
    return () => window.removeEventListener("storage", loadAnswers);
  }, []);
  const yes = auditQuestions.filter((q) => q.answer === "yes").length;
  const no = auditQuestions.filter((q) => q.answer === "no").length;
  const na = auditQuestions.filter((q) => q.answer === "na").length;
  const applicable = yes + no;
  const rate = applicable ? Math.round((yes / applicable) * 100) : 0;
  const evidenceCount = auditQuestions.filter(
    (question) => question.evidence,
  ).length;
  const evidenceRate = Math.round(
    (evidenceCount / auditQuestions.length) * 100,
  );
  const findings = auditQuestions
    .filter((question) => question.answer === "no")
    .map((question) => [
      String(question.id),
      capas[question.id] || {
        ...capas[2],
        title: `Corrective action for question ${question.id}`,
      },
    ]);
  const clauseScores = [
    ...new Set(auditQuestions.map((question) => question.clause)),
  ].map((clause) => {
    const items = auditQuestions.filter(
      (question) => question.clause === clause,
    );
    const clauseYes = items.filter(
      (question) => question.answer === "yes",
    ).length;
    const clauseNo = items.filter(
      (question) => question.answer === "no",
    ).length;
    const clauseApplicable = clauseYes + clauseNo;
    const clauseRate = clauseApplicable
      ? Math.round((clauseYes / clauseApplicable) * 100)
      : 0;
    return {
      label: `${clause} ${items[0].section}`,
      rate: clauseRate,
      tone: clauseRate >= 80 ? "good" : clauseRate >= 50 ? "warn" : "critical",
    };
  });
  const monthly = [
    ["Jan", 5],
    ["Feb", 7],
    ["Mar", 6],
    ["Apr", 9],
    ["May", 8],
    ["Jun", 11],
    ["Jul", 10],
    ["Aug", 12],
    ["Sep", 9],
    ["Oct", 13],
    ["Nov", 12],
    ["Dec", 15],
  ];
  const yearly = [
    ["2022", 61],
    ["2023", 68],
    ["2024", 72],
    ["2025", 78],
    ["2026", 83],
  ];
  return (
    <Shell
      eyebrow="Overall analysis"
      title="Audit dashboard"
      subtitle="A decision-ready view of conformance, open findings, ownership, and CAPA progress."
      actions={
        <Link className="button primary" href="/audit">
          Continue audit <ArrowUpRight size={17} />
        </Link>
      }
    >
      <section className="metric-grid">
        <div className="metric-card accent">
          <span>Conformance rate</span>
          <strong>{rate}%</strong>
          <small>
            {yes} of {applicable} applicable controls
          </small>
          <Target size={24} />
        </div>
        <div className="metric-card">
          <span>Open findings</span>
          <strong>{no}</strong>
          <small>{no} nonconforming audit responses</small>
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
          <strong>{evidenceRate}%</strong>
          <small>
            {evidenceCount} of {auditQuestions.length} questions supported
          </small>
          <CheckCircle2 size={24} />
        </div>
      </section>
      <section className="time-chart-grid">
        <article className="panel chart-card">
          <div className="chart-title">
            <div>
              <span className="eyebrow">Monthly activity</span>
              <h2>Audits completed by month</h2>
              <span className="muted">
                Number of completed audits · Jan–Dec 2026
              </span>
            </div>
            <span className="dummy-pill">Dummy data</span>
          </div>
          <div className="column-chart">
            {monthly.map(([label, value], index) => (
              <div
                className="chart-column"
                key={label}
                title={`${label}: ${value} audits`}
                style={{ "--delay": `${index * 0.04}s` }}
              >
                <span className="bar-value">{value}</span>
                <i style={{ height: `${Math.round((value / 15) * 100)}%` }} />
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p className="chart-note">
            <strong>Prototype insight:</strong> audit volume increases through
            the second half of the year.
          </p>
        </article>
        <article className="panel chart-card">
          <div className="chart-title">
            <div>
              <span className="eyebrow">Yearly performance</span>
              <h2>Annual conformance rate</h2>
              <span className="muted">
                Applicable controls rated conforming · 2022–2026
              </span>
            </div>
            <span className="dummy-pill">Dummy data</span>
          </div>
          <div className="column-chart">
            {yearly.map(([label, value], index) => (
              <div
                className="chart-column yearly-column"
                key={label}
                title={`${label}: ${value}% conformance`}
                style={{ "--delay": `${index * 0.06}s` }}
              >
                <span className="bar-value">{value}%</span>
                <i
                  className={index === yearly.length - 1 ? "current" : ""}
                  style={{ height: `${value}%` }}
                />
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p className="chart-note">
            <strong>Prototype insight:</strong> conformance improves from 61% to
            83% over five years.
          </p>
        </article>
      </section>
      <section className="dashboard-grid">
        <article className="panel score-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Assessment</span>
              <h2>Response distribution</h2>
            </div>
            <span className="muted">{auditQuestions.length} questions</span>
          </div>
          <div className="donut-wrap">
            <div
              className="donut"
              style={{
                "--yes": `${(yes / auditQuestions.length) * 360}deg`,
                "--no": `${((yes + no) / auditQuestions.length) * 360}deg`,
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
            {clauseScores.map(({ label, rate: clauseRate, tone }) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{clauseRate}%</strong>
                </div>
                <div className="bar">
                  <i
                    className={tone}
                    style={{ width: `${Math.max(clauseRate, 3)}%` }}
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
                          {
                            auditQuestions.find((q) => q.id === Number(id))
                              ?.clause
                          }
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
