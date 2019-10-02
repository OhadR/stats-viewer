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

    
# Mass creation of cases (+ user assignment)

the flow: first generate **case name prefix**. it will be the prefix for all cases, and the suffix is the counter. example for case
name is: X0df1_1. 'X0df1' is the prefix. we also use this prefix for the new-created user, which its name is 'user_X0df1'.

After we generate this prefix-String, we create the user. If the action is successful, we start a loop to create the cases, and for each case 
we assign the user that was created. So the user is unique for this test. Each test has its own user. 


# Application Screenshot

![screenshot](/app-screenshot.JPG)