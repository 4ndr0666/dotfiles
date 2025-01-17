#!/bin/bash
USER=$(whoami)
pkexec chown -R $USER:$USER "$@"
