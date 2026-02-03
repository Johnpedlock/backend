from pathlib import Path

file_path = Path("src/program/program.service.ts")

text = file_path.read_text()

lines = text.splitlines()
clean_lines = []

for line in lines:
    if "userId" in line:
        continue
    clean_lines.append(line)

file_path.write_text("\n".join(clean_lines))

print("userId references removed successfully.")
