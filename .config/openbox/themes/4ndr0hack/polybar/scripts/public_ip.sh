#!/bin/bash

public_ip=$(curl -s http://ipinfo.io/ip)
echo $public_ip
