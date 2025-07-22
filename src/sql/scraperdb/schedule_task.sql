CREATE TABLE IF NOT EXISTS schedule_task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    task_type TEXT NOT NULL,
    task_id INTEGER,
    cron_expression TEXT,
    is_active BOOLEAN DEFAULT 1,
    last_run_time DATETIME,
    next_run_time DATETIME,
    status TEXT DEFAULT 'pending',
    execution_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    last_error_message TEXT,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
    trigger_type TEXT DEFAULT 'cron',
    parent_schedule_id INTEGER,
    dependency_condition TEXT,
    delay_minutes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_schedule_id) REFERENCES schedule_task(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_schedule_task_status ON schedule_task(status);
CREATE INDEX IF NOT EXISTS idx_schedule_task_active ON schedule_task(is_active);
CREATE INDEX IF NOT EXISTS idx_schedule_task_next_run ON schedule_task(next_run_time);
CREATE INDEX IF NOT EXISTS idx_schedule_task_type ON schedule_task(task_type);
CREATE INDEX IF NOT EXISTS idx_schedule_task_parent ON schedule_task(parent_schedule_id); 