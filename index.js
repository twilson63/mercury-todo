var hg = require('mercury');

// mercury core app
//
// channels, state, and rendering

// define channels
var channels = require('./channels');

// define state
function App() {
  var state = hg.state({
    error: hg.value(''),
    todo: hg.value(''),
    todos: hg.value([]),
    channels: channels
  });

  channels.list(state);

  return state;
}

// define render
var render = require('./render');

hg.app(document.body, App(), render);
