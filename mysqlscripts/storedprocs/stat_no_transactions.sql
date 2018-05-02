drop procedure stat_no_transactions;

DELIMITER $$
 
CREATE PROCEDURE stat_no_transactions ()
BEGIN

  select left(from_unixtime(transactiontime),10),count(*)
     from transaction
    group by left(from_unixtime(transactiontime),10);  

END$$
 
DELIMITER ;


