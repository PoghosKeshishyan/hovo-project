-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "specific_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
