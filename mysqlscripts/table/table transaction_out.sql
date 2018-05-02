drop table transaction_out;

create table transaction_out (
  blocknumber bigint,
  transactionid varchar(250),
  n bigint,
  type varchar(15),
  walletaddress varchar(150),
  amount decimal(30,15),
  creation_date datetime default now(),
  PRIMARY KEY (transactionid,n));


  select * from transaction_pool;