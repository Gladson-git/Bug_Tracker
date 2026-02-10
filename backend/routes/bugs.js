import express from "express";
import db from "../db.js";

const router = express.Router();

/* -----------------------------------
   GET BUGS BY PROJECT ID
----------------------------------- */
router.get("/project/:projectId", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, title, status, priority, created_at 
       FROM bugs 
       WHERE project_id = ? 
       ORDER BY created_at DESC`,
      [req.params.projectId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -----------------------------------
   GET SINGLE BUG DETAILS
----------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
          b.id, b.title, b.description, b.status, b.priority,
          b.created_at, b.updated_at,
          u1.full_name AS created_by_name,
          u2.full_name AS assigned_to_name
       FROM bugs b
       LEFT JOIN users u1 ON b.created_by = u1.id
       LEFT JOIN users u2 ON b.assigned_to = u2.id
       WHERE b.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Bug not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -----------------------------------
   CREATE NEW BUG (REPORT BUG FORM)
----------------------------------- */
router.post("/", async (req, res) => {
  const { title, description, priority, project_id, created_by } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO bugs 
       (title, description, priority, status, project_id, created_by) 
       VALUES (?, ?, ?, 'OPEN', ?, ?)`,
      [title, description, priority, project_id, created_by]
    );

    res.json({ message: "Bug reported successfully", bugId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -----------------------------------
   GET COMMENTS FOR BUG
----------------------------------- */
router.get("/:id/comments", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.id, c.comment, c.created_at, u.full_name 
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.bug_id = ?
       ORDER BY c.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -----------------------------------
   ADD COMMENT
----------------------------------- */
router.post("/:id/comments", async (req, res) => {
  const { comment, user_id } = req.body;

  try {
    await db.query(
      `INSERT INTO comments (bug_id, user_id, comment)
       VALUES (?, ?, ?)`,
      [req.params.id, user_id, comment]
    );

    res.json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
