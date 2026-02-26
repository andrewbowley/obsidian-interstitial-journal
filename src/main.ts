import {Plugin} from "obsidian";
import {DEFAULT_SETTINGS, InterstitialJournalSettings, InterstitialJournalSettingTab} from "./settings";
import {registerCommands} from "./commands/add-entry";

export default class InterstitialJournalPlugin extends Plugin {
	settings: InterstitialJournalSettings;

	async onload() {
		await this.loadSettings();
		registerCommands(this);
		this.addSettingTab(new InterstitialJournalSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<InterstitialJournalSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
