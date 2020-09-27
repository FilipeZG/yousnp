const UserDao = require('../infra/user-dao');
const AccessDao = require('../infra/access-dao');
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
               .then(user => {
                   console.log(user);

                   if (user)
                       new AccessDao(db).adiciona(user.id, req.body.tag ? 'C' : 'S');

                   resp.status(user ? 200 : 400).send(user.name);
               })
               .catch(error => resp.status(400).send({ error }));
    });

    app.get('/access', function(req, resp) {
        const accessDao = new AccessDao(db);

        accessDao.lista()
                 .then(access_list => resp.send(access_list))
                 .catch(error => resp.status(400).send({ error }));
    });

    app.get('/access/:id', function(req, resp) {
        const id = req.params.id;
        const accessDao = new AccessDao(db);

        accessDao.buscaPorId(id)
                 .then(access_list => resp.send(access_list))
                 .catch(error => resp.status(400).send({ error }));
    });
};