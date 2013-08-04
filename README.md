spotify-roulette
================

Get completely random spotify tracks.

Disclaimer: hard coded to only injest US region tracks.  Most reasonable pull requests accepted.

The code is a little messy but it's short and sweet. 
[Spotify Roulette](http:/suckmydata.com)

for a 302 instead:
http://suckmydata.com/random

First you run slurp.js to connect the urbandictionary.com/random.php result to the search function of spotify.
the results are then streamed to redis for your listening pleasure.


I use this for monitoring
```bash
watch -n1 'redis-cli scard total_rando && free -m'
```

This will show you, every second, the total tracks you've slurped and your current ram usage
```bash
Every 1.0s: redis-cli scard total_rando && free -m                                                                                                                                                                                          Thu Jul 25 02:16:22 2013

1082631
             total       used       free     shared    buffers     cached
Mem:           590        415        174          0          7         65
-/+ buffers/cache:        342        248
Swap:            0          0          0


```

#How It does it
It uses urbandictionary.com/random.php and instead of following the 302 redirect to a random page, It searches spotify and streams the result to a set in redis.
When you click for a random song, it is issuing the redis command [SRANDMEMBER](http://redis.io/commands/srandmember)
and returning the result(a spotify url) to some javascript, which then opens a window for you.


##Update
You can now use http://dream.ai/random  to be 302 redirected to a completely random spotify track.   
This is useful for the ability to create a "spotify roulette" browser bookmark.  This can also be used as a pseudo-app for iphone by using the 'Add to Home' feature in safari.

You won't be able to 'Add to Home' without tricking your iphone safari browser to going to the page when you have no internet connection,  enabling the internet connection, and then quickly refreshing and hitting 'Add to Home'.
