drop table if exists numbers;

create table numbers (
    id int primary key auto_increment,
    name varchar(50) not null,
    number varchar(50) not null,
    balance int not null
);

insert into numbers values 
    (1, 'varun', '9463748596', 30),
    (2, 'roward', '5678494476', 100),
    (3, 'rahul', '8765987609', 500);

drop procedure if exists numberAddOrUpdate;

create DEFINER = `root`@`localhost` procedure numberAddOrUpdate (
    in _id int,
    in _name varchar(50),
    in _number varchar(50),
    in _balance int
)

BEGIN
    if _id = 0 then
        insert into numbers(name, number, balance)
            values (_name, _number, _balance);
        set _id = last_insert_id();
    else
        update numbers
            set 
                name = _name,
                number = _number,
                balance = balance + _balance
            where number = _number;
    end if;
    select _number as 'number';
END