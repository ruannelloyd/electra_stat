drop procedure stat_no_addresses;

DELIMITER $$
 
CREATE PROCEDURE stat_no_addresses ()
BEGIN
    create temporary table tmp_wallet_detail (
      walletaddress varchar(150),
      walletamount decimal(30,18),
      mintransactiondate datetime,
      maxtransactiondate datetime,
      transactioncount bigint);

    create temporary table tmp_wallet (
      walletaddress varchar(150),
      walletbalance decimal(30,18),
      lasttransaction datetime,
      firsttransaction datetime,
      transactioncount bigint);


  insert into tmp_wallet_detail
   select walletaddress, sum(-amount), max(from_unixtime(transactiontime)), count(*)
     from transaction_in a, transaction b
    where a.transactionid = b.transactionid
   group by walletaddress;  

  insert into tmp_wallet_detail
   select walletaddress, sum(amount), max(from_unixtime(transactiontime)), count(*)
     from transaction_out a, transaction b
    where a.transactionid = b.transactionid
   group by walletaddress;

   create index tmp_wallet_detail_n1 on tmp_wallet_detail(walletaddress);

    insert into tmp_wallet
   select walletaddress, sum(walletamount), max(transactiondate), min(transactiondate),sum(transactioncount)
     from tmp_wallet_detail
   group by walletaddress;  

   select * from tmp_wallet order by walletbalance DESC limit 10;
END$$
 
DELIMITER ;


