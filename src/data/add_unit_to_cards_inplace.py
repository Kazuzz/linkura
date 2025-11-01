import json
from pathlib import Path

# === FILE ===
FILE = Path("cards.json")

# === CHARACTER → UNIT MAPPING ===
unit_map = {
    1: 1, 3: 1, 7: 1,
    2: 2, 4: 2, 8: 2,
    5: 3, 6: 3, 9: 3,
    10: 4, 11: 4
}

def main():
    # Load existing JSON
    with open(FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    cards = data.get("cards", [])
    print(f"Loaded {len(cards)} cards")

    # Add or update "unit"
    for card in cards:
        char = card.get("character")
        card["unit"] = unit_map.get(char)

    # Save back to same file
    with open(FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Updated {FILE} directly — all cards now have a 'unit' field!")

if __name__ == "__main__":
    main()
