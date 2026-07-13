// HOW TO RUN: in terminal, write 'npm start' then open localhost:5500

const express = require("express");
const app = express();

app.get("/api/daily-mount", function(req, res) {
    const fs = require("fs");
    const mounts = JSON.parse(fs.readFileSync("mounts.json"));
    
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % mounts.length;
    
    res.json({ name: mounts[index].name });
});

app.use(express.static("."));

app.listen(5500, function() {
    console.log("running");
});