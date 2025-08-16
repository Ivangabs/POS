import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});