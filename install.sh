#!/bin/bash

# Architecture
arch=$(uname -m)

# OS/Kernel
kern=$(uname -s)

# Determine installation binary  
if [[ "$arch" == "x86_64" && "$kern" == "Linux" ]]; then
    binary=x86_64-unknown-linux-gnu
elif [[ "$arch" == "x86_64" && "$kern" == "Darwin" ]]; then
    binary=x86_64-apple-darwin
elif [[ "$arch" == "arm64" && "$kern" == "Darwin" ]]; then
    binary=aarch64-apple-darwin
elif [[ "$arch" == "x86_64" && "$kern" == "MINGW64"* ]]; then 
    binary=program-x86_64-windows
else
    echo "Unsupported architecture/OS"
    exit 1
fi

# Download and install
curl -sL https://raw.githubusercontent.com/srhyne/doinfo/main/builds/$binary/doinfo -o doinfo
chmod +x doinfo
sudo mv doinfo /usr/local/bin

echo "Installation complete!"