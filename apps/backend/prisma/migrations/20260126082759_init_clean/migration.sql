-- CreateTable
CREATE TABLE "ProgramRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ministry" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "approvalStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "approvedAt" DATETIME,
    "setNumber" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramRegistration_email_key" ON "ProgramRegistration"("email");
