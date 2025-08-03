/*
  Warnings:

  - You are about to drop the `organizationsRoles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('OPENED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "RecurringFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('view', 'update', 'delete', 'create');

-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('users', 'calls', 'callCategories', 'site', 'roles', 'reports', 'departments', 'app');

-- CreateEnum
CREATE TYPE "ScopeLevel" AS ENUM ('any', 'own', 'none');

-- DropForeignKey
ALTER TABLE "organizationsRoles" DROP CONSTRAINT "organizationsRoles_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organizationsRoles" DROP CONSTRAINT "organizationsRoles_userId_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "logo" TEXT;

-- DropTable
DROP TABLE "organizationsRoles";

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "logo" TEXT,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "roomNumber" INTEGER,
    "color" TEXT,
    "organizationId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "color" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationRoles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "departmentId" INTEGER,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "organizationRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "callCategories" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,
    "expectedTime" INTEGER NOT NULL,

    CONSTRAINT "callCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "locationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "callCategoryId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "assignedToId" INTEGER,
    "closedById" INTEGER,
    "organizationId" INTEGER NOT NULL,
    "recurringCallId" INTEGER,
    "status" "CallStatus" NOT NULL,
    "departmentId" INTEGER,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "resource" "Resource" NOT NULL,
    "action" "Action" NOT NULL,
    "scope" "ScopeLevel" NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurringCalls" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "departmentId" INTEGER,
    "callCategoryId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "frequency" "RecurringFrequency" NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "daysOfWeek" INTEGER[],
    "times" TEXT[],
    "exceptions" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "baseCallId" INTEGER,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "recurringCalls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallMessage" (
    "id" SERIAL NOT NULL,
    "callId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_organizationId_name_key" ON "roles"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "organizationRoles_userId_organizationId_departmentId_key" ON "organizationRoles"("userId", "organizationId", "departmentId");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationRoles" ADD CONSTRAINT "organizationRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationRoles" ADD CONSTRAINT "organizationRoles_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationRoles" ADD CONSTRAINT "organizationRoles_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationRoles" ADD CONSTRAINT "organizationRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "callCategories" ADD CONSTRAINT "callCategories_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "callCategories" ADD CONSTRAINT "callCategories_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_callCategoryId_fkey" FOREIGN KEY ("callCategoryId") REFERENCES "callCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_recurringCallId_fkey" FOREIGN KEY ("recurringCallId") REFERENCES "recurringCalls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurringCalls" ADD CONSTRAINT "recurringCalls_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurringCalls" ADD CONSTRAINT "recurringCalls_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurringCalls" ADD CONSTRAINT "recurringCalls_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurringCalls" ADD CONSTRAINT "recurringCalls_callCategoryId_fkey" FOREIGN KEY ("callCategoryId") REFERENCES "callCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurringCalls" ADD CONSTRAINT "recurringCalls_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallMessage" ADD CONSTRAINT "CallMessage_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallMessage" ADD CONSTRAINT "CallMessage_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallMessage" ADD CONSTRAINT "CallMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
