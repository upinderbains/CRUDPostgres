
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
    const todos = [{
      title: 'Build a Crud App',
      priority: 1,
      date: new Date()
    }, {
    title: 'Do the dishes',
    priority: 3,
    date: new Date()
  }, {
  title: 'Play outside',
  priority: 2,
  date: new Date()
}];
return knex('todo').insert(todos)
    });
};
