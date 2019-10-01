#set terminal png size 800,225 enhanced font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,8"
set terminal png size 800,225 enhanced font "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf,8"
set output '/tmp/output.png'
set xdata time
set timefmt "%H:%M:%S"

set object 1 rectangle from screen 0,0 to screen 1,1 lw 2 fillcolor  rgb"#eeeeee" fillstyle border rgb"#aaaaaa"  behind

set style data lines
set grid ytics mytics
set mytics 2
set grid

#set xtics rotate by 45 border offset -2.5,-1.1 font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,8"  out nomirror

#set ytics font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,8"  out nomirror

set style line 1 lt rgb "#AA0000" lw 2 pt 3 ps 0.5


#plot '/tmp/eth0.tmp' using 1:2 title 'eth0 in', '/tmp/eth1.tmp' using 1:2 title 'eth1 in', '/tmp/eth2.tmp' using 1:2 title 'eth2 in', '/tmp/eth0.tmp' using 1:3 title 'eth0 out', '/tmp/eth1.tmp' using 1:3 title 'eth1 out', '/tmp/eth2.tmp' using 1:3 title 'eth2 out','/tmp/eth1.mitjana.tmp' using 1:2 title 'eth1 in media','/tmp/eth1.mitjana.tmp' using 1:3 title 'eth1 out media' ls 1
plot '/tmp/eth0.tmp' using 1:2 title 'eth0 in', '/tmp/eth1.tmp' using 1:2 title 'eth1 in', '/tmp/eth0.tmp' using 1:3 title 'eth0 out', '/tmp/eth1.tmp' using 1:3 title 'eth1 out', '/tmp/eth1.mitjana.tmp' using 1:2 title 'Salida media','/tmp/eth1.mitjana.tmp' using 1:3 title 'Entrada media' ls 1
