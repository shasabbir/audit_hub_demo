export const questions = [
  {
    id: 1,
    clause: "4.1",
    section: "Organizational context",
    question:
      "Has the organization identified relevant internal and external issues affecting the QMS?",
    answer: "yes",
    evidence: "Context register QMS-CTX-01",
  },
  {
    id: 2,
    clause: "4.1",
    section: "Organizational context",
    question:
      "Are the identified issues relevant to the organization’s purpose and strategic direction?",
    answer: "no",
    evidence: "",
  },
  {
    id: 3,
    clause: "4.1",
    section: "Organizational context",
    question:
      "Are the identified internal and external issues periodically monitored and reviewed?",
    answer: "no",
    evidence: "",
  },
  {
    id: 4,
    clause: "4.2",
    section: "Interested parties",
    question:
      "Has the organization identified relevant interested parties and their applicable QMS requirements?",
    answer: "yes",
    evidence: "Interested parties register, rev. 03",
  },
  {
    id: 5,
    clause: "4.2",
    section: "Interested parties",
    question:
      "Are interested parties and their relevant requirements regularly monitored and reviewed?",
    answer: "no",
    evidence: "",
  },
  {
    id: 6,
    clause: "4.3",
    section: "Scope of the QMS",
    question:
      "Has the organization clearly defined the boundaries and applicability of the QMS?",
    answer: "yes",
    evidence: "Quality manual, section 1.2",
  },
  {
    id: 7,
    clause: "5.1",
    section: "Leadership",
    question:
      "Does top management take responsibility for the effectiveness of the QMS?",
    answer: "yes",
    evidence: "Management review minutes",
  },
  {
    id: 8,
    clause: "5.2",
    section: "Quality policy",
    question:
      "Is the quality policy documented, communicated, and understood by employees?",
    answer: "yes",
    evidence: "Training matrix and signed policy",
  },
  {
    id: 9,
    clause: "6.1",
    section: "Risks and opportunities",
    question: "Is the effectiveness of actions taken regularly evaluated?",
    answer: "na",
    evidence: "New process; first review due Q4",
  },
];

export const capas = {
  2: {
    title: "Align QMS context with organizational direction",
    finding:
      "Identified issues are not consistently linked to the laboratory’s purpose, strategy, or service priorities.",
    rootCause:
      "The context-review process does not define criteria for evaluating strategic relevance or require leadership approval.",
    correction:
      "Review the current context register and map each issue to an organizational objective, risk, or strategic priority.",
    correctiveAction:
      "Revise the context-review procedure to require strategic-relevance criteria, leadership review, approval evidence, and retained records.",
    objective:
      "By 15 December 2026, review 100% of documented internal and external issues against approved strategic-relevance criteria and obtain Director approval.",
    owner: "Quality Manager",
    monitor: "Director",
    due: "15 Dec 2026",
    progress: 22,
    priority: "High",
    status: "Open",
  },
  3: {
    title: "Establish periodic context review",
    finding:
      "Internal and external issues are not monitored and reviewed at defined intervals.",
    rootCause:
      "No owner, review frequency, change trigger, or required management-review input is defined in the QMS procedure.",
    correction: "Review and update the current internal and external issues.",
    correctiveAction:
      "Establish an annual review schedule plus event-triggered reviews, assign ownership, and add context review to management-review inputs.",
    objective:
      "By 15 December 2026, approve a context-review calendar and complete one documented review with 100% of required fields and actions assigned.",
    owner: "Quality Manager",
    monitor: "Director",
    due: "15 Dec 2026",
    progress: 10,
    priority: "High",
    status: "Open",
  },
  5: {
    title: "Monitor interested-party requirements",
    finding:
      "Relevant interested-party requirements are recorded but not routinely reviewed.",
    rootCause:
      "The interested-parties register has no review owner, review frequency, or change-notification trigger.",
    correction:
      "Validate the current interested-party register and update obsolete requirements.",
    correctiveAction:
      "Assign process owners and integrate the register into the quarterly compliance review.",
    objective:
      "By 30 November 2026, verify all active interested parties and document review evidence for 100% of applicable requirements.",
    owner: "Compliance Lead",
    monitor: "Quality Manager",
    due: "30 Nov 2026",
    progress: 45,
    priority: "Medium",
    status: "In progress",
  },
};
