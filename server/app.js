
const express = require('express');
const _chat_server = require('./_chat_server');
const _init = require('./_init');

const app = express();

_init.bootstrap(express,app);

const server = app.listen(app.get('port'), () => console.log(`Server is running on port : ${app.get('port')}`));

_chat_server.run(server);