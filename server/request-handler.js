/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
var dataStorage = [];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/


  if (request.method === 'GET' && request.url === '/classes/messages') {
  // Do some basic logging.
    // Adding more logging to your server can be an easy way to get passive
    // debugging help, but you should always be careful about leaving stray


    // The outgoing status.
    var statusCode = 200;

    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = 'application/json';

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);

    var body = [];

    // request.on('_postData', (chunk) => {
    //   body.push(chunk);
    // }).on('end', () => { response.end(JSON.stringify(dataStorage)); });
    response.end(JSON.stringify(dataStorage));
    console.log('GETrequest: ', request);
    console.log('GETresponse: ', response);
    console.log('GETdataStorage: ', dataStorage);
    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.

  }

  //if the method is 'POST' and request.url === 'classes/messages'
  if (request.method === 'POST' && request.url === '/classes/messages') {
    //status code 201
    statusCode = 201;
    //var headers = defaultCorsHeaders;
    var headers = defaultCorsHeaders;
    //headers =['content-type'] = 'json'
    headers['Content-Type'] = 'application/json';
    //response.writeHead(statusCode, headers);
    response.writeHead(statusCode, headers);

    var data = '';
    request.on('data', (chunk) => {
      // dataStorage.push(chunk);
      data += chunk.toString();
    }).on('end', () => {
      const message = JSON.parse(data);
      message.ID = message.length;
      dataStorage.push(message);
      response.end();
    });

    console.log('POSTrequest: ', request);
    console.log('POSTresponse: ', response);
    console.log('POSTdataStorage: ', dataStorage);

  }

  //--------Test 10 ---------
  // statusCode = 404;
  // var headers = defaultCorsHeaders;
  // headers['Content-Type'] = 'json';
  // response.writeHead(statusCode, headers);
  if (request.url !== '/classes/messages') {
    statusCode = 404;
    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'json';
    response.writeHead(statusCode, headers);

    response.end('Something Went Wrong: ');
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.



//export requestHandler
module.exports.requestHandler = requestHandler;