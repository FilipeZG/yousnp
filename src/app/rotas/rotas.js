const UserDao = require('../infra/user-dao');
const db = require('../../config/database');

module.exports = (app) => {
    
    app.get('/users', function(req, resp) {

        const userDao = new UserDao(db);
        userDao.lista()
               .then(users => resp.send(users))
               .catch(error => resp.status(400).send({ error }));
    });

    app.get('/users/:id', function(req, resp) {
        const id = req.params.id;
        const userDao = new UserDao(db);

        userDao.buscaPorId(id)
               .then(user => resp.send(user))
               .catch(error => resp.status(400).send({ error }));
    });

    app.post('/users', function(req, resp) {
        const userDao = new UserDao(db);
        
        userDao.adiciona(req.body)
               .then(id => resp.send({ id }))
               .catch(error => resp.status(400).send({ error }));
    });

    app.put('/users', function(req, resp) {
        const userDao = new UserDao(db);
        
        userDao.atualiza(req.body)
                .then(resp.redirect(303, '/users'))
                .catch(error => resp.status(400).send({ error }));
    });

    app.delete('/users/:id', function(req, resp) {
        const id = req.params.id;

        const userDao = new UserDao(db);
        userDao.remove(id)
               .then(resp.redirect('/users'))
               .catch(error => resp.status(400).send({ error }));
    });

    app.post('/authentication', function(req, resp) {
        const userDao = new UserDao(db);

        userDao.autenticar(req.body)
               .then(name => resp.status(name ? 200 : 400).send(name))
               .catch(error => resp.status(400).send({ error }));
    });
};