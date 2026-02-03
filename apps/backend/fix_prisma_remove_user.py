from pathlib import Path
import re

schema_path = Path("prisma/schema.prisma")
text = schema_path.read_text()

# Remove user relation line
text = re.sub(r"\s*user\s+User\s+@relation[^\n]*\n", "", text)

# Remove userId field
text = re.sub(r"\s*userId\s+String[^\n]*\n", "", text)

schema_path.write_text(text)

print("Removed user relation and userId from ProgramRegistration model.")
