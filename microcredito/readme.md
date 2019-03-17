script do banco:

create database microcredito;
use microcredito;

create table if not exists empreendedoras(
id int auto_increment primary key,
nome varchar (100),
cpf decimal (11,0),
genero varchar (15),
estado_civil varchar (15),
data_de_nascimento date,
email varchar (100),
trabalha_registrada boolean,
faturamento decimal (10,0),
produz_algo boolean ,
tipo_servico  varchar (200),
score decimal (10,0)
);




create table if not exists bancos (
id int auto_increment primary key,
nome varchar (100),
cnpj decimal (11,0),
taxa_de_juros decimal (5,0)
);