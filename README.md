# LaunchDarkly and AWS Summit Demo 

* Start Docker on your laptop 
* Clone this repository (`git clone https://github.com/codyde/ld-aws-summit`)
* Switch to the `ld-aws-summit` directory 
* Update the `image` in the `docker-compose.yaml` file to reflect `ld-summit-frontend:{#}`, replacing the end with your demo station
* Run `docker-compose up` from the cli 

Flags for this application are in the `ld-aws-summit` project, with either the `summit-1` or `summit-2` environments.  

**Remember to reset all flags and refresh the browser between demos** 