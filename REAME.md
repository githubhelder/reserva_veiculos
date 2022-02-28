Requisitos funcionais RF
Cadastrar carros.


Requisitos não funcionais - RNF



Regra de negócio - RN
Não deve ser possível cadastrar um carro com um placa já existe.

#deletar banco de dados
drop table specifications_cars;
drop table cars;
drop table categories;
drop table specifications;
drop table users;
delete from migrations;

#criar usuário administrador
 yarn seed:admin

 
