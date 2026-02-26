import {App, PluginSettingTab, Setting} from "obsidian";
import type InterstitialJournalPlugin from "./main";

export type TimeStyle = "normal" | "bold";
export type Divider = "hyphen" | "colon" | "arrow" | "slash" | "pipe" | "none";
export type EntryFormat = "bullet" | "plain";

export interface InterstitialJournalSettings {
	timeFormat: string;
	dateFormat: string;
	timeStyle: TimeStyle;
	divider: Divider;
	entryFormat: EntryFormat;
}

export const DEFAULT_SETTINGS: InterstitialJournalSettings = {
	timeFormat: "HH:mm",
	dateFormat: "YYYY-MM-DD",
	timeStyle: "normal",
	divider: "hyphen",
	entryFormat: "bullet",
};

export const DIVIDER_CHARS: Record<Divider, string> = {
	hyphen: "-",
	colon: ":",
	arrow: ">",
	slash: "/",
	pipe: "|",
	none: "",
};

export class InterstitialJournalSettingTab extends PluginSettingTab {
	plugin: InterstitialJournalPlugin;

	constructor(app: App, plugin: InterstitialJournalPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Time format")
			.setDesc("Moment.js format for the timestamp (e.g. HH:mm for 24-hour, hh:mm A for 12-hour).")
			.addText(text => text
				.setPlaceholder("HH:mm")
				.setValue(this.plugin.settings.timeFormat)
				.onChange(async (value) => {
					this.plugin.settings.timeFormat = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Date format")
			.setDesc("Moment.js format for the date in new-page links (e.g. YYYY-MM-DD).")
			.addText(text => text
				.setPlaceholder("YYYY-MM-DD")
				.setValue(this.plugin.settings.dateFormat)
				.onChange(async (value) => {
					this.plugin.settings.dateFormat = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Time style")
			.setDesc("How the timestamp appears in your entry.")
			.addDropdown(dropdown => dropdown
				.addOption("normal", "Normal (14:44)")
				.addOption("bold", "Bold (**14:44**)")
				.setValue(this.plugin.settings.timeStyle)
				.onChange(async (value) => {
					this.plugin.settings.timeStyle = value as TimeStyle;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Divider")
			.setDesc("Character between the timestamp and your entry text.")
			.addDropdown(dropdown => dropdown
				.addOption("hyphen", "Hyphen (-)")
				.addOption("colon", "Colon (:)")
				.addOption("arrow", "Arrow (>)")
				.addOption("slash", "Slash (/)")
				.addOption("pipe", "Pipe (|)")
				.addOption("none", "None")
				.setValue(this.plugin.settings.divider)
				.onChange(async (value) => {
					this.plugin.settings.divider = value as Divider;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Entry format")
			.setDesc("Whether entries are inserted as bullet list items or plain text lines.")
			.addDropdown(dropdown => dropdown
				.addOption("bullet", "Bullet list (- )")
				.addOption("plain", "Plain text")
				.setValue(this.plugin.settings.entryFormat)
				.onChange(async (value) => {
					this.plugin.settings.entryFormat = value as EntryFormat;
					await this.plugin.saveSettings();
				}));
	}
}
