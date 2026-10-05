create table artwork (
    id serial primary key,
    title varchar(255), 
    artist varchar(255),
    type varchar(255),
    price decimal(10, 2),
    availability boolean default false
);