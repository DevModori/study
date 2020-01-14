module.exports = function(app, fs)
{
    /*
    app.get('/', function(req, res) {
        res.render('index.html')
    });
    app.get('/about', function(req, res) {
        res.render('about.html')
    });
    */

    app.get('/', function(req, res) {
        let sess = req.session;

        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5,
            name: sess.name,
            username: sess.username
        });
    });

    app.get('/list', function(req, res) {
        fs.readFile(__dirname + "/../data/" + "user.json", "utf8", function(err, data) {
            console.log(data);
            res.end(data);
        });
    });

    app.get('/getUser/:username', function(req, res) {
        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            let users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    app.post('/addUser/:username', function(req, res) {

        let result = { };
        let username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
            let users = JSON.parse(data);
            if(users[username]) {
                // DUPLICATION FOUND
                result["success"] = 0;
                result["errer"] = "duplicate";
                res.json(result);
                return;
            }
            
            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                result = {"success": 1};
                res.json(result);
            });
        });
    });

    app.put('/updateUser/:username', function(req, res) {
        let result = { };
        let username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA

        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
            let users = JSON.parse(data);
            // ADD/MODIFY DATA
            // 있으면 덮어쓰고, 없으면 새로 넣고.
            users[username] = req.body;

            // SAVE DATA

            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), 'utf8', function(err, data) {
                result = { "success": 1 };
                res.json(result);
            });
        });
    });

    app.delete('/deleteUser/:username', function(req, res) {
        let result = { };

        // LOAD DATA
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
            let users = JSON.parse(data);

            // IF NOT FOUND
            if(!users[req.params.username]) {
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            delete users[req.params.username];
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), 'utf8', function(err, data) {
                result["success"] = 1;
                res.json(result);
                return;
            });
        });
    });

    // fs.writeFile(filename, data, [options], callback)

    app.get('/login/:username/:password', function(req, res) {
        sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data) {
            let users = JSON.parse(data);
            let username = req.params.username;
            let password = req.params.password;
            let result = { };
            if(!users[username]) {
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password) {
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);
            } else {
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        });
    });

    app.get('/logout', function(req, res) {
        sess = req.session;
        if(sess.username) {
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            })
        } else {
            res.redirect('/');
        }
    })
}
