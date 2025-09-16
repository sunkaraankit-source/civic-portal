const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const parser = new Parser();

// Example category assignment based on keywords
function assignCategory(title, description) {
  const text = (title + " " + description).toLowerCase();

  if (text.includes("digital india") || text.includes("governance")) {
    return "announcement";
  } else if (text.includes("swachh") || text.includes("mission")) {
    return "campaign";
  } else if (text.includes("alert") || text.includes("rainfall") || text.includes("emergency")) {
    return "emergency";
  } else {
    return "general";
  }
}

router.get("/", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://timesofindia.indiatimes.com/rssfeeds/4719148.cms");

    const news = feed.items.map((item) => ({
      title: item.title,
      description: item.contentSnippet || item.content || "",
      link: item.link,
      date: item.pubDate,
      source: "Government Portal",
      category: assignCategory(item.title, item.contentSnippet),
    }));

    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
