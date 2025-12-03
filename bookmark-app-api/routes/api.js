const knex = require("../knex.js");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios").default;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/bookmarks", async (req, res) => {
  try {
    const data = await knex("url");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

router.post("/bookmarks", async (req, res) => {
  try {
    const { url } = req.body;
    const id = crypto.randomUUID();
    const response = await axios.post(
      "https://api.linkpreview.net",
      { q: url },
      {
        headers: {
          "X-Linkpreview-Api-Key": process.env.LINK_PREVIEW_KEY,
        },
      }
    );
    const preview = response.data;
    const data = await knex("url")
      .insert({
        url: preview.url,
        title: preview.title,
        description: preview.description,
        image: preview.image,
      })
      .returning("*");
    res.status(201).json(data);
    console.log(url);
  } catch (error) {
    console.error("Error adding api- backend", error);
  }
});

router.delete("/bookmarks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await knex("url").where("id", id).del();
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting bookmark-backend", error);
  }
});

module.exports = router;
