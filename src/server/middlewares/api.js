const { client } = require('./pg');

module.exports = function(app) {

    app.get('/api/test', async (req, res) => {
        console.log(req.query.testParam);
        try {
            const { rows } = await client.query(`
                select 1 as test
            `);
            rows.map((row) => {
                console.log(row.test);
            })
            res.send(rows);
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });

};
