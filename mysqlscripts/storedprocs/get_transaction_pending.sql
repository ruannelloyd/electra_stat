drop procedure get_pending_transaction;

DELIMITER $$
 
CREATE PROCEDURE get_pending_transaction ()
BEGIN
    declare var_trid varchar(150); 
    select transactionid into var_trid
      from transaction_pool
     where status = 'PENDING'
     order by Creation_Date 
     limit 1;

     update transaction_pool
     	set status = 'PROCESSING'
      where transactionid = var_trid;
END$$
 
DELIMITER ;


call ins_transaction('2',999);