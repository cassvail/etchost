# etchost

[![Build Status](https://travis-ci.org/cassvail/etchost.svg?branch=master)](https://travis-ci.org/cassvail/etchost)

Simple cli library to allow, fast allow/block of domains in /etc/hosts by adding, commenting and uncommenting ```127.0.0.1 host``` entries

OS Support:
* MacOS/Linux: ```/etc/hosts```
* Windows: ```C:/Windows/System32/drivers/etc/hosts```

Node Support >= 4.2.0

## install

```bash
npm install -g etchost 
``` 

## usage

```root``` privilege is required to modify ```hosts``` file

```bash
etchost [options] <hostname> [hostnames...]

  Options:

    -a, --allow  block host
    -b, --block  allow host
    -h, --help   output usage information

```

Toggle allow/block host by commenting/uncommenting ```127.0.0.1 domain.com``` entry
```bash

etchost domain.com

```