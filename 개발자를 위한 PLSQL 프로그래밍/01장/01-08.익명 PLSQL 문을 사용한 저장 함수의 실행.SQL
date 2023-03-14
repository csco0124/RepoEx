SET ECHO ON
SET TAB OFF
SET SERVEROUTPUT ON

REM ??? PL/SQL???? ??? ????
DECLARE
  v_cnt PLS_INTEGER ;
BEGIN
  v_cnt := get_dept_employee_count(10) ;
  DBMS_OUTPUT.PUT_LINE('??? ??: '|| v_cnt) ;
END ;
/
