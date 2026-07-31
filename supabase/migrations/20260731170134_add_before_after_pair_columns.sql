/*
# Add before/after image pair columns

1. Modified tables
- `before_after`: adds `before_image_url` and `after_image_url` (text, nullable)
  so each case can store a true before+after image pair for an interactive
  comparison slider. The existing `image_url` column is kept as a fallback.

2. Security
- No policy changes; existing SELECT policy already covers the new columns.
*/

ALTER TABLE before_after
  ADD COLUMN IF NOT EXISTS before_image_url text,
  ADD COLUMN IF NOT EXISTS after_image_url text;
