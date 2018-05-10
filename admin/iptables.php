<pre>
<?php
//echo "\n---------------- GENERAL ---------------\n";
//system('sudo iptables -L');
echo "\n---------------- Route -n ---------------\n";
system('sudo route -n');

echo "\n---------------- NAT ---------------\n";
system('sudo iptables -t nat -L -v');

echo "\n---------------- IPtables-save ---------------\n";
system('sudo iptables-save | grep -v ACCT'); //llevar els de comptabilitat
?>


</pre>
