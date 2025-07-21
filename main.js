var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DailyRecallPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  dailyNotesFolder: "Daily"
};
var DailyRecallPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "open-todays-daily-note",
      name: "Open Today's Daily Note",
      callback: () => this.openOrCreateDaily()
    });
    this.addSettingTab(new DailyRecallSettingTab(this.app, this));
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
    if (!vault.getAbstractFileByPath(this.settings.dailyNotesFolder)) {
      await vault.createFolder(this.settings.dailyNotesFolder);
    }
    let file = vault.getAbstractFileByPath(filePath);
    if (!file) {
      const files = vault.getFiles().filter((f) => f.path.startsWith(`${this.settings.dailyNotesFolder}/`) && f.extension === "md").sort((a, b) => b.stat.mtime - a.stat.mtime);
      let content = "# Daily Note\n";
      if (files.length > 0) {
        content = await vault.read(files[0]);
      }
      file = await vault.create(filePath, content);
      new import_obsidian.Notice(`Created ${filePath}`);
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.openFile(file);
  }
};
var DailyRecallSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Daily Recall Settings" });
    new import_obsidian.Setting(containerEl).setName("Daily notes folder").setDesc("The folder where daily notes will be stored").addText((text) => text.setPlaceholder("Daily").setValue(this.plugin.settings.dailyNotesFolder).onChange(async (value) => {
      this.plugin.settings.dailyNotesFolder = value;
      await this.plugin.saveSettings();
    }));
  }
};
