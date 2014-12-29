var todos = require('./services')().todoSvc;
var _ = require('underscore');

module.exports = Object.freeze({
  list: list,
  remove: remove,
  add: add
});

function list(state) {
  todos.list(function(err, results) {
    if (err) return state.error.set(err.message);
    state.todos.set(results);
  });
}

function add(state, todo) {
  todos.add(todo, function(err, result) {
    if (err) return state.error.set(err.message);
    var body = JSON.parse(result.body);
    if (!body.ok) return state.error.set('Something went wrong.');
    list(state);
  });
}

function remove(state, id) {
  todos.remove(id, function(err, result) {
    //if (err) return state.error.set(err.message);
    setTimeout(function() { list(state); }, 200);
  });
}
