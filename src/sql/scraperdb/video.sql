CREATE TABLE IF NOT EXISTS video (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    localpath TEXT NULL,
    srtfile TEXT NULL,
    record_time TEXT NULL
)