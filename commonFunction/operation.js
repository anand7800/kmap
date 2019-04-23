let MD5 = require('md5');
var util = require('../utilities/util')
var serverUrls = require('../utilities/config');
var transporter = require('../utilities/config').config.CREATE_TRANSPOTER.tranporter


let encryptData = (stringToCrypt) => {
    return MD5(MD5(stringToCrypt));
};

let sendEmail = (mailOptions,cb)=>{

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          cb(null,{"code": util.statusCode.OK,"message": util.statusMessage.EMAIL_SENT,
           "result":info});
        }
      });
}
let pathFinder= (startPoint,endPoint,call)=>{

  function Graph() {
      var neighbors = this.neighbors = {}; // Key = vertex, value = array of neighbors.

      this.addEdge = function (u, v) {
        if (neighbors[u] === undefined) {  // Add the edge u -> v.
            neighbors[u] = [];
        }
        neighbors[u].push(v);
        if (neighbors[v] === undefined) {  // Also add the edge v -> u in order
          neighbors[v] = [];               // to implement an undirected graph.
        }                                  // For a directed graph, delete
        neighbors[v].push(u);              // these four lines.
      };

      return this;
      }

      function bfs(graph, source) {
      var queue = [ { vertex: source, count: 0 } ],
          visited = { source: true },
          tail = 0;
      while (tail < queue.length) {
        var u = queue[tail].vertex,
            count = queue[tail++].count;  // Pop a vertex off the queue.
        // print('distance from ' + source + ' to ' + u + ': ' + count);
        graph.neighbors[u].forEach(function (v) {
          if (!visited[v]) {
            visited[v] = true;
            queue.push({ vertex: v, count: count + 1 });
          }
        });
      }
      }

      function shortestPath(graph, source, target) {
      if (source == target) {   // Delete these four lines if
        print(source);          // you want to look for a cycle
        return;                 // when the source is equal to
      }                         // the target.
      var queue = [ source ],
          visited = { source: true },
          predecessor = {},
          tail = 0;
      while (tail < queue.length) {
        var u = queue[tail++],  // Pop a vertex off the queue.
            neighbors = graph.neighbors[u];
        for (var i = 0; i < neighbors.length; ++i) {
          var v = neighbors[i];
          if (visited[v]) {
            continue;
          }
          visited[v] = true;
          if (v === target) {   // Check if the path is complete.
            var path = [ v ];   // If so, backtrack through the path.
            while (u !== source) {
              path.push(u);
              u = predecessor[u];
            }
            path.push(u);
            path.reverse();
            print(path.join('->'));
            return;
          }
          predecessor[v] = u;
          queue.push(v);
        }
      }
      print('there is no path from ' + source + ' to ' + target);
      }

      function print(s) {  // A quick and dirty way to display output.
      s = s || '';
      //document.getElementById('display').innerHTML += s + '<br>';
      call(s);
      }

      var z =1 ;
      var graph = new Graph();
      graph.addEdge('118', '119');
      graph.addEdge('119', 'washroom1');
      graph.addEdge('washroom1', '120');
      graph.addEdge('120', '121');
      graph.addEdge('121', '122');
      graph.addEdge('122', 'four way1');
      graph.addEdge('four way1','123');
      graph.addEdge('four way1','104');
      graph.addEdge('four way1','124');

      graph.addEdge('104', '105');
      graph.addEdge('105', '103');
      graph.addEdge('103', '106');
      graph.addEdge('106','102');
      graph.addEdge('102', '107');
      graph.addEdge('107', '101');
      graph.addEdge('101', '108');


      graph.addEdge('124', '125');
      graph.addEdge('125', 'stairs1');
      graph.addEdge('stairs1', '126');
      graph.addEdge('126','four way2');

      graph.addEdge('four way2', 'washroom2');
      graph.addEdge('washroom2', '127');
      graph.addEdge('127', '128');
      graph.addEdge('128', 'four way3');
      graph.addEdge('four way3', 'liberary');

      graph.addEdge('four way3', '112');
      graph.addEdge('112', '113');
      graph.addEdge('113', '111');
      graph.addEdge('111', '114');
      graph.addEdge('114', '110');
      graph.addEdge('110', '115');
      graph.addEdge('115', '109');
      graph.addEdge('109', '116');

      graph.addEdge('four way3', '131');
      graph.addEdge('131', '132');
      graph.addEdge('132', '133');
      graph.addEdge('133', '134');
      graph.addEdge('134', 'stairs2');
      graph.addEdge('stairs2', '135');
      graph.addEdge('135', '136');
      graph.addEdge('136', '137');
      graph.addEdge('137', '138');
      graph.addEdge('138', '139');
      graph.addEdge('139', '140');


      graph.addEdge('four way2', 'sports room');
      graph.addEdge('four way2', 'fr-101');
      graph.addEdge('fr-101', 'fr-102');
      graph.addEdge('fr-102', 'lt-101');
      graph.addEdge('fr-101', 'lt-106');
      graph.addEdge('lt-106', 'lt-102');
      graph.addEdge('lt-102', 'lt-105');
      graph.addEdge('lt-105', 'lt-103');
      graph.addEdge('lt-103', 'lt-104');


      //bfs(graph, '118');
      shortestPath(graph,startPoint , endPoint);
      
}
module.exports = {
    encryptData: encryptData,
    sendEmail: sendEmail,
    pathFinder: pathFinder
}