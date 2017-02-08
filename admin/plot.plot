set terminal png size 800,500 enhanced font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"
set output './images/graph/output.png'
set xdata time
set timefmt "%H:%M:%S"
set style data lines

set xtics rotate by 45 border offset -2.5,-1.1 font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"  out nomirror

set ytics font "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf,10"  out nomirror

plot './images/graph/eth0.tmp' using 1:2 title 'eth0 in', './images/graph/eth1.tmp' using 1:2 title 'eth1 in', './images/graph/eth2.tmp' using 1:2 title 'eth2 in', './images/graph/eth0.tmp' using 1:3 title 'eth0 out', './images/graph/eth1.tmp' using 1:3 title 'eth1 out', './images/graph/eth2.tmp' using 1:3 title 'eth2 out'
