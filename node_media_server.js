
const NodeHttpServer = require('./node_http_server');
const context = require('./node_core_ctx');
const NodeRtmpServer = require('./node_rtmp_server');

class NodeMediaServer {
  constructor(config) {
    this.config = config;
  }

  run() {

    if (this.config.rtmp) {
      this.nrs = new NodeRtmpServer(this.config);
      this.nrs.run();
    }
    if (this.config.http) {
      this.nhs = new NodeHttpServer(this.config);
      this.nhs.run();
    }


  }
  createEventSocket(name,data){
    this.nhs.emit(name,data);
  }
  on(eventName, listener) {
    context.nodeEvent.on(eventName, listener);
  }
  emit(eventName, listener) {
    context.nodeEvent.emit(eventName, listener);
  }

  stop() {
    if (this.nrs) {
      this.nrs.stop();
    }
    this.nhs.stop();

  }

  getSession(id) {
    return context.sessions.get(id);
  }
}

module.exports = NodeMediaServer