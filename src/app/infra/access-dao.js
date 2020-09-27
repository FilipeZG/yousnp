class UserDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(user_id, type) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO access (user_id, date, type) values (?, strftime('%d/%m/%Y %H:%M', 'now','localtime'), ?)
                `,
                [
                    user_id,
                    type
                ],
                function (err) {                
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível salvar o acesso!');
                    }
                                        
                    resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM access',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os acessos!');

                    return resolve(resultados);
                }
            )
        });
    }

    buscaPorId(user_id) {

        return new Promise((resolve, reject) => {
            this._db.all(
                `
                    SELECT * FROM access WHERE user_id = ?
                `,
                [user_id],
                (erro, user) => {
                    if (erro) {
                        return reject('Não foi possível encontrar os acessos do usuário!');
                    }
                    return resolve(user);
                }
            );
        });
    }
}

module.exports = UserDao;