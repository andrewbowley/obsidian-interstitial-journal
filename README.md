# Interstitial Journal

An Obsidian plugin that provides quick commands for [interstitial journalling](https://nesslabs.com/interstitial-journaling) in your daily notes. Insert timestamped entries with a keyboard shortcut instead of typing them out by hand.

## Commands

### Add interstitial journal entry

Inserts a timestamped entry and leaves the cursor ready for you to type:

```
- 14:30 - your note here
```

### Add interstitial journal entry with new page

Inserts a timestamped entry with a wiki link, leaving the cursor inside the brackets so you can type a page name:

```
- 14:30 - [[2026-02-26 your page name]]
```

## Smart line detection

Both commands are aware of the current line context:

- **Empty line** -- inserts the entry on the current line.
- **Bare list marker** (e.g. Obsidian auto-continued a bullet to `- `) -- appends the timestamp after the existing marker without doubling up (bullet format only).
- **Line with existing content** -- inserts the entry on a new line below, preserving indentation.

## Settings

| Setting | Default | Options |
|---------|---------|---------|
| Time format | `HH:mm` | Any [Moment.js format](https://momentjs.com/docs/#/displaying/format/) string (e.g. `hh:mm A` for 12-hour) |
| Date format | `YYYY-MM-DD` | Any Moment.js format string for the date in new-page wiki links |
| Time style | Normal | **Normal** (`14:44`) or **Bold** (`**14:44**`) |
| Divider | Hyphen | **Hyphen** (`-`), **Colon** (`:`), **Arrow** (`>`), **Slash** (`/`), **Pipe** (`\|`), or **None** |
| Entry format | Bullet list | **Bullet list** (`- `) or **Plain text** (no prefix) |

## Installation

### Manual

1. Copy `main.js` and `manifest.json` into your vault at `.obsidian/plugins/interstitial-journal/`.
2. Reload Obsidian.
3. Enable **Interstitial Journal** in **Settings -> Community plugins**.

### Development

```bash
npm install
npm run dev    # watch mode
npm run build  # production build
```

## Hotkeys

After enabling the plugin, assign keyboard shortcuts in **Settings -> Hotkeys** by searching for "Interstitial Journal".
