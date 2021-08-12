/*
 * Server code based on https://github.com/BenEskildsen/Blog, with
 * modifications
 */

const express = require("express");
const cors = require("cors");
const multer = require("multer")();

const {
  writeQuery,
  selectQuery,
  updateQuery,
  deleteQuery,
} = require("./dbUtils");
const { authorization, recordVisit } = require("./middleware");
const urlParser = require("url");

const port = process.env.PORT || 8000;

// -------------------------------------------------------------------------
// Comments
// -------------------------------------------------------------------------
const comments = express();

const getCommentThread = (req, res) => {
  const query = urlParser.parse(decodeURIComponent(req.url), true).query;
  console.log(query);
  selectQuery(
    "blog_comments",
    ["id", "username", "comment", "createdat"],
    query
  )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "couldn't fetch thread" });
    });
};

const postComment = (req, res) => {
  const { username, thread, comment } = req.body;
  console.log(username, thread, comment);
  writeQuery("blog_comments", { username, thread, comment })
    .then((result) => res.status(201).send({}))
    .catch((err) => {
      res.status(500).send({ error: "couldn't post comment" });
    });
};

const deleteComment = (req, res) => {
  const { id } = req.body;
  deleteQuery("blog_comments", { id })
    .then((result) => res.status(201).send({}))
    .catch((err) => {
      res.status(500).send({ error: "couldn't delete comment" });
    });
};

const postEmail = (req, res) => {
  const { email } = req.body;
  writeQuery("emails", { email })
    .then((req) => res.status(201).send({}))
    .catch((err) => {
      if (err.detail.includes("already exists")) {
        // Email already exists
        res.status(200).send({});
        return;
      }
      res.status(500).send({ error: "couldn't post email" });
    });
};

comments.get("/thread", [getCommentThread]);
comments.post("/comment", [postComment]);
comments.post("/delete", [authorization, deleteComment]);

// -------------------------------------------------------------------------
// Blog
// -------------------------------------------------------------------------
const blog = express();
blog.use(express.json());
blog.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
blog.use(multer.none());

blog.use(cors());
blog.use(recordVisit());
blog.use("/comments", comments);
blog.post("/email", [postEmail]);
console.log("server listening on port", port);
blog.listen(port);
