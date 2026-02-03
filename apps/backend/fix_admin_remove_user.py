from pathlib import Path

file_path = Path("src/admin/admin.controller.ts")
lines = file_path.read_text().splitlines()

fixed_lines = []

for line in lines:
    # Remove include: { user: true }
    if "include: { user: true }" in line:
        print("Removed include: { user: true }")
        continue

    # Remove any usage of record.user
    if "record.user" in line:
        print("Removed record.user usage:", line.strip())
        continue

    fixed_lines.append(line)

file_path.write_text("\n".join(fixed_lines))

print("Admin controller cleaned of user references successfully.")
