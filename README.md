# Daily Recall

An Obsidian plugin that seamlessly continues your daily notes with content from previous entries.

## Features

- Creates a new daily note in the "daily" folder with today's date (YYYY-MM-DD format)
- Automatically copies content from your most recent daily note
- Opens the note immediately in the editor
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

1. Open the command palette (Ctrl+P or Cmd+P)
2. Search for "Open Today's Daily Note"
3. Select the command to create or open today's daily note

If today's note doesn't exist yet, it will be created with the content from your most recent daily note.

## License

MIT
