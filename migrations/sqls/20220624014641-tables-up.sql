create table products(
    id serial primary key,
    name varchar(256) not null,
    price float(2) not null
);

create table users(
    id serial primary key,
    first_name varchar(256) not null,
    last_name varchar(256) not null,
    password varchar(256) not null
);

create table orders(
    id serial primary key,
    product_id int not null,
    quantity int not null,
    user_id int not null,
    status varchar(8) not null,
    foreign key(product_id) references products(id),
    foreign key(user_id) references users(id)
);
