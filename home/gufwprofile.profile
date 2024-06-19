[fwBasic]
status = enabled
incoming = reject
outgoing = allow
routed = disabled

[Rule0]
ufw_rule = 192.168.1.173 68/udp ALLOW IN Anywhere
description = NetworkManager
command = /usr/sbin/ufw allow in proto udp from any to 192.168.1.173 port 68
policy = allow
direction = in
protocol = udp
from_ip = 
from_port = 
to_ip = 192.168.1.173
to_port = 68
iface = 
routed = 
logging = 

[Rule1]
ufw_rule = 10.120.0.22/udp ALLOW IN 10.120.0.22/udp
description = brave
command = /usr/sbin/ufw allow in proto udp from 10.120.0.22 to 10.120.0.22
policy = allow
direction = in
protocol = udp
from_ip = 10.120.0.22
from_port = 
to_ip = 10.120.0.22
to_port = 
iface = 
routed = 
logging = 

[Rule2]
ufw_rule = 10.120.0.14/udp ALLOW IN 10.120.0.14/udp
description = Openvpn
command = /usr/sbin/ufw allow in proto udp from 10.120.0.14 to 10.120.0.14
policy = allow
direction = in
protocol = udp
from_ip = 10.120.0.14
from_port = 
to_ip = 10.120.0.14
to_port = 
iface = 
routed = 
logging = 

