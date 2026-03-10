CREATE INDEX IF NOT EXISTS idx_task_name 
ON tasks 
USING gin (name gin_trgm_ops);
