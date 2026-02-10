import express from "express";
import db from "../db.js";

const router = express.Router();

/* ---------------------------
   GET COMMENTS FOR A BUG
----------------------------*/
router.get("/:bugId", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.id, c.comment, c.created_at, 
              u.full_name AS user_name, u.role
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.bug_id = ?
       ORDER BY c.created_at ASC`,
      [req.params.bugId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------
   ADD NEW COMMENT
----------------------------*/
router.post("/:bugId", async (req, res) => {
  const { user_id, comment } = req.body;

  try {
    await db.query(
      "INSERT INTO comments (bug_id, user_id, comment) VALUES (?, ?, ?)",
      [req.params.bugId, user_id, comment]
    );

    res.json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
