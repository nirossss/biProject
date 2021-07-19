const express = require('express')
const app = express()
const cors = require('cors')
const { pool } = require('./dbConnection')

const port = process.env.PORT || 3001
// Avalable for react app at localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use('/', express.json())


// 2.	Develop a single API endpoint:
// /get_investors_for_startup –getting from database all investors
// using  investor-match-startup
// advanced: get the communication type from communication table 
// and see if the startup applied for these investors.
app.get('/get_investors_for_startup/:startupId', (req, res) => {
    const { startupId } = req.params

    // Also check if cookie identification match id
    if (isNaN(startupId)) {
        res.sendStatus(400)
        return false
    }

    pool.query(`
        SELECT m.created AS match_created, startup.name AS startup_name, investor.website AS investor_site FROM binerva.match AS m
        LEFT JOIN binerva.startup AS startup
        ON m.startup_id = startup.id
        LEFT JOIN binerva.investor AS investor
        ON m.investor_id = investor.id
        WHERE startup_id = ?
    `, [startupId], (err, results) => {
        if (err) throw err

        pool.query(`
            SELECT c.created AS communication_created, ct.name AS status, startup.name AS startup_name, investor.website AS investor_site FROM binerva.communication AS c
            LEFT JOIN binerva.communication_type_list AS ct
            ON c.communication_type_id = ct.id
            LEFT JOIN binerva.startup AS startup
            ON c.startup_id = startup.id
            LEFT JOIN binerva.investor AS investor
            ON c.investor_id = investor.id
            WHERE startup_id = ? AND ct.name = 'apply'
        `, [startupId], (err, results2) => {
            if (err) throw err

            res.json({ match: results, apply: results2 })
        })
    })
})

app.listen(port, () => console.log(`connected on port ${port}`))