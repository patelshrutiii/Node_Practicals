const UserModel = require('../models/User');
const fs = require('fs')
const pug = require('pug');
//const session = require('express-session');

const encryptpassword = require('../config/EncryptPassword');


exports.home = (req, res) => {
    if (req.session.loggedin) {
        res.redirect("/display");
    }
    else {
        res.render('login');
    }

}
exports.display = (req, res) => {
    if (req.session.loggedin) {
        UserModel.find()
            .then(data => {
                data.map(doc => {
                    if (doc.pic)
                        doc.image = getPic(doc.pic)
                })
                res.render('display', { data: data })
            })
            .catch(err => { console.log(err) });
    }
    else {
        res.redirect('/');
    }

}




exports.delet = (req, res) => {
    if (req.session.loggedin) {
        UserModel.deleteOne({ _id: req.params.id })
            .catch(err => { console.log(err) });
        res.redirect('/display');
    }
    else {
        res.redirect('/');
    }

}


exports.insert = (req, res) => {
    if (req.session.loggedin) {
        res.render('insert');
    }
    else {
        res.redirect('/');
    }

}

exports.store = async (req, res) => {
    if (req.session.loggedin) {
        var gen = "";
        req.files.pic.mv(__dirname + "/../images/" + req.files.pic.name)
        var pic = req.files.pic.name;
        if (req.body.gender == "Male") {
            gen = "Male";
        }
        else {
            if (req.body.gender == "Female") {
                gen = "Female";
            }
        }

        const password = await encryptpassword(req.body.password)
        const data = new UserModel({
            name: req.body.name,
            address: req.body.address,
            password: password,
            email: req.body.email,
            gender: gen,
            city: req.body.city,
            date: req.body.date,
            pic: pic
        });
        data.save().then((result) => {
            res.redirect('/display');
        }).catch((err) => console.warn(err));
    }
    else {
        res.redirect('/');
    }

}


exports.updateDisplay = (req, res) => {
    if (req.session.loggedin) {
        UserModel.findOne({ _id: req.params.id }).then(data => {
            if (data.pic)
                data.image = getPic(data.pic)
            res.render('update', { data: data })
        })
            .catch(err => { console.log(err) });
    }
    else {
        res.redirect('/');
    }

}


exports.update = (req, res) => {
    if (req.session.loggedin) {
        var gen = " "

        if (req.body.gender == "Male") {
            gen = "Male";
        }
        else {
            if (req.body.gender == "Female") {
                gen = "Female";
            }
        }

        UserModel.updateOne({ _id: req.body.id }, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                gender: gen,
                city: req.body.city,
                date: req.body.date
            }
        }, (err, data) => {
            if (err) res.status(401).json(err)
            else res.redirect('/display');
        })
    }
    else {
        res.redirect('/');
    }


}

exports.login = (req, res) => {

    if (req.session.loggedin) {
        res.redirect("/display");
    }
    else {
        UserModel.find({ 'email': req.body.email }).then((result) => {

            const bcrypt = require('bcrypt');
            bcrypt.compare(req.body.password, result[0].password, function (error, data) {
                if (data == true) {
                    var jwt = require('jsonwebtoken');
                    var token = jwt.sign({ user: result }, 'shhhhh');
                    req.session.loggedin = true;
                    req.session.username = req.body.email
                    req.session.token = token
                    res.redirect("/display");
                }
                else {
                    res.status(200).json("Email And Password Are wrong");
                }
            })

        }).catch((error) => {
            res.status(201).json(error)
        })
    }
}

exports.logout = (req, res) => {
    if (req.session.loggedin) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err)
                }
                else {
                    res.clearCookie("connect.sid")
                    res.redirect('/');
                }
            })
        }
    }
    else {
        res.redirect("/");
    }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const getPic = (name) => {
    //const image = fs.readFileSync(__dirname + "/../images/" + name).toString("base64")
    const image = fs.readFileSync(__dirname + "/../images/" + name).toString("base64")
    return image
}