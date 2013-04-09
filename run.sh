#!/bin/sh
cd `dirname $0`
echo $$ > pid
echo "Starting..."
java -Djava.awt.headless=true -classpath .:./lib/pircbot.jar:./lib/gson.jar org.jibble.socnet.SocialNetworkBot ./config.ini > /dev/null
# java -Djava.awt.headless=true -classpath .:./lib/pircbot.jar:./lib/gson.jar org.jibble.socnet.SocialNetworkBot ./config_RIZON.ini > /dev/null
# java -Djava.awt.headless=true -classpath .:./lib/pircbot.jar:./lib/gson.jar org.jibble.socnet.SocialNetworkBot ./config_EFNET.ini > /dev/null
# java -Djava.awt.headless=true -classpath .:./lib/pircbot.jar:./lib/gson.jar org.jibble.socnet.SocialNetworkBot ./config_FREENODE.ini > /dev/null
