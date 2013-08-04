#!/bin/sh
kill -9 `ps aux | grep [s]lurp | awk '{print $2}'`
