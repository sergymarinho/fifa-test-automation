// Database
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

const TABLE_NAME = 'players'



teamController = {
    best: (req, res) => {
        const { league = '', nationality = '' } = req.query;

        // Filter
        const filters = [];


        /// League
        if (league) {
            filters.push(`league_name LIKE '${league}'`)
        }

        /// Nationality
        if (nationality) {
            filters.push(`nationality LIKE '${nationality}'`)
        }

        var SQLFilters = ' WHERE ';

        if (filters.length > 0) {
            SQLFilters += filters.join(' AND ') + ' AND '
        }



        // There must be not repeated players
        function getBestPlayers(position, howMany) {
            const p = new Promise((approve, reject) => {
                var sql = `select * from ${TABLE_NAME} ${SQLFilters} player_positions LIKE '%${position}%' ORDER BY overall DESC limit ${howMany} `
                db.all(sql, [], (err, rows) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return reject();
                    }
                    approve(rows);
                })
            })

            return p
        }

        // 1 goalkeeper (GK)
        // 2 center backs (CB) 
        // 1 left back (LB) 
        // 1 right back (RB) 
        // 2 center midfields (CM) 
        // 1 left midfield (LM)
        // 1 right midfield (RM)
        // 2 strikers (ST)

        var bestTeam = {
            entireTeam: [],
            gk: [],
            cb: [],
            lb: [],
            rb: [],
            cm: [],
            lm: [],
            rm: [],
            st: []
        }

        getBestPlayers('GK', 1).then((gkArray) => {
            // Setting player

            bestTeam.entireTeam.push(gkArray[0])
            bestTeam.gk = [gkArray[0]]

            getBestPlayers('CB', 3).then((cbArray) => {
                // Filtering
                const filteredCbArray = cbArray.filter((p) => {
                    return !bestTeam.entireTeam.includes(p);
                })
                // Setting players
                bestTeam.entireTeam.push(...filteredCbArray.slice(0, 2))
                bestTeam.cb = filteredCbArray.slice(0, 2)

                getBestPlayers('LB', 4).then((lbArray) => {
                    // Filterirng
                    const filteredLbArray = lbArray.filter((p) => {
                        return !bestTeam.entireTeam.includes(p);
                    })
                    // Setting players
                    bestTeam.entireTeam.push(...filteredLbArray.slice(0, 1))
                    bestTeam.lb = filteredLbArray.slice(0, 1)

                    getBestPlayers('RB', 5).then((rbArray) => {
                        // Filterirng
                        const filteredRbArray = rbArray.filter((p) => {
                            return !bestTeam.entireTeam.includes(p);
                        })
                        // Setting players
                        bestTeam.entireTeam.push(...filteredRbArray.slice(0, 1))
                        bestTeam.rb = filteredRbArray.slice(0, 1)


                        getBestPlayers('CM', 7).then((cmArray) => {
                            // Filterirng
                            const filteredCmArray = cmArray.filter((p) => {
                                return !bestTeam.entireTeam.includes(p);
                            })
                            // Setting players
                            bestTeam.entireTeam.push(...filteredCmArray.slice(0, 2))
                            bestTeam.cm = filteredCmArray.slice(0, 2)

                            getBestPlayers('LM', 8).then((lmArray) => {
                                // Filterirng
                                const filteredLmArray = lmArray.filter((p) => {
                                    return !bestTeam.entireTeam.includes(p);
                                })
                                // Setting players
                                bestTeam.entireTeam.push(...filteredLmArray.slice(0, 1))
                                bestTeam.lm = filteredLmArray.slice(0, 1)

                                getBestPlayers('RM', 9).then((rmArray) => {
                                    // Filterirng
                                    const filteredRmArray = rmArray.filter((p) => {
                                        return !bestTeam.entireTeam.includes(p);
                                    })
                                    // Setting players
                                    bestTeam.entireTeam.push(...filteredRmArray.slice(0, 1))
                                    bestTeam.rm = filteredRmArray.slice(0, 1)

                                    getBestPlayers('ST', 11).then((stArray) => {
                                        // Filterirng
                                        const filteredStArray = stArray.filter((p) => {
                                            return !bestTeam.entireTeam.includes(p);
                                        })
                                        // Setting players
                                        bestTeam.entireTeam.push(...filteredStArray.slice(0, 2))
                                        bestTeam.st = filteredStArray.slice(0, 2)

                                        // DONE
                                        res.json({
                                            "messaage": "success",
                                            "data": bestTeam
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}

module.exports = teamController