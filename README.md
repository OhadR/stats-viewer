stats-viewer
====================

This project is a web-app that should be deployed on a Servlet container. It containts ONLY FRONTEND. 

~~It creates AJAX calls to another app - "/MARS/Rest/System/data/ohads" - and receives a JSON with statistics data and draws 
a chart with the data [Bonus(USD) / Date]~~

It creates AJAX calls to another app - "/rest-api/..." - and receives a JSON with (statistics) data and draws 
a chart with the data.

# How to run? #

## Running the Server ##
As mentioned, this is a web application, so it should be deployed on a servlet container such as Tomcat.

The easiest way is to use tomcat-maven-plugin, by 
    
    ...>mvn tomcat7:run

## Debug within Eclipse

See how in this README: https://gitlab.com/OhadR/activemq-spring-sandbox#debug-within-eclipse

    
# Application Screenshot

![screenshot](/app-screenshot.JPG)