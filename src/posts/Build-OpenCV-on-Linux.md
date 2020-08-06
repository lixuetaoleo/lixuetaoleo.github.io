---
title: Build OpenCV on Linux
titleImage:
categories:
  - Software Development
date: 2019-07-25 20:51:03
tags: 
  - OpenCV 
  - Linux
---
### input these commands in terminal
   
1.     sudo apt-get install build-essential
2.     sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
3.     cd ~/opencv
4.     mkdir build
5.     cd build
6.     cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..
7.     make -j"n" # n represents the number of YOUR CPU threads
8.     sudo make install

done

