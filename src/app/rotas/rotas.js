const UserDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    
    app.get('/users', function(req, resp) {

        const userDao = new UserDao(db);
        userDao.lista()
                .then(users => resp.send(users))
                .catch(erro => console.log(erro));
    });

    app.get('/users/:id', function(req, resp) {
        const id = req.params.id;
        const userDao = new UserDao(db);

        userDao.buscaPorId(id)
                .then(user => resp.send(user))
                .catch(erro => console.log(erro));
    });

    app.post('/users', function(req, resp) {
        console.log(req.body);
        const userDao = new UserDao(db);
        
        userDao.adiciona(req.body)
                .then(id => resp.send({ id }))
                .catch(erro => console.log(erro));
    });

    app.put('/users', function(req, resp) {
        console.log(req.body);
        const userDao = new UserDao(db);
        
        userDao.atualiza(req.body)
                .then(resp.redirect('/users'))
                .catch(erro => console.log(erro));
    });

    app.delete('/users/:id', function(req, resp) {
        const id = req.params.id;

        const userDao = new UserDao(db);
        userDao.remove(id)
                .then(resp.redirect('/users'))
                .catch(erro => console.log(erro));
    });
};