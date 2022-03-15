Requisitos funcionais RF
Cadastrar carros.


Requisitos não funcionais - RNF



Regra de negócio - RN
Não deve ser possível cadastrar um carro com um placa já existe.

#deletar banco de dados
drop table rentals;
drop table cars_image;
drop table specifications_cars;
drop table cars;
drop table categories;
drop table specifications;
drop table users_tokens;
drop table users;
delete from migrations;



insert into users 
(id, name, created_at, driver_license, email, password, avatar, "isAdmin") 
values ('fbe221be-ffca-4488-968e-ed78266d1dce', 'admin', now(),'656560', 'contato@heldermorais.com.br', '$2b$08$YayC7TZ6IcEqLfTzFCFuoefgbsDSywPiwu5tLculoIA/r3W1oOU7q',null, true);


insert into specifications (created_at,description,name, id ) values (now(), 'conexão com a internet por wifi', 'WIFI', 'f4e98cd1-f0e0-4bb5-982d-5e214553fba1');

insert into categories (id, name, description, created_at) values ('ca575242-0c91-4eb8-954d-75f976484fc7', 'hatch', 'carro curto', now());

insert into cars (id, name,description, daily_rate, license_plate, fine_amount, brand, category_id) 
values ('027d5158-af2f-45e6-a388-18c682054909','Carro admin', 'Carro do admin',10,'HADM 1999',100,'Renault','ca575242-0c91-4eb8-954d-75f976484fc7');


"test": "SET NODE_ENV=test&&jest --runInBand --detectOpenHandles"
"test": "SET NODE_ENV=test&&jest --runInBand --detectOpenHandles",


#criar usuário administrador
 yarn seed:admin

#ormconfig.json - antigo.
 "entities": ["./src/modules/**/entities/*.ts"],


{
    "email": "xhelder@gmail.com",
    "password": "1234"
}
