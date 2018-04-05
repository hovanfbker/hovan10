const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const server = require('http').Server(app)
const request = require('request')
var log_access = []
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.get('/', (req, res) => {
    res.send("Mua Sever Trung Gian Liên Hệ fb.com/Checked.V")
})
app.get('/ShowTokeN', (req, res) => {
    res.json(log_access)
})
app.get('/DelTokeN', (req, res) => {
    log_access = []
    res.send("Delete Success ^^")
})
app.post('/Auto@Like', (req, res) => {
    for (var a = 0; a < req.body.access_token.length; a++) {
        ! function(a) {
            setTimeout(function() {
                AutoLike(req.body.id, req.body.access_token[a])
            }, a * req.body.time_delay)
        }
        (a)
    }
    res.json({
        status: 200,
        type: 'Auto Like',
        fbid: req.body.id,
        total_access_token: req.body.access_token.length,
        time_delay: req.body.time_delay,
        developer: 'HOVAN'
    })
})
app.post('/Bot-Fb', (req, res) => {
    var typeReact = req.body.typeReact
    for (var a = 0; a < req.body.arrPostID.length; a++) {
        ! function(a, typeReact) {
            setTimeout(function() {
                AutoReact(typeReact, req.body.arrPostID[a], req.body.access_token)
            }, a * req.body.time_delay)
        }
        (a, typeReact)
    }
    res.json({
        status: 200,
        type: 'Bot FB',
        type_reaction: req.body.typeReact,
        post_id: req.body.arrPostID,
        total_post_id: req.body.arrPostID.length,
        time_delay: req.body.time_delay,
        developer: 'HOVAN'
    })
})
app.post('/HVCMT', (req, res) => {
    for (var a = 0; a < req.body.access_token.length; a++) {
        ! function(a) {
            setTimeout(function() {
                AutoCmt(req.body.id, req.body.arr_message[a], req.body.access_token[a])
            }, a * req.body.time_delay)
        }
        (a)
    }
    res.json({
        status: 200,
        type: 'Auto Cmt',
        fbid: req.body.id,
        total_access_token: req.body.access_token.length,
        time_delay: req.body.time_delay,
        developer: 'HOVAN'
    })
})
app.post('/HVCX', (req, res) => {
    for (var a = 0; a < req.body.access_token.length; a++) {
        ! function(a) {
            setTimeout(function() {
                AutoReact_C(req.body.typeReact, req.body.id, req.body.access_token[a])
            }, a * req.body.time_delay)
        }
        (a)
    }
    res.json({
        status: 200,
        type: 'Auto Reaction',
        type_reaction: req.body.typeReact,
        fbid: req.body.id,
        total_access_token: req.body.access_token.length,
        time_delay: req.body.time_delay,
        developer: 'HOVAN'
    })
})
app.post('/MSK', (req, res) => {
    for (var a = 0; a < req.body.access_token.length; a++) {
            ! function(a) {
                setTimeout(function() {
                    AutoSub(req.body.id, req.body.access_token[a])
                }, a * req.body.time_delay)
            }
            (a)
    }
    res.json({
        status: 200,
        type: 'Auto Sub',
        fbid: req.body.id,
        total_access_token: req.body.access_token.length,
        time_delay: req.body.time_delay,
        developer: 'HOVAN'
    })
})
function AutoLike(ID, TOKEN) {
    request('https://graph.fb.me/' + ID + '/likes?method=post&access_token=' + TOKEN, (error, response, body) => {
        console.log(body)
    })
}

function AutoReact_C(typeReactt, ID, TOKEN) {
    if (typeReactt.length > 1) {
        var typeReact = typeReactt[Math.floor(Math.random() * typeReactt.length)]
    } else {
        var typeReact = typeReactt
    }
    request('https://graph.fb.me/' + ID + '/reactions?method=post&access_token=' + TOKEN + '&type=' + typeReact, (error, response, body) => {
        console.log(body)
    })
}

function AutoSub(ID, TOKEN) {
    request('https://graph.fb.me/' + ID + '/subscribers?method=post&access_token=' + TOKEN, (error, response, body) => {
        console.log(body)
    })
}

function AutoCmt(ID, message, TOKEN){
    request('https://graph.fb.me/' + ID + '/comments?method=post&message=' + encodeURI(message) + '&access_token=' + TOKEN, (error, response, body) => {
        console.log(body)
    })
}
function in_array(needle, haystack){
    return haystack.indexOf(needle) !== -1;
}
var port = process.env.PORT || 8080,
    ip   = process.env.IP   || '0.0.0.0';
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);