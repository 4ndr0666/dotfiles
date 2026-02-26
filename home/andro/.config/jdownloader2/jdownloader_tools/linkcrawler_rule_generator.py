import json
import tkinter as tk
from tkinter import simpledialog, messagebox

def create_rule(name, pattern, rule_type="DIRECTHTTP", enabled=True):
    return {
        "name": name,
        "pattern": pattern,
        "rule": rule_type,
        "enabled": enabled,
    }

def generate_json(rules):
    with open("jd.controlling.linkcrawler.LinkCrawlerConfig.linkcrawlerrules.json", "w") as file:
        json.dump(rules, file, indent=4)

def add_rule_gui(rules):
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    name = simpledialog.askstring("Rule Name", "Enter the rule name:", parent=root)
    if not name:
        return

    file_type = simpledialog.askstring("File Type", "Enter the file type (e.g., mp4, avi) or 'video' for all video types:", parent=root)
    if not file_type:
        return

    pattern = ""
    if file_type.lower() == "video":
        # Pattern for common video formats
        pattern = "(?i)https?://.*\\.(mp4|avi|mkv|flv|wmv|mov)($|\\?.*$)"
    else:
        pattern = f"(?i)https?://.*\\.{file_type}($|\\?.*$)"

    rules.append(create_rule(name, pattern))

def main():
    rules = []

    # Load existing rules or create new list
    try:
        with open("jd.controlling.linkcrawler.LinkCrawlerConfig.linkcrawlerrules.json", "r") as file:
            rules = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        rules = []

    add_rule_gui(rules)

    # Generate JSON file
    generate_json(rules)

if __name__ == "__main__":
    main()
