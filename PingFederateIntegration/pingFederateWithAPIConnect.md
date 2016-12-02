# Securing API Connect APIs with ping Federate.

## API Consumer actions
1. Register with PingFederate as a client.
2. Get the access_token from PingFederate by performing the required steps.
3. Set the access_token in the Authorization header when invoking the APIs 

## API Provider actions
1. Extract the access_token from the request header of secured APIs
2. Validate the access_token by invoking the PingFederate API to validate access token.
3. The logic to extract and validate the token should be in the gateway layer if using a gateway.

## Try the sample API

1. Clone the apiconnect project if not already done.
1. Import sample API /PingFederateIntegration/pingfederate-secured-api_1.0.0.yaml via API Manager.
2. Go to the Design tab and click on Properties in the left navigation.
3. Update the value for verifyAccessURL and set it to the value provided by PingFederate. If you don't have access to PingFederate but just want to test the API against a dummy endpoint. Then follow the steps to [deploy the Dummy PingFedereate endpoint](#deployPingFederate) 
4. If you are on API Connect in Bluemix, then to see logging messages, you need to deploy a simple bluemix application. Refer to the steps in [Deploy logging endpoit](#loggingEndpoint) in order to deploy the application that will show the log messages from gateway script. On bluemix you don't have direct access to Datapower gateway and so the logs have to directed to a separate application.
5. If you are on stand alone API Connect , you can comment out the variable "console" in the gatewayscript which validates the access token. Here you have direct access to datpower gateway, so you can access the logs and don't need to send the log messages to logging endpoint.
6. If on API Connect in Bluemix, update the Property debugURL and point it to the route obtained by pushing logging endpoint to bluemix in step 4.
7. Add the API to default product and publish the product to a catalog of choice.
8. Go to the developer portal and test or use the "Explore" link in API manager to test the API.
9. Using your API consumer client, generate access_token by completing the OAuth exchange steps with PingFederate.
10. Invoke the secured sample API by using the access token in Authorization header.

<a name="loggingEndpoint">
Deploy Logging Endpoint 
</a>  

1. In the terminal go to folder "apiconnect/LoggingEndpoint/"
2. cf push LoggingEndpoint
3. Once the application is deployed, you will have the route which can be used to send log messages from gatewayscript.


<a name="deployPingFederate">
Deploy the Dummy PingFedereate endpoint
</a>

1. In a terminal, go to folder "apiconnect/PingFederateIntegration/DummyPingFederateEndpoint"
2. Type in "cf push dummyPingFederateEndpoint" 
3. Once the application is deployed use the route to set verifyAccessURL in API definition.
