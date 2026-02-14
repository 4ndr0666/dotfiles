import os
import socket
import json


def test_wayfire_ipc():
    addr = os.getenv("WAYFIRE_SOCKET")
    client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    client.connect(addr)

    # Example of sending a command to list outputs
    message = {"method": "window-rules/list-outputs", "data": {}}

    data = json.dumps(message).encode("utf8")
    header = len(data).to_bytes(4, byteorder="little")
    client.send(header + data)

    # Read the response
    response_header = client.recv(4)
    response_length = int.from_bytes(response_header, byteorder="little")
    response = client.recv(response_length)

    print("Response:", response.decode("utf8"))

    client.close()


test_wayfire_ipc()
