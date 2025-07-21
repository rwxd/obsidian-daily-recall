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
var DAILY_FOLDER = "daily";
var DEFAULT_HEADER = "# Daily Note\n";
var DailyRecallPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "open-todays-daily-note",
      name: "Open Today's Daily Note",
      callback: () => this.openOrCreateDaily()
    });
  }
  async openOrCreateDaily() {
    const vault = this.app.vault;
    const todayStr = window.moment().format("YYYY-MM-DD");
    const filePath = `${DAILY_FOLDER}/${todayStr}.md`;
    if (!vault.getAbstractFileByPath(DAILY_FOLDER)) {
      await vault.createFolder(DAILY_FOLDER);
    }
    let file = vault.getAbstractFileByPath(filePath);
    if (!file) {
      const files = vault.getFiles().filter((f) => f.path.startsWith(`${DAILY_FOLDER}/`) && f.extension === "md").sort((a, b) => b.stat.mtime - a.stat.mtime);
      let content = DEFAULT_HEADER;
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
