const _ = require('lodash');

const routes = [
    {
        path:'/admin',
        controller:'admin'
    }
    ,
    {
        path: '/api/channels',
        controller: 'channel'
    },
    {
        path: '/api/games',
        controller: 'game'
    },
    {
        path: '/api/game_types',
        controller: 'game_type'
    },
    {
        path: '/api/languages',
        controller: 'language'
    }
    ,
    {
        path: '/api/validateToken',
        controller: 'authenticate'
    }
    ,
    {
        path: '/api/mailer',
        controller: 'mailer'
    }

];

const router = {

    _init: (app_context) => {

        _.forEach(routes, (route) => {
            if (route.path !== '' && route.controller !== '') {
                try {
                    var controller = require(`./controllers/${route.controller}`);
                    app_context.use(route.path, controller);
                } catch (error) {
                    console.error(error);
                }

            }
        });

    }
}
module.exports = router;