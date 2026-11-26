# Changelog

## 0.1.5 (26 Nov 2026)

After a reader test with a non-technical founder:
- The version line no longer says "(draft)".
- The report opens with one line: how much was found and where to start.
- How to use a fix (switch mode, note your version, test, go back) is said once at the top of part 3, naming each tool's mode, instead of under every fix.
- "Likely" is explained there, and evidence lines are marked as being for the builder.
- Part 1 names screens as people see them, without file names.
- Checks with nothing found are one plain line in part 7, not a list of IDs.
- The security pointer says in plain words what might be exposed.
- Tests that need a new account say to use a second email address.
- Clearer where to type "fix U9.1", and plain wording when a finding sits in a less serious group.
- After a second reader test: sketches use placeholders, never invented names; "likely" short items say to check first; part 7 is in order of importance; the security line says to check before sharing the app; findings outside the main tasks say so.

## 0.1.4 (26 Nov 2026)

After round 3 of blind tests (24 of 24 planted problems found):
- If one fix renames something, every other fix and sketch uses the new name.
- A need with two parts says which part is met.
- Clearer licence: free on your own apps and on apps you build or fix for clients, including paid work; selling it, or reviews made with it, as a product or service is not allowed.

## 0.1.3 (26 Nov 2026)

After an independent review:
- The report goes in the chat; only the Claude Code plugin also saves it as a file, after asking.
- The paste-in versions ask the assistant to check its mode instead of assuming it.
- "Couldn't check from code" items aren't findings: no ID, group or fix.
- Clearer result sentences, step counting and task count (3 to 5 in total).
- Fix prompts explain how to go back instead of mentioning a test branch.
- README: Claude in the browser needs zip support, and a warning to remove .env before uploading.

## 0.1.2 (26 Nov 2026)

After the second test round:
- Problems that only happen when something fails are at most "slows them down", unless work or data is lost.
- Anything that can't be undone and happens without a warning is never polish.
- "Start with" names each finding's title, not just its ID.

## 0.1.1 (26 Nov 2026)

After the first test round:
- U11 sums up per person (met, or not met with the findings) instead of competing for findings.
- Finding IDs are numbered (U3.1, U3.2), so "fix U3.1" is clear.
- A screen reachable only by typing its address counts as no way in.
- Full fix prompts for at most 8 findings per group; the rest in short form.
- If the founder corrects the task list, their list is used as given.
- Sketches at most 40 characters wide.

## 0.1.0 (26 Nov 2026)

- First version: eleven checks (U1 to U11), a report in three groups with fix prompts and sketches, accessibility basics only.
