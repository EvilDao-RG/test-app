//server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
app.use(express.static(path.resolve(__dirname, '../client/build')));

var bodyParser = require("body-parser");
var ala = bodyParser.json();
const fs = require("fs");

//MYSQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    database: 'games',
    user : 'root',
    password : 'database'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

// swagger
const swaggerUI =require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { resolve } = require("path");
const swaggerSpec ={
    definition:{
        openapi: "3.0.0",
        info: {
            title: "web-app",
            version: "1.0"
        },
        servers:[
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./index.js")}`]
}

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  
/**
 *  @swagger
 *  /api:
 *  get:
 *    summary: main page
 *  responses:
 *    200:
 *      description: Greetings from the server side
 */ 
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server side!" });
});

app.get("/games", (req, res) => {
    fs.readFile( __dirname + "/" + "games.json", "utf8", (err, data) => {
        console.log(data);
        res.end(data);
    });
});

app.post("/game/new", (req, res) =>{
    fs.readFile( __dirname + "/" + "games.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        data["game3"] = newGame["game3"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Game:
 *      type: object
 *      properties:
 *        gameID:
 *          type: string
 *          description: The gameID
 */

/**
 * @swagger
 * /game/deleteGame/{gameID}:
 *   delete:
 *     summary: delete a game
 *     parameters:
 *       - in: path
 *         name: gameID
 *         schema:
 *            type: string
 *         required: true
 *         description: the gameID
 *     responses:
 *       200:
 *         description: all games updated
 */
app.delete("/game/deleteGame/:gameID", function (req, res) {
    fs.readFile(__dirname + "/" + "games.json", "utf8", (err, data) =>{
        data = JSON.parse(data);
        let deletedGame = data[`${req.params.gameID}`];
        delete data[`${req.params.gameID}`];

        //console.log(data);
        fs.writeFile(__dirname + "/games.json", JSON.stringify(data), function(err, result){
            if (err) throw err;
            console.log('The "data to delete" was deleted from file!');
        });
        res.end(JSON.stringify(deletedGame));
    });
});

var id = 3;

app.put("/forms/putGame", ala, (req, res) =>{
    query = `INSERT INTO stock(G_NAME, G_GENRE, G_STUDIO) VALUES('` + 
        req.body.name + `','` + req.body.genre + `','` + req.body.studio + `');`;
    connection.query(query, function(err, result){
        if(err) throw(err);
        console.log(result);
    });
    id++;
});

app.put("/game/putGame", (req, res) =>{
    fs.readFile(__dirname + "/" + "games.json", "utf-8", (err, data) =>{
        data = JSON.parse(data);
        data["game3"] = newGame["game3"];

        fs.writeFile(__dirname + "/games.json", JSON.stringify(data), function(err, result){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        res.end(JSON.stringify(data["game3"]));
    });
});