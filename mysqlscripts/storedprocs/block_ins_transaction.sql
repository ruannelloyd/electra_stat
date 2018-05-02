drop procedure block_ins_transaction;

DELIMITER $$
 
CREATE PROCEDURE block_ins_transaction (IN p_blocknumber bigint,p_transactionid varchar(150), p_version bigint, p_locktime bigint, p_transactiontime bigint, p_blockhash varchar(255))
BEGIN
    declare var_isexist INT;
     set var_isexist = 0;
    select ifnull(count(*),0) into var_isexist
      from transaction
     where transactionid = p_transactionid;

     select var_isexist;

     if var_isexist = 0 then
       insert into transaction (blocknumber,transactionid,version, locktime,transactiontime, blockhash ) values (p_blocknumber,p_transactionid, p_version,p_locktime, p_transactiontime, p_blockhash) ;
     else
       update transaction
       	  set blocknumber = p_blocknumber,
       	      version = p_version,
              locktime = p_locktime,
              transactiontime = p_transactiontime,
              blockhash = p_blockhash
        where transactionid = p_transactionid;
     end if;

     update transaction a, transaction_pool b
     	set a.node_time = b.node_time
       where a.transactionid = b.transactionid;

     update transaction a, transaction_pool b
     	set b.status='ACTIVE'
       where a.transactionid = b.transactionid;  
END$$
 
DELIMITER ;