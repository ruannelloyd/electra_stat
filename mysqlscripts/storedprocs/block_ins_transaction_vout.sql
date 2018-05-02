drop procedure block_ins_transaction_out;

DELIMITER $$
 
CREATE PROCEDURE block_ins_transaction_out (IN p_blocknumber bigint,p_transactionid varchar(255), p_n bigint, p_type varchar(15), p_walletaddress varchar(150), p_amount decimal(30,15))
BEGIN
    declare var_isexist INT;
     set var_isexist = 0;
    select ifnull(count(*),0) into var_isexist
    from transaction_out
     where transactionid = p_transactionid
       and n = p_n;

     select var_isexist;

     if var_isexist = 0 then
       insert into transaction_out (blocknumber,transactionid,n, type,walletaddress,amount) values (p_blocknumber,p_transactionid,p_n, p_type,p_walletaddress,p_amount) ;
     else
       update transaction_out
          set type= p_type,
            walletaddress=p_walletaddress,
            amount=p_amount
       where transactionid = p_transactionid
         and n=p_n;

     end if;
END$$
 
DELIMITER ;

