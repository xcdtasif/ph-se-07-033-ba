-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DEPOSIT');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'bdt',
ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'DEPOSIT';
