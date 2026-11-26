# UX Check

See your app the way a first-time user does.

A free UX review for apps built with AI tools such as Lovable, Bolt, Cursor and Claude Code. UX means how easy your app is to understand and use. Your AI assistant reads your project and goes through each main task screen by screen, as your users would meet it. It tells you in plain words where people might get stuck, get confused or give up, with a ready-made prompt to fix each bigger problem and a one-line fix for small ones. It doesn't change your app.

On a small app it takes a few minutes. You don't need to know how to code or anything about design, and it's free. It runs in your own AI tool, so it uses that tool's normal allowance.

**Accessibility:** UX Check also looks at the accessibility basics it can see in your code, such as buttons with labels and fields with names. It covers only the basics. It isn't a full accessibility audit; for that, you need a specialist.

## How to use it

You don't need to install anything. You copy one page of instructions and paste it into the tool you built your app with. Pick your tool below.

Before you start:
- The review only reads your project. In Lovable, Bolt and Cursor it runs in a mode that only reads or chats; if it finds itself in a mode that could change your app, it stops and asks you to switch. In Claude Code, the plugin reads your project and asks before saving the report.
- **If you have a Build Brief** (from [Build Brief](https://github.com/discovery-to-delivery-katmoo/build-brief)), paste it in the same message, after the instructions. UX Check then knows who your users are and what matters most to them.
- **Screenshots help but aren't needed.** If your tool lets you attach images, add up to 10 screenshots of your main screens, taken on a phone if most of your users will be on one.
- If you don't give it a Build Brief, it will ask you **one** question: whether it has picked the right main tasks. Reply "yes", or correct its list.

### If you built with Lovable

1. Open your project in Lovable.
2. Switch the chat to **Chat** mode. Click the mode picker next to the message box and choose **Chat** ("Ask anything, explore ideas"). Not Build, and not Plan.
3. Open the [Lovable instructions](https://raw.githubusercontent.com/discovery-to-delivery-katmoo/ux-check/main/start/lovable.md). A page of plain text opens.
4. Copy all of it: press **Ctrl+A**, then **Ctrl+C** (on a Mac, **Cmd+A**, then **Cmd+C**).
5. Go back to Lovable, click in the message box, paste (**Ctrl+V** or **Cmd+V**), add your Build Brief or screenshots if you have them, and press **Enter**.

### If you built with Bolt

1. Open your project in Bolt.
2. Click **Plan** next to the message box so it turns blue. In older versions of Bolt this is called **Discussion** mode. It can't change your code.
3. Open the [Bolt instructions](https://raw.githubusercontent.com/discovery-to-delivery-katmoo/ux-check/main/start/bolt.md) and copy all of it (**Ctrl+A**, then **Ctrl+C**; on a Mac, **Cmd+A**, then **Cmd+C**).
4. Paste it into Bolt's message box, add your Build Brief or screenshots if you have them, and press **Enter**.

### If you use Cursor

1. Open your project in Cursor.
2. Start a new chat (**Ctrl+I**, or **Cmd+I** on a Mac).
3. Before you type anything, click the mode menu at the top of the chat (it usually says **Agent**) and choose **Ask**.
4. Open the [Cursor instructions](https://raw.githubusercontent.com/discovery-to-delivery-katmoo/ux-check/main/start/cursor.md), copy all of it, paste it into the chat, add your Build Brief or screenshots if you have them, and press **Enter**.

### If you'd rather use Claude in your browser

This works with any app, but Claude sees only the files you give it. Claude needs to be able to open zip files: in Claude, open **Settings**, then **Capabilities**, and switch on code execution and file creation. Before you upload, open the zip and delete any file called `.env`, because it can hold keys to your app's services.

1. Download your project as a zip file:
   - **Lovable, paid plans:** open the **Code** tab and click **Download codebase** at the bottom of the file list.
   - **Lovable, free plan:** connect your project to GitHub (the GitHub button at the top of Lovable; you'll need a free GitHub account), open the project on github.com, click the green **Code** button and choose **Download ZIP**.
   - **Bolt:** click your project's name at the top left, then **Export**, then **Download**.
2. Open [claude.ai](https://claude.ai) and start a new chat.
3. Click the **+** at the bottom left of the message box and upload the zip file, plus any screenshots.
4. Open the [Claude instructions](https://raw.githubusercontent.com/discovery-to-delivery-katmoo/ux-check/main/start/claude-chat.md), copy all of it, paste it into the message box and press **Enter**.

### If you already use Claude Code

Type each line into Claude Code and press **Enter** after each one:

```
/plugin marketplace add discovery-to-delivery-katmoo/ux-check
```

```
/plugin install ux-check@ux-check
```

```
/ux-check:run
```

Claude Code will ask to create one new file, `ux-check-report.md`, with the report. Say yes to keep it.

### What happens next

1. The assistant says it will only read your project, then lists your screens and the main tasks. If you didn't give it a Build Brief, it asks you once whether those tasks are right.
2. On a big app it can take 10 minutes or more.
3. The report appears in the chat. Its first line says how much it found and where to start. The last line says "Report complete (8 of 8 parts)". If you don't see it, type **continue**.
4. **Save the report:** copy it into a document of your own.
5. **To fix something:** switch your tool back to its normal mode (Build in Lovable and Bolt, Agent in Cursor). Copy one fix prompt from the report, paste it and send it. Do one fix at a time, then try the task in your app as the report describes.
6. **If something in the report doesn't make sense,** paste that part back into the same chat and ask "explain this in plain words".

If it stops partway, for example because you hit your tool's usage limit, wait until the limit resets and type **continue**.

## What you get back

A plain-language report with your problems in three groups:

- **Stops someone finishing a main task:** for example, a member books a class and lands on a page with no way back.
- **Slows them down or confuses them:** they get there, but with extra steps or guessing.
- **Polish:** small things such as two names for the same idea.

Each problem says who it affects and which task, what they experience, how to see it yourself in the app, and a fix: a prompt to paste into your builder for bigger problems, one line for small ones. Problems that change a screen's layout also get a small text sketch of how the screen could look.

The tool suggests which group each problem belongs in. Which ones to fix first is your call: you know your users best. The report ends with a short note that choosing what to fix is a product decision, where an experienced product lead can help.

## What it checks

- U1 · People and things: who uses the app and what they work with
- U2 · Main tasks, step by step: steps, dead ends, things you must remember
- U3 · Every state of every screen: loading, empty, error, not allowed
- U4 · Actions that can't work: buttons that will always fail
- U5 · Where am I? A clear heading, status and one main action on each screen
- U6 · Where would they look? Every place someone might try first leads somewhere
- U7 · First use: the app makes sense to a brand-new person, without a tour
- U8 · Consistency and calm: one name per idea, controls that behave alike, undo or a clear warning
- U9 · Words: plain words, says what happens next, no blame
- U10 · Accessibility basics (only the basics; see above)
- U11 · Does it give each person what they came for? (only when it knows what each person needs, for example from your Build Brief)

## What it doesn't do

- It doesn't prove your app is easy to use. The best test is still watching one real person try your main task without help.
- It doesn't open your live app, sign in, or contact anything outside your project.
- It can't measure speed, judge colour contrast fully, or test with a real screen reader. The report lists what it couldn't check.
- It doesn't check security. For that, use [Open Door Check](https://github.com/discovery-to-delivery-katmoo/open-door-check).
- It doesn't change your app. The only thing it may add is the report file, in Claude Code, and only if you say yes. Fixes are prompts you choose to paste.

## Part of Discovery to Delivery

UX Check is one of a set of free tools, one for each step of building a product, from first idea to release. See them all at [kathrynmoore.eu](https://www.kathrynmoore.eu/#products).

If it saved you time or trouble, you can support future tools through [GitHub Sponsors](https://github.com/sponsors/katmoo-works).

## Privacy

UX Check doesn't collect, store or send anything. It runs inside the AI tool you already use, which reads your project and any screenshots you add, so that tool's own privacy terms apply. The report stays with you unless you share it. If your screenshots show real people's names or details, use test data instead.

## About

Made by Kat Moore. Version 0.1.5, November 2026. See [CHANGELOG.md](CHANGELOG.md) for what changed.

You can use it for free on your own apps, and on apps you build or fix for clients, including as part of paid work. You can share and adapt it, with credit. What you can't do is sell it, or sell reviews or reports made with it as your own product or service. Licence: [CC BY-NC 4.0](LICENSE), with this added permission from Kat Moore.
