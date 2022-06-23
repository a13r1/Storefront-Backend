create table users(
    id serial primary key,
    first_name varchar(256) not null,
    last_name varchar(256) not null,
    password varchar(256) not null
);