class LivroDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(user) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO users (
                    name, 
                    tag,
                    password
                ) values (?, ?, ?)
                `,
                [
                    user.name,
                    user.tag,
                    user.password
                ],
                function (err) {                
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o usuário!');
                    }
                                        
                    resolve(this.lastID);
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM users',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os usuário!');

                    return resolve(resultados);
                }
            )
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM users
                    WHERE id = ?
                `,
                [id],
                (erro, user) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }
                    return resolve(user);
                }
            );
        });
    }

    atualiza(user) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE users SET
                name = ?,
                tag = ?,
                password = ?
                WHERE id = ?
            `,
            [
                user.name,
                user.tag,
                user.password,
                user.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o usuário!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM users
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o usuário!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;