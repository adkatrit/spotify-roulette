spotify-roulette
================

Get completely random spotify tracks.
It uses spotify's search feature to scrape track uri's and their popularity.

Disclaimer: hard coded to only injest US region tracks.  Reasonable pull requests accepted.



First you run slurp.js to connect the urbandictionary.com/random.php result to the search function of spotify.
the results are then streamed to redis for your listening pleasure.


I use this for monitoring the url ingestion
```bash
watch -n1 'redis-cli scard sorted_total_rando && free -m'
```

This will show you, every second, the total tracks you've slurped and your current ram usage
```bash
Every 1.0s: redis-cli scard sorted_total_rando && free -m                                                                                                                                                                                          Thu Jul 25 02:16:22 2013

1082631
             total       used       free     shared    buffers     cached
Mem:           590        415        174          0          7         65
-/+ buffers/cache:        342        248
Swap:            0          0          0


```

#How It does it
It uses urbandictionary.com/random.php and instead of following the 302 redirect to a random page, It searches spotify and streams the result to a sorted set in redis.  The sorted set is ranked by popularity.  When all needed urls are scraped, /scripts/sum.py is run to generate the cumulative frequency distribution from which we will draw to get a weighted random lookup.
When you click for a random song, a random number is chosen between 5 and the sum of all popularity values on spotify.  The resulting number is used as the min in [ZREVRANGEBYSCORE](http://redis.io/commands/zrevrangebyscore) to draw from the cumulative frequency distribution above.
For getting a playlist, this is done multiple times.

##Updates
Converted all spotify front-end to spotify hosted embeds.

Generate a random playlist!

Weighted Random lookup is functional.  Select tracks pseudo-randomly based on track popularity, the higher the popularity, the more likely it is you'll get that track.

You can now use http://suckmydata.com/random  to be 302 redirected to a completely random spotify track.   
This is useful for the ability to create a "spotify roulette" browser bookmark.  This can also be used as a pseudo-app for iphone by using the 'Add to Home' feature in safari.

You won't be able to 'Add to Home' without tricking your iphone safari browser to going to the page when you have no internet connection,  enabling the internet connection, and then quickly refreshing and hitting 'Add to Home'.
