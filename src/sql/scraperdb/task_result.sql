CREATE TABLE IF NOT EXISTS task_result(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 taskrun_id INTEGER NULL,
 url TEXT NULL,
 title TEXT NULL,
 content TEXT NULL,
 lang TEXT NULL,
 record_time TEXT NULL
)