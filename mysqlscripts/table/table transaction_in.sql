drop table transaction_in;

create table transaction_in (
  blocknumber bigint,
  transactionid varchar(250),
  trinid varchar(250),
  vout bigint,
  sequence bigint,
  amount decimal(30,15),
  walletaddress varchar(150),
  coinbase varchar(150),
  creation_date datetime default now(),
  PRIMARY KEY (transactionid,trinid));

create index transaction_in_trnid on transaction_in(trinid,vout);
create index transaction_in_wallet on transaction_in(walletaddress);

