import { App, Plugin, TFile, Notice } from "obsidian";

const DAILY_FOLDER = "daily";
const DEFAULT_HEADER = "# Daily Note\n";

export default class DailyRecallPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: "open-todays-daily-note",
            name: "Open Today's Daily Note",
            callback: () => this.openOrCreateDaily(),
        });
    }

    async openOrCreateDaily() {
        const vault = this.app.vault;
        const todayStr = window.moment().format("YYYY-MM-DD");
        const filePath = `${DAILY_FOLDER}/${todayStr}.md`;

        // Ensure folder exists
        if (!vault.getAbstractFileByPath(DAILY_FOLDER)) {
            await vault.createFolder(DAILY_FOLDER);
        }

        // Check if today's file exists
        let file = vault.getAbstractFileByPath(filePath) as TFile;

        if (!file) {
            // Find most recent daily note
            const files = vault.getFiles()
                .filter(f => f.path.startsWith(`${DAILY_FOLDER}/`) && f.extension === 'md')
                .sort((a, b) => b.stat.mtime - a.stat.mtime);

            let content = DEFAULT_HEADER;
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
