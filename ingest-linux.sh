#!/bin/sh

for x in `grep processor /proc/cpuinfo|cut -f1`; do sh -c "node slurp.js > ./slurp.log &"; done
