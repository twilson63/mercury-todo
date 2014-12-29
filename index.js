var hg = require('mercury');
var h = require('mercury').h;
var _ = require('underscore');
var postJson = require('post-json');
var getJson = require('get-json-hq');

var uuid = require('uuid');
//var request = require('browser-request');

// function getTodos(cb) {
//   request({
//     method: 'GET',
//     url: '/api/todos',
//     json: true,
//   }, function(e, r, b) {
//     if(e || r.statusCode < 200 || r.statusCode >= 400) {
//       console.log('something went wrong');
//       cb(e);
//     }
//     //b is an array of todo docs from couchdb
//     cb(null, b);
//   });
//
// }

getTodos(function(e, todos) {

  var initialTodos = hg.array([]);
  for(var i = 0; i < todos.length; i++) {
    initialTodos.push(hg.struct({
      id: hg.value(todos[i]._id),
      task: hg.value(todos[i].task)
    }));
  }

  function App() {
    var state = hg.state({
      addTodo: hg.value(''),
      handles: hg.value(null),
      todos: initialTodos
    });
    console.log('foo');
    state.handles.set(hg.handles({
      change: function(state, data) {
        state.addTodo.set(data.addTodo);
      },
      addToList: function(state) {
        request({
          method: 'POST',
          url: '/api/todos/add',
          body: { task: state.addTodo() },
          json: true
        }, function(e, r, b) {
          if(e || (r.statusCode < 200 || r.statusCode >= 400)) {
            return console.log('something went wrong');
          }
          var listObj = hg.struct({
            id: b.id,
            task: hg.value(state.addTodo())
          });
          state.todos.push(listObj);
          state.addTodo.set('');
        });
      },
      removeFromList: function(state, data) {
        var index;
        for(var i = 0; i < state.todos.getLength(); i++) {
          var item = state.todos.get(i);
          if(item.id === data.id) {
            index = i;
            break;
          }
        }
        request({
          method: 'DELETE',
          url: '/api/todos/' + data.id
        }, function(e, r, b) {
          if(e || (r.statusCode < 200 || r.statusCode >= 400)) {
            return console.log('something went wrong');
          }
          console.log(b);
          state.todos.splice(index,1);
        });
      }
    }, state));

    return state;
  }


  App.render = function render(state) {
    return h('div.container', [
      h('div.row', [
        h('div.col-md-3', [
          inputBox(state.addTodo, state.handles.change),
          addButton(state)
        ])
      ]),
      h('div.row', [
        h('div.col-md-6', list(state))
      ])
    ]);
  }

  hg.app(document.body, App(), App.render);
});
