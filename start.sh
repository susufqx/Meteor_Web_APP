#!/bin/sh
clear
#python test.py
exec meteor --settings settings.json $@ --port 8087
