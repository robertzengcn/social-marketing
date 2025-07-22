CREATE TABLE IF NOT EXISTS schedule_dependency (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_schedule_id INTEGER NOT NULL,
    child_schedule_id INTEGER NOT NULL,
    dependency_condition TEXT NOT NULL,
    delay_minutes INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_schedule_id) REFERENCES schedule_task(id) ON DELETE CASCADE,
    FOREIGN KEY (child_schedule_id) REFERENCES schedule_task(id) ON DELETE CASCADE,
    UNIQUE(parent_schedule_id, child_schedule_id)
);

CREATE INDEX IF NOT EXISTS idx_schedule_dependency_parent ON schedule_dependency(parent_schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_dependency_child ON schedule_dependency(child_schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_dependency_active ON schedule_dependency(is_active);
CREATE INDEX IF NOT EXISTS idx_schedule_dependency_condition ON schedule_dependency(dependency_condition); 