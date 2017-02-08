set terminal png size 800,500 enhanced font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"
set output '/tmp/output.png'
set xdata time
set timefmt "%H:%M:%S"
set style data lines

set xtics rotate by 45 border offset -2.5,-1.1 font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"  out nomirror

set ytics font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"  out nomirror

plot '/tmp/eth0.tmp' using 1:2 title 'eth0 in', '/tmp/eth1.tmp' using 1:2 title 'eth1 in', '/tmp/eth2.tmp' using 1:2 title 'eth2 in', '/tmp/eth0.tmp' using 1:3 title 'eth0 out', '/tmp/eth1.tmp' using 1:3 title 'eth1 out', '/tmp/eth2.tmp' using 1:3 title 'eth2 out'
