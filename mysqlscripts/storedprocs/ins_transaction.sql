drop procedure ins_transaction;

DELIMITER $$
 
CREATE PROCEDURE ins_transaction (IN p_transactionid varchar(150), p_node_datetime int)
BEGIN
    declare var_isexist INT;
     set var_isexist = 0;
    select ifnull(count(*),0) into var_isexist
      from transaction_pool
     where transactionid = p_transactionid;

     select var_isexist;

     if var_isexist = 0 then
       insert into transaction_pool (transactionid,node_time ) values (p_transactionid, p_node_datetime) ;
     end if;
END$$
 
DELIMITER ;


call ins_transaction('2',999);