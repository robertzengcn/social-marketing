CREATE TABLE IF NOT EXISTS video_srt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER,
    language_id INTEGER,
    srt TEXT,
)