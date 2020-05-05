var express = require('express');
var router = express.Router();
const knex = require('../db/knex')



/* GET home page. */
router.get('/', function (req, res, next) {
  knex('todo').select().then(todos => {
    res.render('all', {
      todos: todos
    });
  })

});
router.get('/new', function (req, res, next) {
  res.render('new');
});

function validTodo(todo) {
  return typeof todo.title == 'string' &&
    todo.title.trim() != '' && typeof todo.priority != undefined && !isNaN(Number(todo.priority))
}

function todoInsertUpdate(req, res, callback) {
  console.log(req.body)
  if (validTodo(req.body)) {
    let todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    }
    callback(todo)
  } else {
    res.status(500)
    res.render('error', {
      message: 'Invalid todo'
    })

  }
}

router.post('/', function (req, res, next) {
  todoInsertUpdate(req, res, (todo) => {
    todo.date = new Date()
    knex('todo')
      .insert(todo, 'id')
      .then(ids => {
        console.log(ids);

        const id = ids[0]
        res.redirect(`/todo/${id}`)
      })
  })
});

function respondRender(id, res, page) {
  if (typeof id != 'undefined') {
    knex('todo').select()
      .where('id', id)
      .first()
      .then(todo => {
        res.render(page, todo);
      })
  } else {
    res.status(500)
    res.render('error', {
      message: 'Invalid todo'
    })
  }
}
router.get('/:id/edit', function (req, res, next) {
  const id = req.params.id
  respondRender(id, res, 'edit')
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  respondRender(id, res, 'single')
});

router.put('/:id', function (req, res, next) {

  todoInsertUpdate(req, res, (todo) => {
    knex('todo')
      .where('id', req.params.id)
      .update(todo, 'id')
      .then(() => {
        res.redirect(`/todo/${req.params.id}`)
      })
  })
});

router.delete('/:id', function (req, res, next) {
  const id = req.params.id
  if (typeof id != 'undefined') {
    knex('todo').select()
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/todo');
      })
  } else {
    res.status(500)
    res.render('error', {
      message: 'Invalid todo'
    })
  }
});

module.exports = router;