#!/bin/sh
clear
exec meteor --settings settings.json $@ --port 8087
