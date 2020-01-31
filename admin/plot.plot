set terminal png size 800,225 enhanced font "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf,8"
set output '/var/lib/control_aules/output.png'
set xdata time
set timefmt "%H:%M:%S"

set object 1 rectangle from screen 0,0 to screen 1,1 lw 2 fillcolor  rgb"#eeeeee" fillstyle border rgb"#aaaaaa"  behind

set style data lines
set grid ytics mytics
set mytics 2
set grid

set style line 1 lt rgb "#AA0000" lw 2 pt 3 ps 0.5

plot '/tmp/eth0.tmp' using 1:2 title 'eth0 in', \
     '/tmp/eth1.tmp' using 1:2 title 'eth1 in', \
     '/tmp/eth0.tmp' using 1:3 title 'eth0 out', \
     '/tmp/eth1.tmp' using 1:3 title 'eth1 out', \
     '/tmp/eth1.mitjana.tmp' using 1:2 title 'Eixida mitjana', \
     '/tmp/eth1.mitjana.tmp' using 1:3 title 'Entrada mitjana' ls 1
