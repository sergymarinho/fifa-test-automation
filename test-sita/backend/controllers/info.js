// Database
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

const TABLE_NAME = 'players'

infoController = {
    nationalities: (req, res) => {
        var sql = `SELECT DISTINCT nationality from ${TABLE_NAME} `
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows.map((n) => n.nationality)
            })
        });
    },
    leagues: (req, res) => {
        var sql = `SELECT DISTINCT league_name from ${TABLE_NAME} `
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows.map((n) => n.league_name)
            })
        });
    },



    positions: (req, res) => {
        res.json({
            "message": "success",
            "data": [
                {
                    name: "GK",
                    desc: "Goalkeeper"
                },
                {
                    name: "CB",
                    desc: "Center back"
                },
                {
                    name: "LB",
                    desc: "Left back"
                },
                {
                    name: "RB",
                    desc: "Right back"
                },
                {
                    name: "CM",
                    desc: "Center midfield"
                },
                {
                    name: "LM",
                    desc: "Left midfield"
                },
                {
                    name: "RM",
                    desc: "Right midfield"
                },
                {
                    name: "ST",
                    desc: "Striker"
                },
            ]
        })
    },


}

module.exports = infoController
