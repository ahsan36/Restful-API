const express = require("express");
const app = express();

const path = require("path");

const { v4: uuidv4 } = require('uuid');

const port = 8080;

// Express: For passing the encoded data
//  when we not define this then req.body gave the undefined

app.use(express.urlencoded({ extended: true }));

// Serving static files

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// When we want to run the server from other parent directory or other directory then we use the path

app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "ahsan",
        content: "I Love Programming"
    },
    {
        id: uuidv4(),
        username: "lorem",
        content: "Lorem ipsum dolor sit amet"
    },
    {
        id: uuidv4(),
        username: "consectetur",
        content: "magnam nam recusandae dolorem"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

// For creating an new Post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Add post and redirect to the all post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

// Retrieving the individual post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

// Updating the individual post
app.patch("/posts/:id", (req, res) => {
    // let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.render("show.ejs", {post});
});

// For editing the individual post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});