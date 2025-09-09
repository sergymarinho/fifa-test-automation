const request = require('request')
const fs = require('fs')


// Database
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

const TABLE_NAME = 'players'

playerController = {
    list: (req, res) => {
        const { items = 10, page = '0' } = req.query;
        var sql = `select * from ${TABLE_NAME} limit ${items} offset ${page * items}`
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            // Get total count for pagination
            var totalSql = `SELECT COUNT(*) FROM ${TABLE_NAME};`
            db.all(totalSql, [], (err, totalCount) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }

                res.json({
                    "message": "success",
                    "data": rows,
                    "totalCount": totalCount[0]['COUNT(*)']
                })

            })



        });
    },
    search: (req, res) => {
        const { name = '', club = '', league = '', nationality = '',
            position = '', id = '', items = 10, page = '0' } = req.query;

        // Filter
        const filters = [];

        /// Name
        if (name) {
            filters.push(`long_name LIKE '%${name}%'`)
        }

        /// Club
        if (club) {
            filters.push(`club_name LIKE '%${club}%'`)
        }

        /// League
        if (league) {
            filters.push(`league_name LIKE '${league}'`)
        }

        /// Nationality
        if (nationality) {
            filters.push(`nationality LIKE '${nationality}'`)
        }

        /// Nationality
        if (position) {
            filters.push(`player_positions LIKE '${position}'`)
        }

        var SQLFilters = '';

        if (filters.length > 0) {
            SQLFilters = ' WHERE ';
            SQLFilters += filters.join(' AND ')
        }

        const sql = `select * from ${TABLE_NAME} ${SQLFilters} limit ${items} offset ${page * items}`


        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            // Get total count for pagination
            var totalSql = `SELECT COUNT(*) FROM ${TABLE_NAME} ${SQLFilters};`
            db.all(totalSql, [], (err, totalCount) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }

                res.json({
                    "message": "success",
                    "data": rows,
                    "totalCount": totalCount[0]['COUNT(*)']
                })

            })


        });
    },

    topOverall: (req, res) => {
        const { page = '0', items = 10, position = '', league = '', nationality = '' } = req.query;
        const topk = req.params.topk;


        // Filter
        const filters = [];


        /// Position
        if (position) {
            filters.push(`player_positions LIKE '%${position}%'`)
        }

        /// League
        if (league) {
            filters.push(`league_name LIKE '${league}'`)
        }

        /// Nationality
        if (nationality) {
            filters.push(`nationality LIKE '${nationality}'`)
        }

        var SQLFilters = '';

        if (filters.length > 0) {
            SQLFilters = ' WHERE ';
            SQLFilters += filters.join(' AND ')
        }

        var sql = `select * from ${TABLE_NAME} ${SQLFilters} ORDER BY overall DESC limit ${topk}  `

        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }


            res.json({
                "message": "success",
                "data": rows.slice(parseInt(page) * parseInt(items), (parseInt(page) + 1) * parseInt(items)),
                "totalCount": topk
            })


        });
    },

    getProfileImage: (req, res) => {
        var id = req.params.id;
        while (id.length < 6) {
            id = '0' + id
        }

        if (id == '') {
            return res.json({
                error: "No id provided"
            })
        }
        const URL = `https://cdn.sofifa.com/players/${id.slice(0, 3)}/${id.slice(3, 6)}/21_120.png`;

        request({
            url: URL,
            encoding: null
        },
            (err, resp, buffer) => {
                if (!err && resp.statusCode === 200) {
                    res.set("Content-Type", "image/jpeg");
                    res.send(resp.body);
                }
            });

    }
}

module.exports = playerController