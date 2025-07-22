CREATE TABLE IF NOT EXISTS schedule_execution_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER NOT NULL,
    parent_execution_id INTEGER,
    execution_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL,
    result_message TEXT,
    execution_duration INTEGER,
    task_output_id INTEGER,
    triggered_by TEXT DEFAULT 'cron',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedule_task(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_execution_id) REFERENCES schedule_execution_log(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_schedule_execution_log_schedule_id ON schedule_execution_log(schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_execution_log_status ON schedule_execution_log(status);
CREATE INDEX IF NOT EXISTS idx_schedule_execution_log_time ON schedule_execution_log(execution_time);
CREATE INDEX IF NOT EXISTS idx_schedule_execution_log_parent ON schedule_execution_log(parent_execution_id);
CREATE INDEX IF NOT EXISTS idx_schedule_execution_log_triggered_by ON schedule_execution_log(triggered_by); 