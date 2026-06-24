-- Add status, sort_order, and updated_at columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Published';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Setup incremental sort order for existing project records
WITH ordered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 as row_num
  FROM projects
)
UPDATE projects p
SET sort_order = op.row_num
FROM ordered_projects op
WHERE p.id = op.id;
