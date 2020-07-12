var express = require('express');
const User = require('../Model/User');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.session != null && req.session.populated) {
        res.redirect('/chars');
    } else {
        res.render('users/users', { title: 'Users' });
    }
});

router.post('/', function (req, res, next) {

    let user = new User();

    user.getUserInfoWithPassword(req.body.username, req.body.password).then(data => {

        if (data) {
            req.session = { ...data };
            console.log(req.session);
            res.redirect('/chars');
        } else {
            res.render('users/users', { title: 'not Logged' });
        }
    });
});

router.get('/newuser', function (req, res, next) {
    res.render('users/create', { title: 'create New User' });
});

router.post('/newuser', function (req, res, next) {
    user = new User();
    user.newUser(req.body.username, req.body.password);

    res.render('users/create', { title: 'post New User' });
    // res.render('create', {title:'create New User'});
});

router.get('/logout', function (req, res, next) {
    req.session = null;
    res.redirect('/users');
})

module.exports = router;
