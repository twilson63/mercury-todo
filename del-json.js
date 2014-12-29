var hq;

hq = require('hyperquest');

module.exports = function(url, data, cb) {
  var body, buffer, opts, ws;

  body = JSON.stringify(data);

  opts = {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  };

  ws = hq.delete(url, opts);
  ws.end(body);

  buffer = '';
  ws.on('data', function(chunk) {
    return buffer += chunk;
  });

  ws.on('error', function(err) {
    return cb(err);
  });

  return ws.on('end', function() {
    // weird bug here! -tnw
    //var res = ws.response;
    //console.log(res);
    // if (ws.response.statusCode >= 400) {
    //   return cb(new Error('Bad statusCode in response: '+ ws.response.statusCode), ws.response);
    // }
    // ws.response.body = buffer;
    return cb(null, { ok: true });
  });
};
