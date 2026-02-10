import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        name,
        description,
        total_bugs,
        open_bugs,
        resolved_bugs,
        progress,
        team_size,
        created_at,
        created_by,
        health
      FROM projects
    `);

    // Send rows directly in frontend expected format
    const projects = rows.map(p => ({
      id: p.id,
      name: p.name,
      desc: p.description,
      bugs: p.total_bugs,
      open: p.open_bugs,
      resolved: p.resolved_bugs,
      progress: p.progress,
      team: p.team_size,
      created: new Date(p.created_at).toDateString(),
      creator: p.created_by || "Admin",
      health: p.health
    }));

    console.log("Projects fetched:", projects.length);
    res.json(projects);

  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
