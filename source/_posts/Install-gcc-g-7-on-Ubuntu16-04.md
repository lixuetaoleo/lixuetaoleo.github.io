---
title: Install gcc & g++ 7 on Ubuntu16.04
categories:
  - Software Development
date: 2019-09-10 11:34:36
tags:
  - Linux
---
Reference: https://gist.github.com/jlblancoc/99521194aba975286c80f93e47966dc5

Run the following in the terminal:

Install the gcc-7 packages:

    sudo apt-get install -y software-properties-common
    sudo add-apt-repository ppa:ubuntu-toolchain-r/test
    sudo apt update
    sudo apt install g++-7 -y

Set it up so the symbolic links gcc, g++ point to the newer version:

    sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 60 --slave /usr/bin/g++ g++ /usr/bin/g++-7 
    sudo update-alternatives --config gcc
    gcc --version
    g++ --version

Done!