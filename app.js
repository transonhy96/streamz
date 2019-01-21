const NodeMediaServer = require('./node_media_server');
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
    },
    http: {
        port: 8000,
        webroot: './public',
        mediaroot: './media',
        allow_origin: '*'
    }

};

let nms = new NodeMediaServer(config);
nms.run();

nms.on('Streamer_offline', (name) => {
    nms.createEventSocket('Streamer_offline',name);
    nms.createEventSocket('Streamer_offline',name);
});
nms.on('Streamer_online', (name => {
    nms.createEventSocket('Streamer_onine',name);
}));




