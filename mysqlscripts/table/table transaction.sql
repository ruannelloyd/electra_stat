drop table transaction;

create table transaction (
  blocknumber bigint,
  transactionid varchar(250),
  version bigint,
  locktime bigint,
  transactiontime bigint,
  blockhash varchar(255),
  node_time int,
  creation_date datetime default now(),
  status varchar(20) default 'ACTIVE',
  PRIMARY KEY (transactionid));


    select * from transaction_pool;