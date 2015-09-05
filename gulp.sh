#!/bin/bash
arg=$1

path="/vagrant"
cmd="cd $path && gulp $arg"

##vagrant up
vagrant ssh -c "$cmd"