const USER_ACCESS_QUANTITY_SQL = `select id
                                  ,      name
                                  ,      count(1) quantity
                                  from    users
                                  inner join access a on users.id = a.user_id
                                  where status = 'A'
                                  group by id
                                  ,        name`;

const TYPE_ACCESS_QUANTITY_SQL = `select type
                                  ,      count(1) quantity
                                  from    users
                                  inner join access a on users.id = a.user_id
                                  where status = 'A'
                                  group by type`;


class ReportDao {

    constructor(db) {
        this._db = db;
    }

    listUserAccessQuantitySql() {
        return new Promise((resolve, reject) => {
            this._db.all(
                USER_ACCESS_QUANTITY_SQL,
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os acessos!');

                    return resolve(resultados);
                }
            )
        });
    }

    listTypeAccessQuantitySql() {
        return new Promise((resolve, reject) => {
            this._db.all(
                TYPE_ACCESS_QUANTITY_SQL,
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os acessos!');

                    return resolve(resultados);
                }
            )
        });
    }

}

module.exports = ReportDao;