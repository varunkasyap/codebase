const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to DailyScribe, your digital haven for daily reflections and musings...";
const aboutContent = "At DailyScribe, we believe in the transformative power of self-expression and storytelling...";
const contactContent = "We value your feedback and are committed to providing exceptional support to our community...";
const aboutContent2 = "Driven by a passion for creativity and the written word, DailyScribe is committed to fostering a supportive and inclusive environment...";
const aboutContent3 = "Through a seamless blend of technology and heartfelt storytelling, DailyScribe endeavors to bridge the gap between digital innovation and the timeless art of journaling...";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Varun:<password>@cluster0.6ofzuhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    }
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId
});