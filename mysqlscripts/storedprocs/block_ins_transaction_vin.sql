drop procedure block_ins_transaction_in;

DELIMITER $$
 
CREATE PROCEDURE block_ins_transaction_in (IN p_blocknumber bigint, p_transactionid varchar(255), p_trinid varchar(255), p_vout bigint, p_sequence bigint,p_coinbase varchar(150))
BEGIN
    declare var_isexist INT;
     set var_isexist = 0;
    select ifnull(count(*),0) into var_isexist
    from transaction_in
     where transactionid = p_transactionid
       and trinid = p_trinid;

     select var_isexist;

     if var_isexist = 0 then
       insert into transaction_in (blocknumber,transactionid,trinid, vout,sequence,coinbase) values (p_blocknumber,p_transactionid,p_trinid, p_vout,p_sequence,p_coinbase) ;
     else
       update transaction_in
          set vout = p_vout,
              sequence = p_sequence,
              coinbase = p_coinbase
        where transactionid = p_transactionid
         and trinid = p_trinid;
     end if;

     update transaction_in a,transaction_out b 
       set a.amount = b.amount,
           a.walletaddress = b.walletaddress
     where a.transactionid = p_transactionid
       and a.trinid = p_trinid
       and a.trinid = b.transactionid
       and a.vout = b.n;
END$$
 
DELIMITER ;


