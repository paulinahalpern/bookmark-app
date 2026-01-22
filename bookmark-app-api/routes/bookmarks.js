const knex = require("../knex.js");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { isLoggedIn } = require("../lib/ensure-login.js");
const axios = require("axios").default;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/bookmarks", isLoggedIn, async (req, res) => {
  try {
    const sort = req.query.sort;
    const query = knex("bookmarks").where({ user_id: req.user.id });
    if (sort === "favourite") {
      query.orderBy([
        { column: "isFavourite", order: "desc" },
        { column: "created_at", order: "desc" },
      ]);
    } else {
      query.orderBy("created_at", "desc");
    }
    const data = await query;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

router.post("/bookmarks", isLoggedIn, async (req, res) => {
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
    const data = await knex("bookmarks")
      .insert({
        url: preview.url,
        title: preview.title,
        description: preview.description,
        image: preview.image,
        user_id: req.user.id,
      })
      .returning("*");
    res.status(201).json(data);
    console.log(url);
  } catch (error) {
    console.error("Error adding api- backend", error);
  }
});

router.delete("/bookmarks/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    await knex("bookmarks").where({ id, user_id: req.user.id }).del();
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting bookmark-backend", error);
  }
});

router.patch("/bookmarks/:id/favourite", isLoggedIn, async (req, res) => {
  try {
    const { isFavourite } = req.body;
    await knex("bookmarks")
      .where({ id: req.params.id })
      .update({ isFavourite: isFavourite });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding bookmark to favourite", error);
  }
});

module.exports = router;
