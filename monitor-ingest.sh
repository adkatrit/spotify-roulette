#!/bin/sh
watch -n.1 'redis-cli zcard sorted_total_rando && free -m'
