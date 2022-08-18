const express = require('express')
const app = express()
const mysql = require('mysql')

// Connect with database mysql
var con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

app.use(express.urlencoded({ extended: false }))

/// API ///


app.post('/api/checklicense', function(req, res) {
    let license = req.body.license
    
    con.query('SELECT * FROM licenses WHERE license = ?', [license], function(err, result) {
        if (err) {console.log(err); return; }
        if (result.length > 0) {
            res.send('true')
        } else {
            res.send('false')
        }
    })
    
})

app.post('/api/addlicense', function(req, res) {
    let license = req.body.license
    let expire = req.body.expire
    con.query('SELECT * FROM licenses WHERE license = ?', [license], function(err, result) {
        if (err) {console.log(err); return; }
        if (result.length > 0) {
            res.send('false')
            return
        } else {
            con.query('INSERT INTO licenses (license, expire) VALUES (?, ?)', [license, expire], function(err, resultt) {
                if (err) {console.log(err); return; }
        
                res.send('true')
            })
        }
    })
})

app.post('/api/removelicense', function(req, res) {
    let license = req.body.license
    con.query('SELECT * FROM licenses WHERE license = ?', [license], function(err, result) {
        if (err) {console.log(err); return; }
        if (result.length > 0) {
            con.query('DELETE FROM licenses WHERE license = ?', [license], function(err, resultt) {
                if (err) {console.log(err); return; }
                res.send('true')
            })
        } else {
            res.send('false')
            return
        }
    })
})



/// LISTEN ///

app.listen(3000, function() {
    console.log('[*] Loaded all files')
})