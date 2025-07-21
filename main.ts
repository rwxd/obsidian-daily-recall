import { App, Plugin, TFile, Notice, PluginSettingTab, Setting } from "obsidian";

interface DailyRecallSettings {
    dailyNotesFolder: string;
}

const DEFAULT_SETTINGS: DailyRecallSettings = {
    dailyNotesFolder: "Daily"
};

export default class DailyRecallPlugin extends Plugin {
    settings: DailyRecallSettings;

    async onload() {
        await this.loadSettings();

        // Add command to open today's daily note
        this.addCommand({
            id: "open-todays-daily-note",
            name: "Open Today's Daily Note",
            callback: () => this.openOrCreateDaily(),
        });

        // Add settings tab
        this.addSettingTab(new DailyRecallSettingTab(this.app, this));

        // Add ribbon icon
        this.addRibbonIcon("calendar-days", "Open Today's Daily Note", () => {
            this.openOrCreateDaily();
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async openOrCreateDaily() {
        const vault = this.app.vault;
        const todayStr = window.moment().format("YYYY-MM-DD");
        const filePath = `${this.settings.dailyNotesFolder}/${todayStr}.md`;

        // Ensure folder exists
        if (!vault.getAbstractFileByPath(this.settings.dailyNotesFolder)) {
            await vault.createFolder(this.settings.dailyNotesFolder);
        }

        // Check if today's file exists
        let file = vault.getAbstractFileByPath(filePath) as TFile;

        if (!file) {
            // Find most recent daily note
            const files = vault.getFiles()
                .filter(f => f.path.startsWith(`${this.settings.dailyNotesFolder}/`) && f.extension === 'md')
                .sort((a, b) => b.stat.mtime - a.stat.mtime);
            
            let content = "# Daily Note\n";
            if (files.length > 0) {
                content = await vault.read(files[0]);
            }

            // Create today's note
            file = await vault.create(filePath, content);
            new Notice(`Created ${filePath}`);
        }

        // Open it
        const leaf = this.app.workspace.getLeaf(true);
        await leaf.openFile(file);
    }
}

class DailyRecallSettingTab extends PluginSettingTab {
    plugin: DailyRecallPlugin;

    constructor(app: App, plugin: DailyRecallPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();
        containerEl.createEl('h2', {text: 'Daily Recall Settings'});

        new Setting(containerEl)
            .setName('Daily notes folder')
            .setDesc('The folder where daily notes will be stored')
            .addText(text => text
                .setPlaceholder('Daily')
                .setValue(this.plugin.settings.dailyNotesFolder)
                .onChange(async (value) => {
                    this.plugin.settings.dailyNotesFolder = value;
                    await this.plugin.saveSettings();
                }));
    }
}
