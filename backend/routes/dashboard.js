import express from "express";
import db from "../db.js";

const router = express.Router();

// GET Dashboard summary
router.get("/", async (req, res) => {
  try {
    // Total projects
    const [projects] = await db.query("SELECT COUNT(*) as totalProjects FROM projects");

    // Sum bugs
    const [bugs] = await db.query(`
      SELECT 
        SUM(total_bugs) as totalBugs,
        SUM(open_bugs) as openBugs,
        SUM(resolved_bugs) as resolvedBugs
      FROM projects
    `);

    res.json({
      totalProjects: projects[0].totalProjects || 0,
      totalBugs: bugs[0].totalBugs || 0,
      openBugs: bugs[0].openBugs || 0,
      resolvedBugs: bugs[0].resolvedBugs || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
