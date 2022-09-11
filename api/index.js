const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')

// MYSQL //
var con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

app.use(express.urlencoded({ extended: true }))

// VARIABLES //

let date = new Date();
let date_full = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()

/// API ///

// CHECK LICENSE

app.post('/api/checklicense', function(req, res) {
    let license = req.body.license
    
    con.query('SELECT * FROM licenses WHERE license = ?', [license], function(err, result) {
        if (err) {console.log(err); return; }
        if (result.length > 0) {
            con.query('SELECT expire FROM licenses WHERE license = ?', [license], function(err, result) {
                if (date_full < result[0].expire) {
                    res.send('true')
                } else {
                    res.send('false')
                }
            })
            
        } else {
            res.send('false')
        }
    })
    
})

// ADD LICENSE

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

// REMOVE LICENSE

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
