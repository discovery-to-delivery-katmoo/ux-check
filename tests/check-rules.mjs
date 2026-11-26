// Checks that UX-CHECK.md still follows its own rules.
// Run: node tests/check-rules.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");
const source = read("UX-CHECK.md");
const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

// Part A has exactly 12 numbered rules, 1 to 12 in order.
const partA = source.split("## Part A")[1]?.split("\n## Part B")[0] ?? "";
const ruleNumbers = [...partA.matchAll(/^(\d+)\. /gm)].map((m) => Number(m[1]));
check(
  ruleNumbers.length === 12 && ruleNumbers.every((n, i) => n === i + 1),
  `Part A should have rules 1 to 12, found: ${ruleNumbers.join(", ") || "none"}`
);

// Parts A to F, in order.
const parts = [...source.matchAll(/^## Part ([A-Z])\./gm)].map((m) => m[1]).join("");
check(parts === "ABCDEF", `Parts should be A to F in order, found: ${parts}`);

// Every check U1 to U11 is a heading once.
for (let i = 1; i <= 11; i++) {
  const count = source.match(new RegExp(`^### U${i} · `, "gm"))?.length ?? 0;
  check(count === 1, `U${i} should appear once as a heading, found ${count}`);
}

// The four labels, spelled exactly.
for (const label of ["seen in the code", "likely", "couldn't check from code", "not found"]) {
  check(source.includes(`"${label}"`), `Label missing or misspelled: "${label}"`);
}

// The eight report headings, in order.
const headings = [
  "## 1. What was reviewed",
  "## 2. People and tasks",
  "## 3. Stops someone finishing a main task",
  "## 4. Slows them down or confuses them",
  "## 5. Polish",
  "## 6. Sketches",
  "## 7. Couldn't check from code",
  "## 8. What the result means",
];
let last = -1;
for (const h of headings) {
  const at = source.indexOf(`"${h}"`);
  check(at > last, `Report heading missing or out of order: "${h}"`);
  last = at;
}

// Fixed sentences.
for (const sentence of [
  "I'll read your project only. I won't change anything.",
  "Nothing was found in what could be checked. This isn't a guarantee that people will find your app easy to use.",
  "Checks not listed above found nothing in what could be checked. This isn't a guarantee that people will find your app easy to use.",
  "This was a partial review. I read [X] of [Y] screens.",
  "Accessibility here covers the basics only. It isn't a full accessibility audit.",
  "This is a suggestion. You know your users best, so the order is your call.",
  "Report complete (8 of 8 parts)",
]) {
  check(source.includes(sentence), `Fixed sentence missing: "${sentence}"`);
}

// The boundary line appears exactly once.
const boundary =
  "Deciding which friction matters most for your users, and what to simplify or drop, is a product call. This is where an experienced product lead helps.";
check(source.split(boundary).length === 2, "The boundary line should appear exactly once");

// Never claims the app is easy to use or has good UX outside the fixed sentences and rule 7.
const withoutFixed = source
  .replaceAll("This isn't a guarantee that people will find your app easy to use.", "")
  .replace("Never say the app is easy to use or has good UX.", "");
check(
  !/\b(app|it) (is easy to use|has good UX)\b/i.test(withoutFixed),
  'The instructions claim an app "is easy to use" or "has good UX" outside the fixed sentences'
);

// No em or en dashes in anything people read.
const peopleRead = ["UX-CHECK.md", "README.md", "CHANGELOG.md"];
for (const f of readdirSync(join(root, "start"))) peopleRead.push(`start/${f}`);
if (existsSync(join(root, "examples"))) {
  for (const f of readdirSync(join(root, "examples"))) peopleRead.push(`examples/${f}`);
}
for (const rel of peopleRead) {
  read(rel)
    .split("\n")
    .forEach((line, i) => {
      if (/[–—]/.test(line)) failures.push(`Dash in ${rel}, line ${i + 1}`);
    });
}

// Words a directory policy check may misread, anywhere in what ships.
const shipped = ["UX-CHECK.md", "README.md"];
for (const rel of shipped) {
  check(!/dangerously|skip-permissions|bypassPermissions/i.test(read(rel)), `Policy-sensitive word in ${rel}`);
}

// The skill pre-approves only reading tools (directory rule for unverified organisations).
const skill = read("plugins/ux-check/skills/run/SKILL.md");
check(/^allowed-tools: Read, Grep, Glob$/m.test(skill), "SKILL.md allowed-tools must be exactly Read, Grep, Glob");

// The README says accessibility covers only the basics.
check(/only the basics|basics only/i.test(read("README.md")), "README must say accessibility covers only the basics");

// Short enough for every tool's chat box.
const words = source.split(/\s+/).filter(Boolean).length;
check(words < 4000, `UX-CHECK.md has ${words} words; the limit is 4,000`);

// Generated files match the source.
try {
  execFileSync("node", [join(root, "scripts/build-skill"), "--check"], { stdio: "pipe" });
} catch (err) {
  failures.push(`build-skill --check failed: ${String(err.stderr || err.message).trim()}`);
}

if (failures.length) {
  console.error(`${failures.length} problem(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`All checks passed (${words} words).`);
