# Daily Recall

An Obsidian plugin that seamlessly continues your daily notes with content from previous entries.

## Features

- Creates a new daily note with today's date (YYYY-MM-DD format)
- Automatically copies content from your most recent daily note
- Opens the note immediately in the editor
- Adds a calendar icon to the left sidebar for quick access
- Configurable folder for storing daily notes
- Simple, lightweight, and easy to use

## Installation

### From Obsidian Community Plugins (Coming Soon)

1. Open Obsidian
2. Go to Settings → Community plugins → Browse
3. Search for "Daily Recall"
4. Click "Install" and then "Enable"

### Manual Installation with Git

```bash
# Set your vault path (change this to your actual vault path)
VAULT_PATH="$HOME/.obsidian/vaults/your-vault"

# Create plugin directory
mkdir -p "$VAULT_PATH/.obsidian/plugins"

# Clone the repository directly into the plugins folder
git clone https://github.com/rwxd/obsidian-daily-recall.git "$VAULT_PATH/.obsidian/plugins/obsidian-daily-recall"
```

## Usage

### Opening Today's Note

- Click the calendar icon in the left sidebar, or
- Use the command palette (Ctrl+P or Cmd+P) and search for "Open Today's Daily Note"

If today's note doesn't exist yet, it will be created with the content from your most recent daily note.

### Configuration

1. Go to Settings → Plugin Options → Daily Recall
2. Set the folder where you want your daily notes to be stored (default: "Daily")

## License

MIT
