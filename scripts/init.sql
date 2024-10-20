create table vehicles (
    id serial primary key,
    model varchar(100) not null,
    year integer not null,
    plateNumber varchar(10) not null
);

create table department (
    id serial primary key,
    name varchar(100) not null
);

INSERT INTO "user"(
	 role, email, username, "fullName", password)
	VALUES ('admin', 'bernardo@gmail.com', 'zphek', 'Bernardo Báez', '$2b$11$7gwN.BYwxzhFvcwt.alVcuhTOiAONLlWmXJYP3CUJIdcykHuXOU0i');

INSERT INTO vehicles (model, year, plateNumber)
VALUES
('Toyota Camry', 2020, 'ABC1234'),
('Honda Civic', 2018, 'XYZ5678'),
('Ford F-150', 2022, 'LMN3456'),
('Chevrolet Malibu', 2019, 'JKL9876'),
('Nissan Altima', 2021, 'QRS2345'),
('BMW X5', 2023, 'TUV8765');

INSERT INTO department (name)
VALUES('Ventas'),
('Finanzas'),
('TI'),
('RRHH');
