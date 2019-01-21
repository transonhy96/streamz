const init = {
    bootstrap: (express,app_context) => {

        const bodyParser = require('body-parser');
        const morgan = require('morgan');
        const path = require('path');
        const cors = require('cors')
        const config = require('./config');
        const hbs = require('express-handlebars');
        const session = require('express-session');
        const _router = require('./_router');
        const dbprovider = require('./db_provider/connect');
        const redis = require('redis');
        const redisStore = require('connect-redis')(session);

        const client = redis.createClient();

        client.on("connect", () => console.log("Redis cache client is running at port : 6379"));

        client.on('error', (err) => console.log('Something went wrong ' + err));

        app_context.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));

        app_context.set('views', path.join(__dirname, 'views'));

        app_context.set('view engine', 'hbs');
        
        app_context.set('topSecret', config.secretKey || process.env.SECRETKEY);

        app_context.set('port', process.env.PORT || 3000);

        app_context.set('trust proxy', 1);

        app_context.use(cors());

        app_context.use(bodyParser.json());

        app_context.use(bodyParser.urlencoded({ extended: true }));

        app_context.use(morgan('dev'));
        
        app_context.use(express.static(path.join(__dirname,'public')));

        app_context.use(session({
            secret: config.secretKey,
            store: new redisStore({
                client
            }),
            resave: true,
            saveUninitialized: true,
            rolling:true,
            cookie: { secure: false, maxAge: 100 * 60 * 60 * 2 }
        }));
        

        dbprovider.connect();
        //app_context.use(authy);

        _router._init(app_context);


    }
}
module.exports = init;