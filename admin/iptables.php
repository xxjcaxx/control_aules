<pre>
<?php
echo "\n---------------- GENERAL ---------------\n";
system('sudo iptables -L');
echo "\n---------------- NAT ---------------\n";
system('sudo iptables -t nat -L');

echo "\n---------------- IPtables-save ---------------\n";
system('sudo iptables-save');

echo "\n----------Wondershaper--------\n";
system('sudo wondershaper eth2');

?>


</pre>
