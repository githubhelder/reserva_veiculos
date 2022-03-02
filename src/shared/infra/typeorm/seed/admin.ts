import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";


async function create() {
    //localhost - em virtude do motivo --> o DOCKER entra em conflito com TYPEORM
    //solução - tem que por o nome do serviço que está no arquivo docker-compose.yml
    const connection = await createConnection("database");

    const id = uuidV4();
    //console.log(id);
    const password = await hash("HADM2022afm@", 8);

    await connection.query(`
        INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
        VALUES (
            '${id}',
            'admin',
            'contato@heldermorais.com.br',
            '${password}',
            true,
            '0123456789',
            'now()'
        )
    `);

    await connection.close;

}

create().then(() => console.log("User admin created!"));
