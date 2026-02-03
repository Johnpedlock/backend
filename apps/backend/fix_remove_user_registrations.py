from pathlib import Path

schema_path = Path("prisma/schema.prisma")
lines = schema_path.read_text().splitlines()

fixed_lines = []

for line in lines:
    # Remove registrations field from User model
    if "registrations ProgramRegistration[]" in line:
        print("Removed 'registrations ProgramRegistration[]' from User model.")
        continue
    fixed_lines.append(line)

schema_path.write_text("\n".join(fixed_lines))

print("User model cleaned successfully.")
