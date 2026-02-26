import {Editor, EditorPosition, MarkdownView, moment} from "obsidian";
import type InterstitialJournalPlugin from "../main";
import {DIVIDER_CHARS} from "../settings";

const BARE_MARKER_RE = /^\s*[-*]\s*$/;

function insertEntry(
	editor: Editor,
	plugin: InterstitialJournalPlugin,
	withPage: boolean,
): void {
	const cursor = editor.getCursor();
	const line = editor.getLine(cursor.line);

	const rawTime = moment().format(plugin.settings.timeFormat);
	const time = plugin.settings.timeStyle === "bold" ? `**${rawTime}**` : rawTime;
	const divChar = DIVIDER_CHARS[plugin.settings.divider];
	const sep = divChar ? ` ${divChar} ` : " ";
	const useBullet = plugin.settings.entryFormat === "bullet";
	const bullet = useBullet ? "- " : "";

	const stamp = withPage
		? `${time}${sep}[[${moment().format(plugin.settings.dateFormat)} ]]`
		: `${time}${sep}`;

	let insertAt: EditorPosition;
	let targetLine: number;
	let lineContent: string;

	if (useBullet && BARE_MARKER_RE.test(line)) {
		// Bare list marker (Obsidian auto-continued bullet) — append after it.
		insertAt = {line: cursor.line, ch: line.length};
		targetLine = cursor.line;
		lineContent = line + stamp;
	} else if (line.trim() === "") {
		insertAt = {line: cursor.line, ch: 0};
		targetLine = cursor.line;
		lineContent = `${bullet}${stamp}`;
	} else {
		const indent = line.match(/^(\s*)/)?.[1] ?? "";
		insertAt = {line: cursor.line, ch: line.length};
		targetLine = cursor.line + 1;
		lineContent = `${indent}${bullet}${stamp}`;
	}

	const insertText = targetLine === cursor.line
		? lineContent.slice(insertAt.ch)
		: "\n" + lineContent;

	const cursorCh = withPage
		? lineContent.length - 2
		: lineContent.length;

	const cursorPos = {line: targetLine, ch: cursorCh};

	editor.transaction({
		changes: [{from: insertAt, text: insertText}],
		selections: [{from: cursorPos}],
	});
}

export function registerCommands(plugin: InterstitialJournalPlugin): void {
	plugin.addCommand({
		id: "add-interstitial-entry",
		name: "Add interstitial journal entry",
		editorCallback: (editor: Editor, _view: MarkdownView) => {
			insertEntry(editor, plugin, false);
		},
	});

	plugin.addCommand({
		id: "add-interstitial-entry-with-page",
		name: "Add interstitial journal entry with new page",
		editorCallback: (editor: Editor, _view: MarkdownView) => {
			insertEntry(editor, plugin, true);
		},
	});
}
