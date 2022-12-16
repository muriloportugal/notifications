-- AlterTable
ALTER TABLE "Notification" ADD COLUMN "cancelAt" DATETIME;

-- CreateIndex
CREATE INDEX "Notification_recipientId_idx" ON "Notification"("recipientId");
