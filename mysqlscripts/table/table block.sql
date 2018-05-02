drop table block;

create table block (
  blocknumber bigint,
  blockhash varchar(250),
  blocksize bigint,
  blockheight bigint,
  version varchar(5),
  merkelroot varchar(200),
  bits  varchar(50),
  difficulty  decimal(30,15),
  blocktime bigint,
  previousblockhash varchar(200),
  flag varchar(50),
  proofhash varchar(200),
  modifier varchar(200),
  modifierchecksum varchar(20),
  transactioncount bigint,
  blockamount  decimal(30,15),
  node_time int,
  creation_date datetime default now(),
  status varchar(20) default 'ACTIVE',
  PRIMARY KEY (blockhash));


    select * from transaction_pool;