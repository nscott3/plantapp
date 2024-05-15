var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todo')

/* GET home page. */
// index.js
router.get('/', function(req, res, next) {
    let result = todoController.getAll()
    result.then(todos => {
        let data = JSON.parse(todos);
        console.log(data.length)
        res.render('index', { title: 'View All Todos', data: data});
    })
});

router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'Insert a Todo' });
});

// route to get all todos
router.get('/todos', function (req, res, next) {
    todoController.getAll().then(todos => {
        console.log(todos);
        return res.status(200).send(todos);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
})

// route to add a new todo
router.post('/add-todo', function(req, res, next) {
    let data = req.body;
    console.log("Received a todo: " + data.text);
    // let filePath = req.file.path;
    todoController.create(data).then(todo => {
        console.log(todo);
        res.status(200).send(todo);
        // res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

module.exports = router;
