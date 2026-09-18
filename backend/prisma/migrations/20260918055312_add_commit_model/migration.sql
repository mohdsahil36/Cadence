-- Rename the existing table instead of dropping it
ALTER TABLE "Commits" RENAME TO "Commit";

-- Rename the primary key constraint
ALTER TABLE "Commit"
RENAME CONSTRAINT "Commits_pkey" TO "Commit_pkey";

-- Rename the foreign key constraint
ALTER TABLE "Commit"
RENAME CONSTRAINT "Commits_repositoryId_fkey" TO "Commit_repositoryId_fkey";

-- Rename the unique SHA index
ALTER INDEX "Commits_sha_key"
RENAME TO "Commit_sha_key";