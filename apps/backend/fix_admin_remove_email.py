from pathlib import Path

file_path = Path("src/admin/admin.controller.ts")
lines = file_path.read_text().splitlines()

fixed_lines = []
skip = False

for line in lines:
    # Detect start of email.send block
    if "this.email.send" in line:
        print("Removing email.send call block...")
        skip = True
        continue

    # Skip lines until we reach closing );
    if skip:
        if ");" in line:
            skip = False
        continue

    fixed_lines.append(line)

file_path.write_text("\n".join(fixed_lines))

print("All email.send calls removed successfully from admin.controller.ts")
