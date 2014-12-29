var _ = require('underscore');
var h = require('mercury').h;
var hg = require('mercury');

module.exports = function(state) {
  return h('div.container', [
    h('div.row', [
      h('div.col-md-3', [
        h('form', {'ev-event': hg.sendSubmit(state.channels.add)}, [
          h('fieldset', [
            inputBox(state.todo),
            addButton()
          ])
        ])
      ])
    ]),
    h('div.row', [
      h('div.col-md-6', list(state))
    ])
  ]);
}

function inputBox(description) {
  return h('input', {
    name: 'description',
    type: 'text',
    value: description,
    placeholder: 'Add todo',
  });
}

function addButton(state) {
  return h('button.btn.btn-primary', {
    style: { 'margin-left': '5px' },
  }, 'Add');
}

function deleteButton(id, remove) {
  return h('button.btn.btn-xs.btn-danger.pull-right', {
    'ev-click': hg.send(remove, id)
  },'Delete');
}

function li(remove) {
  return function(task) {
    return h('li.list-group-item', [
      h('span', [task.description]),
      deleteButton(task._id, remove)
    ]);
  }
}

function list(state) {
  return h('ul.list-group', _(state.todos).map(li(state.channels.remove)));
}
