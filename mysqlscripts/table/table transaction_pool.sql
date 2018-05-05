drop table transaction_pool;

create table transaction_pool (
 transactionid varchar(250) ,
 node_time  BIGINT,
 creation_date datetime  default current_timestamp() ,
 status   varchar(20)  DEFAULT 'PENDING' ,
  PRIMARY KEY (transactionid));