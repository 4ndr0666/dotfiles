local socket = require("socket")
local server = socket.bind("localhost", 12345)
print("Server started on localhost:12345")

while true do
    local client = server:accept()
    local message = client:receive()
    print("Received message: " .. message)
    client:close()
end
