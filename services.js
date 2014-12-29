var window = require('global/window');

var postJson = require('post-json');
var getJson = require('get-json-hq');
var delJson = require('./del-json');

module.exports = function() {
  var apiUrl = window.location.href + 'api/todos';

  var list = function(cb) {
    getJson(apiUrl, cb);
  };

  var add = function(todo, cb) {
    postJson(apiUrl, todo, cb);
  };

  var remove = function(id, cb) {
    delJson(apiUrl + '/' + id, {}, cb);
  };

  return Object.freeze({
    todoSvc: {
      list: list,
      add: add,
      remove: remove
    }
  })
}
