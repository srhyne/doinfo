#!/bin/bash

# Architecture
arch=$(uname -m)

# OS/Kernel
kern=$(uname -s)

# Determine installation binary  
if [[ "$arch" == "x86_64" && "$kern" == "Linux" ]]; then
    binary=program-x86_64-linux
elif [[ "$arch" == "x86_64" && "$kern" == "Darwin" ]]; then
    binary=program-x86_64-osx 
elif [[ "$arch" == "aarch64" && "$kern" == "Darwin" ]]; then
    binary=program-aarch64-osx
elif [[ "$arch" == "x86_64" && "$kern" == "MINGW64"* ]]; then 
    binary=program-x86_64-windows
else
    echo "Unsupported architecture/OS"
    exit 1
fi

# Download and install
curl -sL https://raw.githubusercontent.com/srhyne/doinfo/main/builds/$binary/doinfo -o program
chmod +x program
sudo mv program /usr/local/bin

echo "Installation complete!"