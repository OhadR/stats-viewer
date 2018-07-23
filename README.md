stats-viewer
====================

This project is a web-app that should be deployed on a Servlet container. It containts ONLY FRONTEND. 

It creates AJAX calls to another app - "/MARS/Rest/System/data/ohads" - and recvieves a JSON with statistics data and draws 
a chart with the data [Bonus(USD) / Date]

# How to run? #

## Running the Server ##
As mentioned, this is a web application, so it should be deployed on a servlet container such as Tomcat.

The easiest way is to use tomcat-maven-plugin, by 
    
    ...>mvn tomcat7:run
