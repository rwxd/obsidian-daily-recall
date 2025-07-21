#!/bin/bash

# Daily Recall - Obsidian Plugin Installation Script

# Check if vault path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path-to-obsidian-vault>"
  echo "Example: $0 ~/.obsidian/vaults/my-vault"
  exit 1
fi

VAULT_PATH="$1"

# Check if the vault exists
if [ ! -d "$VAULT_PATH" ]; then
  echo "Error: Vault directory not found at $VAULT_PATH"
  exit 1
fi

# Create plugins directory if it doesn't exist
mkdir -p "$VAULT_PATH/.obsidian/plugins"

# Clone the repository
echo "Cloning Daily Recall plugin..."
git clone https://github.com/rwxd/obsidian-daily-recall.git "$VAULT_PATH/.obsidian/plugins/obsidian-daily-recall"

# Check if the clone was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to clone the repository"
  exit 1
fi

echo "Daily Recall plugin installed successfully!"
echo ""
echo "To use the plugin:"
echo "1. Restart Obsidian"
echo "2. Go to Settings → Community plugins"
echo "3. Enable the 'Daily Recall' plugin"
echo "4. Use the command palette (Ctrl+P) to run 'Open Today's Daily Note'"
