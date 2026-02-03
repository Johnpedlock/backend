from pathlib import Path

schema_path = Path("prisma/schema.prisma")
lines = schema_path.read_text().splitlines()

fixed_lines = []

for line in lines:
    # Detect the broken merged line
    if "approvedAt" in line and "createdAt" in line:
        fixed_lines.append("  approvedAt     DateTime?")
        fixed_lines.append("  createdAt      DateTime @default(now())")
        print("Fixed merged approvedAt / createdAt line.")
    else:
        fixed_lines.append(line)

schema_path.write_text("\n".join(fixed_lines))

print("Schema syntax fixed successfully.")
