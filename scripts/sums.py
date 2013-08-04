import redis

"""
a script to sum all the weights in a redis sorted set
starting from the smallest weight and storing the cumulative sum for each weight 
"""
r = redis.StrictRedis(host='localhost', port=6379, db=0)


total=1;

for i in range(0,5000000,100000):
	result = r.zrangebyscore('sorted_total_rando','-inf','+inf',start=i,num=100000,withscores=True)
	print i,total
	for key,pop in result:
		total = total+pop
		r.zadd('summed_total_rando',float(total),key);


	

