const findings = {
  2: [
    "Align QMS context with organizational direction",
    "Identified issues are not consistently linked to the laboratory’s purpose, strategy, or service priorities.",
    "The context-review process does not define strategic-relevance criteria or require leadership approval.",
  ],
  3: [
    "Establish periodic context review",
    "Internal and external issues are not monitored at defined intervals.",
    "No owner, review frequency, change trigger, or management-review input is defined.",
  ],
  5: [
    "Monitor interested-party requirements",
    "Interested-party requirements are recorded but not routinely reviewed.",
    "The register has no review owner, frequency, or change-notification trigger.",
  ],
};
const questions = [
  [
    1,
    "4.1",
    "Has the organization identified relevant internal and external issues affecting the QMS?",
    "yes",
  ],
  [
    2,
    "4.1",
    "Are the identified issues relevant to the organization’s purpose and strategic direction?",
    "no",
  ],
  [
    3,
    "4.1",
    "Are the identified internal and external issues periodically monitored and reviewed?",
    "no",
  ],
  [
    4,
    "4.2",
    "Has the organization identified relevant interested parties and their requirements?",
    "yes",
  ],
  [
    5,
    "4.2",
    "Are interested parties and their requirements regularly monitored and reviewed?",
    "no",
  ],
  [
    6,
    "4.3",
    "Has the organization clearly defined the boundaries and applicability of the QMS?",
    "yes",
  ],
  [
    7,
    "5.1",
    "Does top management take responsibility for the effectiveness of the QMS?",
    "yes",
  ],
  [
    8,
    "5.2",
    "Is the quality policy documented, communicated, and understood?",
    "yes",
  ],
  [
    9,
    "6.1",
    "Is the effectiveness of actions taken regularly evaluated?",
    "na",
  ],
];
const style = `*{box-sizing:border-box}body{margin:0;background:#f5f7f4;color:#13231d;font:14px Arial}a{text-decoration:none;color:inherit}.shell{display:grid;grid-template-columns:230px 1fr;min-height:100vh}.side{position:fixed;inset:0 auto 0 0;width:230px;height:100vh;background:#102b24;color:#fff;padding:26px 18px;display:flex;flex-direction:column}.brand{font-size:19px;font-weight:800;margin:0 8px 35px}.brand i{display:inline-grid;place-items:center;width:38px;height:38px;background:#d9f46b;color:#17382f;border-radius:12px;margin-right:10px}.nav small{display:block;color:#789289;text-transform:uppercase;letter-spacing:.14em;margin:20px 12px 8px}.nav a{display:block;padding:13px 14px;color:#bcd0c9;border-radius:10px;margin:4px 0;font-weight:700}.nav a.on,.nav a:hover{background:#21443a;color:#fff}.foot{margin-top:auto;background:#173a30;border:1px solid #2d5147;border-radius:13px;padding:14px;color:#a9bdb6}.main{grid-column:2;padding:38px 4vw 70px;max-width:1450px;width:100%}.head{display:flex;justify-content:space-between;align-items:end;margin-bottom:26px}.kicker{font-size:10px;color:#0b7251;text-transform:uppercase;letter-spacing:.14em;font-weight:800}h1{font-size:34px;margin:5px 0 7px}h2{margin:4px 0 10px;font-size:18px}.muted,.head p,.card p{color:#6d7b75;line-height:1.6}.summary,.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.summary,.metric,.panel,.card,.sidecard{background:#fff;border:1px solid #e2e8e4;border-radius:15px;padding:20px}.summary span,.metric span{display:block;color:#6d7b75;font-size:11px}.summary strong,.metric strong{font-size:25px;display:block;margin-top:6px}.toolbar{display:flex;justify-content:space-between;margin:20px 0}.search{padding:11px 15px;border:1px solid #dfe6e2;border-radius:10px;background:#fff;min-width:300px}.filters button,.answers button{border:1px solid #dfe6e2;padding:8px 12px;background:#fff;font-weight:800}.filters .on{background:#0b7251;color:#fff}.qlist{display:grid;gap:11px}.q{background:#fff;border:1px solid #e2e8e4;border-radius:14px;padding:20px;display:grid;grid-template-columns:45px 1fr}.q.no{border-color:#eaa9a4;box-shadow:inset 4px 0 #c53a35}.num{color:#93a19b;font-weight:800}.meta{font-size:10px;color:#0b7251;text-transform:uppercase;font-weight:800}.q h2{font-size:15px;margin:7px 0 15px}.answers{display:flex;gap:7px}.answers button{border-radius:8px;font-size:11px}.q.yes .yes,.q.na .na{background:#e7f4ee;color:#0b7251}.q.no .no{background:#fff0ee;color:#c53a35}.open{margin-left:auto;background:#fff0ee;color:#c53a35;padding:8px 12px;border-radius:8px;font-size:11px;font-weight:800}.metric:first-child{background:#102b24;color:#fff}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0}.bars>div{margin:18px 0}.bars label{display:flex;justify-content:space-between}.bar{height:8px;background:#edf0ee;border-radius:9px;margin-top:7px}.bar i{display:block;height:100%;background:#0b7251}.bar .red{background:#c53a35}.bar .amber{background:#bb7517}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px;border-top:1px solid #e2e8e4}th{font-size:10px;color:#75827c;text-transform:uppercase}.redlink{color:#c53a35;font-weight:800}.pill{padding:5px 9px;border-radius:20px;background:#fff0ee;color:#c53a35;font-size:10px;font-weight:800}.hero{background:#102b24;color:#fff;border-radius:16px;padding:23px;margin-bottom:14px}.hero blockquote{margin:15px 0 0;display:flex;justify-content:space-between}.hero b{color:#ff9790}.cgrid{display:grid;grid-template-columns:1.8fr .7fr;gap:14px}.stack{display:grid;gap:12px}.danger{border-left:4px solid #c53a35}.smart{background:#e9f5ef;border-color:#bedccd}.sidecard{margin-bottom:12px}.progress{height:9px;background:#e7ece9;border-radius:8px}.progress i{display:block;height:100%;background:#0b7251;border-radius:8px}.fish{overflow:hidden;border-color:#efcbc7}.fishhead{display:flex;justify-content:space-between}.fishstage{height:315px;position:relative}.spine{position:absolute;left:5%;right:16%;top:50%;height:3px;background:#c53a35;animation:draw .8s}.spine:after{content:"";position:absolute;right:-10px;top:-5px;border-left:12px solid #c53a35;border-top:6px solid transparent;border-bottom:6px solid transparent}.effect{position:absolute;right:0;top:50%;transform:translateY(-50%);background:#c53a35;color:#fff;width:125px;height:82px;border-radius:50% 15px 15px 50%;display:grid;place-content:center;text-align:center;animation:pop .6s}.cause{position:absolute;top:50%;width:120px;height:130px;border:0;background:none;cursor:pointer;opacity:0;animation:fade .4s var(--d) forwards}.cause.top{transform:translate(-50%,-100%)}.cause.bottom{transform:translate(-50%,0)}.cause:before{content:"";position:absolute;left:50%;width:2px;height:75px;background:#df8d88}.cause.top:before{bottom:0;transform:rotate(-34deg)}.cause.bottom:before{top:0;transform:rotate(34deg)}.cause b,.cause small{display:block;position:absolute;text-align:left;color:#c53a35}.cause small{color:#65736d;font-size:9px}.cause.top b{top:15px}.cause.top small{top:35px}.cause.bottom b{bottom:43px}.cause.bottom small{bottom:5px}.cause.active b{background:#c53a35;color:#fff;padding:4px;border-radius:5px}.detail{background:#fff0ee;border:1px solid #efc0bb;border-radius:10px;padding:13px;animation:fade .3s}.detail b{color:#c53a35}@keyframes draw{from{transform:scaleX(0)}}@keyframes pop{from{opacity:0;transform:translate(20px,-50%) scale(.8)}}@keyframes fade{to{opacity:1}}@media(max-width:800px){.shell{display:block}.side{position:static;width:auto;height:auto}.foot{display:none}.nav a{display:inline-block}.main{padding:24px 15px}.summary,.metrics,.grid,.cgrid{grid-template-columns:1fr}.fishstage{height:auto;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:15px 0}.spine,.effect{display:none}.cause,.cause.top,.cause.bottom{position:static;transform:none;width:auto;height:80px;border:1px solid #efcbc7;background:#fff7f6;border-radius:9px;padding:10px;text-align:left}.cause:before{display:none}.cause b,.cause small,.cause.top b,.cause.top small,.cause.bottom b,.cause.bottom small{position:static}.toolbar{display:block}.search{width:100%;margin-bottom:10px}}`;
const fishStyle = `.fish{--bone:#102f63;position:relative;border-color:#d9e2ef;border-radius:20px;background:radial-gradient(circle at 85% 16%,#dfeeff 0,transparent 24%),radial-gradient(circle at 9% 92%,#e6f7ef 0,transparent 27%),#fff;box-shadow:0 20px 50px rgb(17 47 81/9%)}.fishhead h2{color:#102f63}.fishhead p{margin:5px 0;color:#738193;font-size:11px}.live{height:max-content;padding:7px 11px;border:1px solid #b9ddcf;border-radius:999px;background:#e7f6ef;color:#0b7251;font-size:10px;animation:live 2.6s infinite}.fishstage{height:390px;background-image:linear-gradient(#d9e3ef55 1px,transparent 1px),linear-gradient(90deg,#d9e3ef55 1px,transparent 1px);background-size:28px 28px}.spine{left:5%;right:17%;height:5px;border-radius:9px;background:linear-gradient(90deg,#163970,#0c2e62);box-shadow:0 4px 14px rgb(16 47 99/22%);overflow:visible}.spine:after{right:-16px;top:-8px;border-left:18px solid #0c2e62;border-top-width:10px;border-bottom-width:10px}.flow{position:absolute;top:-2px;width:90px;height:9px;border-radius:9px;background:linear-gradient(90deg,transparent,#61b5ff,transparent);animation:flow 3.2s infinite}.tail{position:absolute;left:0;top:calc(50% - 46px);width:65px;height:92px;background:linear-gradient(135deg,#14376c,#071e46);clip-path:polygon(0 0,100% 50%,0 100%,22% 50%);animation:swim 2.8s infinite}.effect{width:145px;height:105px;padding:14px;border:2px solid #ef6b64;background:linear-gradient(145deg,#d6463f,#a9252b);box-shadow:0 15px 30px rgb(197 58 53/22%)}.cause{width:150px;height:164px;transition:transform .25s}.cause.top{transform:translate(-50%,-100%)}.cause.bottom{transform:translate(-50%,0)}.cause:hover.top,.cause.active.top{transform:translate(-50%,calc(-100% - 5px))}.cause:hover.bottom,.cause.active.bottom{transform:translate(-50%,5px)}.cause:before{width:4px;height:100px;border-radius:7px;background:linear-gradient(var(--c),var(--bone));animation:branch .7s var(--d) both}.cause.top:before{transform:rotate(-32deg)}.cause.bottom:before{transform:rotate(32deg)}.cause .node{position:absolute;left:calc(50% - 8px);width:16px;height:16px;border:4px solid #fff;border-radius:50%;background:var(--c);box-shadow:0 0 0 3px var(--c),0 0 0 9px color-mix(in srgb,var(--c) 14%,transparent);animation:pulse 2.4s calc(var(--d) + .8s) infinite}.cause.top .node{bottom:-8px}.cause.bottom .node{top:-8px}.tag{position:absolute;left:0;width:145px;min-height:42px;display:flex;align-items:center;overflow:hidden;border-radius:11px;background:linear-gradient(135deg,var(--c),var(--darker));color:#fff;box-shadow:0 9px 18px color-mix(in srgb,var(--c) 18%,transparent)}.cause.top .tag{top:5px}.cause.bottom .tag{bottom:5px}.tag em{display:grid;place-items:center;align-self:stretch;min-width:43px;background:#fff;color:var(--c);font-style:normal;font-size:20px;font-weight:900}.tag b{position:static;padding:0 10px;color:#fff}.cause small{width:132px;display:block;color:#3f4f61;font-size:9px;font-weight:700;line-height:1.4}.cause.top small{top:57px}.cause.bottom small{bottom:58px}.cause.active b{background:none;padding:0 10px}.method{--c:#07944f;--darker:#04763f}.manpower{--c:#0878dc;--darker:#075bb3}.management{--c:#8a2fad;--darker:#6d1d8c}.measurement{--c:#079ca2;--darker:#06787e}.material{--c:#f08000;--darker:#c76500}.machine{--c:#188a3f;--darker:#0f6c30}.detail{border-color:color-mix(in srgb,var(--detail) 28%,#fff);background:color-mix(in srgb,var(--detail) 8%,#fff);box-shadow:inset 4px 0 var(--detail)}.detail.method{--detail:#07944f}.detail.manpower{--detail:#0878dc}.detail.management{--detail:#8a2fad}.detail.measurement{--detail:#079ca2}.detail.material{--detail:#f08000}.detail.machine{--detail:#188a3f}.detail b{color:var(--detail)}@keyframes flow{0%{left:0;opacity:0}20%,80%{opacity:1}100%{left:calc(100% - 90px);opacity:0}}@keyframes branch{from{opacity:0;scale:1 0}to{opacity:1;scale:1 1}}@keyframes pulse{50%{box-shadow:0 0 0 3px var(--c),0 0 0 15px transparent}}@keyframes swim{50%{transform:scaleX(.88)}}@keyframes live{50%{transform:translateY(-2px);box-shadow:0 7px 18px rgb(11 114 81/12%)}}@media(prefers-reduced-motion:reduce){.fish *,.fish *:before,.fish *:after{animation-duration:.01ms!important;animation-iteration-count:1!important}}@media(max-width:800px){.fishstage{height:auto;background:none}.spine,.effect,.tail{display:none}.cause,.cause.top,.cause.bottom,.cause:hover.top,.cause:hover.bottom,.cause.active.top,.cause.active.bottom{position:static;transform:none;width:auto;height:105px;padding:10px;border-color:color-mix(in srgb,var(--c) 35%,#ddd);background:#fff;box-shadow:0 8px 18px color-mix(in srgb,var(--c) 8%,transparent)}.cause:before,.cause .node{display:none}.tag,.cause.top .tag,.cause.bottom .tag{position:static;width:100%}.cause small,.cause.top small,.cause.bottom small{position:static;width:auto;margin-top:9px}}`;
const script = `(()=>{const defaults=${JSON.stringify(
  questions.map(([id, clause, question, answer]) => ({
    id,
    clause,
    question,
    answer,
  })),
)};const key="lqtm-audit-answers";let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")}catch{}const answers=Object.fromEntries(defaults.map(q=>[q.id,saved[q.id]||q.answer]));const base=location.hostname.endsWith("github.io")?"/"+location.pathname.split("/").filter(Boolean)[0]:"";const findingUrl=id=>base+"/capa/"+id+"/";function save(){localStorage.setItem(key,JSON.stringify(answers))}function paint(card,answer){card.classList.remove("yes","no","na");card.classList.add(answer);card.querySelectorAll("[data-a]").forEach(button=>button.classList.toggle("active",button.dataset.a===answer));const slot=card.querySelector("[data-finding-slot]");if(slot)slot.innerHTML=answer==="no"?'<a class="open" href="'+findingUrl(card.dataset.qid)+'">Open finding →</a>':""}function updateSummary(){const values=Object.values(answers),answered=values.filter(Boolean).length,yes=values.filter(v=>v==="yes").length,no=values.filter(v=>v==="no").length,applicable=yes+no;const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};set("answered-count",answered+"/"+defaults.length);set("conformance-count",(applicable?Math.round(yes/applicable*100):0)+"%");set("progress-count",Math.round(answered/defaults.length*100)+"%");set("dashboard-conformance",(applicable?Math.round(yes/applicable*100):0)+"%");set("dashboard-open",no)}document.querySelectorAll("[data-qid]").forEach(card=>paint(card,answers[card.dataset.qid]||""));document.addEventListener("click",event=>{const answerButton=event.target.closest("[data-a]");if(answerButton){const card=answerButton.closest("[data-qid]");answers[card.dataset.qid]=answerButton.dataset.a;paint(card,answerButton.dataset.a);save();updateSummary()}const cause=event.target.closest(".cause");if(cause){document.querySelectorAll(".cause").forEach(item=>item.classList.remove("active"));cause.classList.add("active");const detail=document.querySelector(".detail");detail.className="detail "+cause.dataset.tone;detail.innerHTML="<b>"+cause.dataset.name+"</b><p>"+cause.dataset.ev+"</p>"}});const tbody=document.getElementById("findings-body");if(tbody){const rows=defaults.filter(q=>answers[q.id]==="no").map(q=>'<tr><td><a class="redlink" href="'+findingUrl(q.id)+'">Question '+q.id+' · Clause '+q.clause+'</a><small style="display:block;color:#6d7b75;margin-top:4px">'+q.question+'</small></td><td><span class="pill">High</span></td><td>Quality Manager</td><td>Dec 2026</td><td>Open</td></tr>').join("");tbody.innerHTML=rows||'<tr><td colspan="5" style="text-align:center;color:#6d7b75">No open findings</td></tr>'}updateSummary()})();`;
function shell(path, title, subtitle, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><style>${style}</style></head><body><div class="shell"><aside class="side"><a href="/" class="brand"><i>◈</i>LQTM Audit Hub</a><nav class="nav"><small>Workspace</small><a class="${path === "/" ? "on" : ""}" href="/">▣ &nbsp; Audit</a><a class="${path === "/dashboard" ? "on" : ""}" href="/dashboard">◫ &nbsp; Analysis</a><a class="${path.startsWith("/capa") ? "on" : ""}" href="/capa/2">⚠ &nbsp; CAPA</a></nav><div class="foot">● Internal audit<br><small>Draft · Jul 2026</small></div></aside><main class="main"><header class="head"><div><span class="kicker">ISO 9001:2015</span><h1>${title}</h1><p>${subtitle}</p></div></header>${body}</main></div><script>${script}</script></body></html>`;
}
function audit() {
  let qs = questions
    .map(
      (q, i) =>
        `<article class="q ${q[3]}"><div class="num">${String(i + 1).padStart(2, "0")}</div><div><span class="meta">Clause ${q[1]}</span><h2>${q[2]}</h2><div class="answers"><button class="yes" data-a="yes">✓ YES</button><button class="no" data-a="no">⚠ NO</button><button class="na" data-a="na">N/A</button>${q[3] === "no" ? `<a class="open" href="/capa/${q[0]}">Open finding →</a>` : ""}</div></div></article>`,
    )
    .join("");
  return shell(
    "/",
    "Laboratory quality audit",
    "Assess each requirement and open a CAPA when a response is nonconforming.",
    `<section class="summary"><div><span>Questions</span><strong>9</strong></div><div><span>Answered</span><strong>9/9</strong></div><div><span>Conforming</span><strong>56%</strong></div><div><span>Audit progress</span><strong>100%</strong></div></section><div class="toolbar"><input class="search" placeholder="Search question or clause"><div class="filters"><button class="on">All</button><button>YES</button><button>NO</button><button>N/A</button></div></div><div class="qlist">${qs}</div>`,
  );
}
function dashboard() {
  let rows = Object.entries(findings)
    .map(
      ([id, f]) =>
        `<tr><td><a class="redlink" href="/capa/${id}">${f[0]}</a></td><td><span class="pill">${id === "5" ? "Medium" : "High"}</span></td><td>Quality Manager</td><td>Dec 2026</td><td>${id === "2" ? "22" : id === "3" ? "10" : "45"}%</td></tr>`,
    )
    .join("");
  return shell(
    "/dashboard",
    "Audit dashboard",
    "A decision-ready view of conformance, findings, ownership, and CAPA progress.",
    `<section class="metrics"><div class="metric"><span>Conformance rate</span><strong>63%</strong><small>5 of 8 applicable controls</small></div><div class="metric"><span>Open findings</span><strong>3</strong></div><div class="metric"><span>CAPA completion</span><strong>26%</strong></div><div class="metric"><span>Evidence coverage</span><strong>67%</strong></div></section><section class="grid"><article class="panel"><span class="kicker">Clause health</span><h2>Performance by section</h2><div class="bars"><div><label>4.1 Context <b>33%</b></label><div class="bar"><i class="red" style="width:33%"></i></div></div><div><label>4.2 Interested parties <b>50%</b></label><div class="bar"><i class="amber" style="width:50%"></i></div></div><div><label>4.3 Scope <b>100%</b></label><div class="bar"><i style="width:100%"></i></div></div></div></article><article class="panel"><span class="kicker">Overall analysis</span><h2>Context governance is the key gap</h2><p class="muted">Issues are identified, but strategic alignment, review triggers, ownership, and effectiveness evidence remain incomplete.</p></article></section><section class="panel"><h2>Nonconformities & CAPA</h2><table><thead><tr><th>Finding</th><th>Priority</th><th>Owner</th><th>Due</th><th>Progress</th></tr></thead><tbody>${rows}</tbody></table></section>`,
  );
}
function capa(id) {
  let q = questions.find((x) => x[0] === +id) || questions[1],
    f = findings[id] || findings[2];
  let cs = [
    [
      "Method",
      "No controlled review method",
      "The procedure lacks criteria, frequency, and approval.",
    ],
    ["People", "Ownership is unclear", "No accountable role is assigned."],
    [
      "Measurement",
      "No effectiveness criteria",
      "Success measures documents, not adequacy.",
    ],
    [
      "System",
      "Review is not workflow-driven",
      "Context review is absent from management review.",
    ],
    [
      "Environment",
      "Changes are not triggers",
      "Regulatory, market, technology, and climate changes do not initiate review.",
    ],
    [
      "Records",
      "Evidence is not retained",
      "Approvals, decisions, and actions are not consistently recorded.",
    ],
  ];
  let branches = cs
    .map(
      (c, i) =>
        `<button class="cause ${i % 2 ? "bottom" : "top"} ${i === 0 ? "active" : ""}" style="left:${13 + i * 14.3}%;--d:${i * 0.12}s" data-name="${c[0]} · ${c[1]}" data-ev="${c[2]}"><b>${c[0]}</b><small>${c[1]}</small></button>`,
    )
    .join("");
  return shell(
    `/capa/${id}`,
    f[0],
    `Finding NC-${String(q[0]).padStart(3, "0")} · Clause ${q[1]}`,
    `<section class="hero"><span class="pill">HIGH · OPEN</span><blockquote><span>${q[2]}</span><b>NO</b></blockquote></section><section class="cgrid"><div class="stack"><article class="card"><span class="kicker">Finding</span><h2>Observed nonconformity</h2><p>${f[1]}</p></article><article class="card danger"><span class="kicker">Root cause</span><h2>Systemic cause</h2><p>${f[2]}</p></article><article class="card fish"><div class="fishhead"><div><span class="kicker">Cause & effect analysis</span><h2>Interactive fishbone · 6M</h2></div><b style="color:#c53a35">● Click a cause</b></div><div class="fishstage"><div class="spine"></div><div class="effect"><small>EFFECT</small><b>QMS context gap</b></div>${branches}</div><div class="detail"><b>Method · No controlled review method</b><p>${cs[0][2]}</p></div></article><article class="card"><span class="kicker">Corrective action</span><h2>Prevent recurrence</h2><p>Revise the procedure to define criteria, ownership, review triggers, approval evidence, and retained records.</p></article><article class="card smart"><span class="kicker">SMART objective</span><h2>By 15 December 2026, review 100% of documented issues against approved criteria and obtain Director approval.</h2></article></div><aside><div class="sidecard"><span class="kicker">Execution</span><h2>Action control</h2><p><b>Responsible</b><br>Quality Manager</p><p><b>Monitoring</b><br>Director</p><p><b>Due</b><br>15 Dec 2026</p></div><div class="sidecard"><span class="kicker">Progress</span><h2>22% complete</h2><div class="progress"><i style="width:22%"></i></div></div></aside></section>`,
  );
}
function auditV2() {
  const cards = questions
    .map(
      ([id, clause, question, answer], index) =>
        `<article class="q ${answer}" data-qid="${id}"><div class="num">${String(index + 1).padStart(2, "0")}</div><div><span class="meta">Clause ${clause}</span><h2>${question}</h2><div class="answers"><button class="yes" data-a="yes">✓ YES</button><button class="no" data-a="no">⚠ NO</button><button class="na" data-a="na">N/A</button><span class="finding-slot" data-finding-slot></span></div></div></article>`,
    )
    .join("");
  return shell(
    "/",
    "Laboratory quality audit",
    "Assess each requirement and open a CAPA when a response is nonconforming.",
    `<style>.answers{align-items:center}.finding-slot{margin-left:auto}.answers button.active{transform:translateY(-1px);box-shadow:0 5px 12px rgb(17 47 81/10%)}</style><section class="summary"><div><span>Questions</span><strong>${questions.length}</strong></div><div><span>Answered</span><strong id="answered-count">0/${questions.length}</strong></div><div><span>Conforming</span><strong id="conformance-count">0%</strong></div><div><span>Audit progress</span><strong id="progress-count">0%</strong></div></section><div class="toolbar"><input class="search" id="question-search" placeholder="Search question or clause"><div class="filters"><button class="on">All</button><button>YES</button><button>NO</button><button>N/A</button></div></div><div class="qlist">${cards}</div>`,
  );
}

function dashboardV2() {
  return shell(
    "/dashboard",
    "Audit dashboard",
    "A decision-ready view of conformance, findings, ownership, and CAPA progress.",
    `<section class="metrics"><div class="metric"><span>Conformance rate</span><strong id="dashboard-conformance">0%</strong><small>Based on saved applicable responses</small></div><div class="metric"><span>Open findings</span><strong id="dashboard-open">0</strong><small>Updated from the audit page</small></div><div class="metric"><span>CAPA completion</span><strong>26%</strong></div><div class="metric"><span>Evidence coverage</span><strong>67%</strong></div></section><section class="grid"><article class="panel"><span class="kicker">Clause health</span><h2>Performance by section</h2><div class="bars"><div><label>4.1 Context <b>33%</b></label><div class="bar"><i class="red" style="width:33%"></i></div></div><div><label>4.2 Interested parties <b>50%</b></label><div class="bar"><i class="amber" style="width:50%"></i></div></div><div><label>4.3 Scope <b>100%</b></label><div class="bar"><i style="width:100%"></i></div></div></div></article><article class="panel"><span class="kicker">Overall analysis</span><h2>Live audit status</h2><p class="muted">Response totals and open findings are loaded from the answers saved on this device.</p></article></section><section class="panel"><h2>Nonconformities & CAPA</h2><table><thead><tr><th>Finding</th><th>Priority</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody id="findings-body"></tbody></table></section>`,
  );
}

function dashboardV3() {
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
  const monthlyBars = monthly
    .map(
      ([label, value]) =>
        `<div class="chart-column" title="${label}: ${value} audits"><span class="bar-value">${value}</span><i style="height:${Math.round((value / 15) * 100)}%"></i><small>${label}</small></div>`,
    )
    .join("");
  const yearlyBars = yearly
    .map(
      ([label, value], index) =>
        `<div class="chart-column yearly-column" title="${label}: ${value}% conformance"><span class="bar-value">${value}%</span><i class="${index === yearly.length - 1 ? "current" : ""}" style="height:${value}%"></i><small>${label}</small></div>`,
    )
    .join("");
  const chartStyles = `.time-chart-grid{display:grid;grid-template-columns:1.35fr .85fr;gap:14px;margin:14px 0}.chart-card{position:relative;overflow:hidden}.chart-title{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.chart-title h2{margin-bottom:3px}.dummy-pill{display:inline-flex;padding:5px 8px;border:1px solid #d9e2ef;border-radius:999px;background:#f5f8fb;color:#65758a;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.07em}.column-chart{height:250px;display:flex;align-items:flex-end;gap:10px;margin-top:25px;padding:18px 8px 28px;border-bottom:1px solid #cfd8d3;background:repeating-linear-gradient(to top,transparent 0,transparent 49px,#e8eeeb 50px)}.chart-column{position:relative;display:flex;flex:1;height:100%;min-width:24px;align-items:center;justify-content:flex-end;flex-direction:column}.chart-column i{display:block;width:min(32px,72%);min-height:3px;border-radius:7px 7px 2px 2px;background:#1b76d1;box-shadow:inset 0 1px rgb(255 255 255/25%);transform-origin:bottom;animation:bar-rise .75s var(--delay,0s) cubic-bezier(.2,.8,.2,1) both;transition:filter .2s,transform .2s}.chart-column:nth-child(2n) i{background:#155fac}.chart-column:hover i{filter:brightness(1.12);transform:scaleX(1.08)}.chart-column small{position:absolute;bottom:-23px;color:#708078;font-size:9px;font-weight:700}.bar-value{margin-bottom:5px;color:#31443c;font-size:9px;font-weight:800}.yearly-column i{width:min(48px,58%);background:#79b8a1}.yearly-column i.current{background:#0b7251}.chart-note{margin:12px 4px 0;color:#74827c;font-size:10px}.chart-note strong{color:#34473f}@keyframes bar-rise{from{scale:1 0;opacity:.35}to{scale:1 1;opacity:1}}@media(max-width:950px){.time-chart-grid{grid-template-columns:1fr}}@media(max-width:600px){.column-chart{gap:5px;overflow-x:auto}.chart-column{min-width:28px}.bar-value{font-size:8px}}`;
  return shell(
    "/dashboard",
    "Audit dashboard",
    "A decision-ready view of conformance, findings, ownership, and CAPA progress.",
    `<style>${chartStyles}</style><section class="metrics"><div class="metric"><span>Conformance rate</span><strong id="dashboard-conformance">0%</strong><small>Based on saved applicable responses</small></div><div class="metric"><span>Open findings</span><strong id="dashboard-open">0</strong><small>Updated from the audit page</small></div><div class="metric"><span>CAPA completion</span><strong>26%</strong></div><div class="metric"><span>Evidence coverage</span><strong>67%</strong></div></section><section class="time-chart-grid"><article class="panel chart-card"><div class="chart-title"><div><span class="kicker">Monthly activity</span><h2>Audits completed by month</h2><span class="muted">Number of completed audits · Jan–Dec 2026</span></div><span class="dummy-pill">Dummy data</span></div><div class="column-chart">${monthlyBars}</div><p class="chart-note"><strong>Prototype insight:</strong> audit volume increases through the second half of the year.</p></article><article class="panel chart-card"><div class="chart-title"><div><span class="kicker">Yearly performance</span><h2>Annual conformance rate</h2><span class="muted">Applicable controls rated conforming · 2022–2026</span></div><span class="dummy-pill">Dummy data</span></div><div class="column-chart">${yearlyBars}</div><p class="chart-note"><strong>Prototype insight:</strong> conformance improves from 61% to 83% over five years.</p></article></section><section class="grid"><article class="panel"><span class="kicker">Clause health</span><h2>Performance by section</h2><div class="bars"><div><label>4.1 Context <b>33%</b></label><div class="bar"><i class="red" style="width:33%"></i></div></div><div><label>4.2 Interested parties <b>50%</b></label><div class="bar"><i class="amber" style="width:50%"></i></div></div><div><label>4.3 Scope <b>100%</b></label><div class="bar"><i style="width:100%"></i></div></div></div></article><article class="panel"><span class="kicker">Overall analysis</span><h2>Live audit status</h2><p class="muted">Response totals and open findings are loaded from the answers saved on this device.</p></article></section><section class="panel"><h2>Nonconformities & CAPA</h2><table><thead><tr><th>Finding</th><th>Priority</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody id="findings-body"></tbody></table></section>`,
  );
}

function capaV2(id) {
  const q = questions.find((item) => item[0] === Number(id)) || questions[1];
  const finding = findings[id] || findings[2];
  const causes = [
    {
      label: "Method",
      tone: "method",
      side: "top",
      pos: 17,
      cause: "No formal method is established",
      evidence:
        "There is no controlled method for identifying and documenting internal and external QMS issues.",
    },
    {
      label: "Manpower",
      tone: "manpower",
      side: "top",
      pos: 43,
      cause: "Review responsibility is unclear",
      evidence:
        "Responsibility for reviewing organizational context is not clearly assigned.",
    },
    {
      label: "Management",
      tone: "management",
      side: "top",
      pos: 69,
      cause: "Changes are not reviewed as planned",
      evidence:
        "Management has not established planned intervals or change-triggered context reviews.",
    },
    {
      label: "Measurement",
      tone: "measurement",
      side: "bottom",
      pos: 22,
      cause: "No significant cause identified",
      evidence:
        "No measurement-related cause has been confirmed at this stage.",
    },
    {
      label: "Material",
      tone: "material",
      side: "bottom",
      pos: 48,
      cause: "No significant cause identified",
      evidence:
        "No material or information-input cause has been confirmed at this stage.",
    },
    {
      label: "Machine",
      tone: "machine",
      side: "bottom",
      pos: 74,
      cause: "No significant cause identified",
      evidence:
        "No equipment, software, or infrastructure cause has been confirmed at this stage.",
    },
  ];
  const branches = causes
    .map(
      (cause, index) =>
        `<button class="cause ${cause.side} ${cause.tone} ${index === 0 ? "active" : ""}" style="left:${cause.pos}%;--d:${index * 0.13}s" data-tone="${cause.tone}" data-name="${cause.label} · ${cause.cause}" data-ev="${cause.evidence}"><span class="node"></span><span class="tag"><em>M</em><b>${cause.label}</b></span><small>→ ${cause.cause}</small></button>`,
    )
    .join("");
  return shell(
    `/capa/${id}`,
    finding[0],
    `Finding NC-${String(q[0]).padStart(3, "0")} · Clause ${q[1]}`,
    `<style>${fishStyle}</style><section class="hero"><span class="pill">HIGH · OPEN</span><blockquote><span>${q[2]}</span><b>NO</b></blockquote></section><section class="cgrid"><div class="stack"><article class="card"><span class="kicker">Finding</span><h2>Observed nonconformity</h2><p>${finding[1]}</p></article><article class="card danger"><span class="kicker">Root cause</span><h2>Systemic cause</h2><p>${finding[2]}</p></article><article class="card fish"><div class="fishhead"><div><span class="kicker">Root cause analysis</span><h2>Interactive 6M fishbone diagram</h2><p>Method · Management · Manpower · Measurement · Material · Machine</p></div><b class="live">✦ Live analysis</b></div><div class="fishstage"><div class="tail"></div><div class="spine"><span class="flow"></span></div><div class="effect"><small>EFFECT</small><b>QMS context gap</b></div>${branches}</div><div class="detail method"><b>Method · No formal method is established</b><p>${causes[0].evidence}</p></div></article><article class="card"><span class="kicker">Corrective action</span><h2>Prevent recurrence</h2><p>Revise the procedure to define criteria, ownership, review triggers, approval evidence, and retained records.</p></article><article class="card smart"><span class="kicker">SMART objective</span><h2>By 15 December 2026, review 100% of documented issues against approved criteria and obtain Director approval.</h2></article></div><aside><div class="sidecard"><span class="kicker">Execution</span><h2>Action control</h2><p><b>Responsible</b><br>Quality Manager</p><p><b>Monitoring</b><br>Director</p><p><b>Due</b><br>15 Dec 2026</p></div><div class="sidecard"><span class="kicker">Progress</span><h2>22% complete</h2><div class="progress"><i style="width:22%"></i></div></div></aside></section>`,
  );
}

function smartObjectiveTable(id) {
  const q = questions.find((item) => item[0] === +id) || questions[1];
  const owner = +id === 5 ? "Compliance Lead" : "Quality Manager";
  const monitor = +id === 5 ? "Quality Manager" : "Director";
  const correctiveAction =
    +id === 3
      ? "Establish review schedule, assign responsibility, and periodically update identified issues"
      : +id === 5
        ? "Assign process owners and integrate the register into the quarterly compliance review"
        : "Revise the context-review procedure, define approval criteria, and retain review evidence";
  const objectives = {
    2: [
      "Strategic Alignment of Internal and External Issues",
      "100% of documented issues",
      "Dec 2026",
      "Planned",
    ],
    3: [
      "Periodic Review of Internal and External Issues",
      "1 Review System",
      "Dec 2026",
      "Planned",
    ],
    5: [
      "Review of Interested-Party Requirements",
      "100% of applicable requirements",
      "Nov 2026",
      "In progress",
    ],
  };
  const objective = objectives[id] || [
    "Corrective Action for Audit Finding",
    "1 Corrective Action Plan",
    "Dec 2026",
    "Planned",
  ];
  return `<style>.smart h2{margin-bottom:14px}.smart-table-wrap{overflow-x:auto;border:1px solid #bfdbce;border-radius:12px;background:#fff}.smart-table{min-width:1120px}.smart-table th,.smart-table td{padding:13px 15px;border-top:0;border-bottom:1px solid #dcebe4;vertical-align:top;line-height:1.5}.smart-table thead th{background:#f3faf6;color:#0b7251}.smart-table tbody th{width:64px;color:#0b7251;font-size:11px}.smart-table tbody td{font-size:13px}.smart-table tbody tr:last-child th,.smart-table tbody tr:last-child td{border-bottom:0}.smart-status{display:inline-block;padding:6px 9px;border-radius:99px;background:#fff1d9;color:#945b08;font-size:10px;font-weight:800;white-space:nowrap}</style><article class="card smart"><span class="kicker">SMART objective</span><h2>Action and accountability plan</h2><div class="smart-table-wrap"><table class="smart-table"><thead><tr><th>S/N</th><th>Objectives</th><th>Target</th><th>Timeline</th><th>Action Plan</th><th>Person Responsible</th><th>Person Monitoring</th><th>Achievement / Status</th></tr></thead><tbody><tr><th scope="row">${String(q[0]).padStart(2, "0")}</th><td>${objective[0]}</td><td>${objective[1]}</td><td>${objective[2]}</td><td>${correctiveAction}</td><td>${owner}</td><td>${monitor}</td><td><span class="smart-status">${objective[3]}</span></td></tr></tbody></table></div></article>`;
}

export default {
  async fetch(req) {
    let p = new URL(req.url).pathname;
    let html =
      p === "/dashboard"
        ? dashboardV3()
        : p.startsWith("/capa/")
          ? capaV2(p.split("/")[2])
          : auditV2();
    if (p.startsWith("/capa/")) {
      html = html.replace(
        /<article class="card smart">[\s\S]*?<\/article>/,
        smartObjectiveTable(p.split("/")[2]),
      );
    }
    return new Response(html, {
      headers: { "content-type": "text/html;charset=utf-8" },
    });
  },
};
