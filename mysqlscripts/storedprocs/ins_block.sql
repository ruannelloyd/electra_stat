drop procedure ins_block;

DELIMITER $$
 
CREATE PROCEDURE ins_block(IN p_blocknumber bigint, p_blockhash varchar(250),
p_blocksize bigint,
p_blockheight bigint,
p_version varchar(5),
p_merkelroot varchar(200),
p_bits varchar(50),
p_difficulty  decimal(30,15),
p_blocktime bigint,
p_previousblockhash varchar(200),
p_flag varchar(50),
p_proofhash varchar(200),
p_modifier varchar(200),
p_modifierchecksum varchar(20),
p_transactioncount bigint,
p_blockamount  decimal(30,15),
p_node_time int)
BEGIN

    declare var_isexist INT;
     set var_isexist = 0;
    select ifnull(count(*),0) into var_isexist
      from block
     where blockhash = p_blockhash;

     select var_isexist;


     if var_isexist = 0 then
       insert into block (
blocknumber,
blockhash,
blocksize,
blockheight,
version,
merkelroot,
bits,
difficulty ,
blocktime,
previousblockhash ,
flag ,
proofhash ,
modifier ,
modifierchecksum ,
transactioncount ,
blockamount  ,
node_time )
    values (
p_blocknumber,
p_blockhash,
p_blocksize,
p_blockheight,
p_version,
p_merkelroot,
p_bits,
p_difficulty ,
p_blocktime,
p_previousblockhash ,
p_flag,
p_proofhash ,
p_modifier,
p_modifierchecksum ,
p_transactioncount ,
p_blockamount,
p_node_time 
);

     end if;
END$$
 
DELIMITER ;
