const app = require('./app');
const debug = require('debug');

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});