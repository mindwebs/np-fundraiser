Create .env with
1. PORT = 3720
2. STRIPE_SECRET_KEY
3. STRIPE_PUB_KEY
...

To run the docker file - 

docker image rm -f np_fundraiser  
docker stop np-fundraiser  
docker build -t np_fundraiser .  
docker rm -f np-fundraiser  

docker run -d --expose 3720 --network=ngproxy_default --ip 172.18.0.9 --name np-fundraiser np_fundraiser
