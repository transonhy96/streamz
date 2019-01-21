
const Http = require('http');
const Express = require('express');
const NodeFlvSession = require('./node_flv_session');
const HTTP_PORT = 80;
const context = require('./node_core_ctx');


class NodeHttpServer {
  constructor(config) {
    this.port = config.http.port = config.http.port ? config.http.port : HTTP_PORT;
    this.webroot = config.http.webroot;
    this.mediaroot = config.http.mediaroot;
    this.config = config;
    let app = Express();

    app.use(Express.static('public'));
    app.get('/',(req,res)=>{
        res.render('index.html');
    })
    app.all('*.flv', (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', this.config.http.allow_origin);
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'range');
        res.end();
      }  else {
        req.nmsConnectionType = 'http';
        this.onConnect(req, res);
      }
    });

    this.httpServer = Http.createServer(app);
    this.io = require('socket.io')(this.httpServer);
    this.redisAdapter = require('socket.io-redis');
    this.io.adapter(this.redisAdapter({ host: 'localhost', port: 6379 }));
  
  }
  emit(name,data){
    console.log(data);
    this.io.emit(name,data);

  }
  run() {
    this.httpServer.listen(this.port, () => {
      console.log(`Node Media Http Server started on port: ${this.port}`);
    });
    
    this.httpServer.on('error', (e) => {
      console.error(`Node Media Http Server ${e}`);
    });

    this.httpServer.on('close', () => {
      console.log('Node Media Http Server Close.');
    });

    

    

    context.nodeEvent.on('postPlay', (id, args) => {
      context.stat.accepted++;
    });

    context.nodeEvent.on('postPublish', (id, args) => {
      context.stat.accepted++;
    });
  
    context.nodeEvent.on('doneConnect', (id, args) => {
      let session = context.sessions.get(id);
      let socket = session instanceof NodeFlvSession ? session.req.socket : session.socket;
      context.stat.inbytes += socket.bytesRead;
      context.stat.outbytes += socket.bytesWritten;
    });
  }

  stop() {

    this.httpServer.close();
    context.sessions.forEach((session, id) => {
      if (session instanceof NodeFlvSession) {
        session.req.destroy();
        context.sessions.delete(id);
      }
    });
  }

  onConnect(req, res) {
    let session = new NodeFlvSession(this.config, req, res);
    session.run();

  }
}

module.exports = NodeHttpServer