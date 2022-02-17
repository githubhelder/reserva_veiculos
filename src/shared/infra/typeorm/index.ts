import { Connection, createConnection, getConnectionOptions } from "typeorm";

/*
interface  IOptions {
    host: string;
}
    
getConnectionOptions().then(options => {
   const newOptions = options as IOptions;
   newOptions.host = 'database'; //ver em: docker-compose.yml (services: database)
      createConnection({
        ...options,
      });
});
*/

//host= "database"em virtude do motivo --> o DOCKER entra em conflito com TYPEORM
export default async(host= "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    
    //ver em: docker-compose.yml (services: database)
    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
}