
#Integration of API Connect with OpenId Connect provider ( Google+)

One can secure the APIs using one or more authentication providers implmementing OpenId Connect protocol using API Connect
policies. In this example we will integrate with Google+.  This can be easily extended to support multiple providers and adding 
headers to identify the identity provider when invoking the secured APIs with the ID Token in the Authorization header.

## Steps to be followed.
1. Deploy an application with an endpoint (e.g. /token ) which initiates the OAuth exchange with Google and returns the access_token and id_token in response.
        * sample app under GoogleOAuthClient 
        * Follow the steps to [deploy the OAuthClient](#deployOAuthClient)
1. Have an endpoint in the API which provides the ID Token once the user ( resource owner ) authenticates and provides consent.
        * Gateway assembly for this endpoint has an invoke policy which points to the client application ( Google OAuth client ) 
        * This client application takes care of OAuth exchange with Google and returns the ID token and access_token in resonse
2. For other APIs, have a assembly section which takes care of extracting and validating the ID token
        * In the Gateway assembly, use invoke to get the public certs of the provider ( google ) 
        * Use gatewayscript to extract the token , decode it and find the ”kid” from the token then set the jwk-key to that key from the keyset returned above
        * Use the JWT-Validate policy to verify the JWT including the issuer and audience claims.
        * Use invoke policy to trigger the required API if  JWT validation is successful else set  response code to ”401” – Unauthorized
3. The API consumers need to use the token endpoint to get the token and use that in the Authorization header for all protected APIs        
        
## Try out the sample google-openid-connect-secured-api 
        
<a link="deployOAuthClient">
##Deploy OAuth Client
</a>

1. Clone the project using git clone <git url>
2. Open a terminal and go to folder OAuthClient
3. Type in "<a link="pushapp">cf push <app name for OAuthClient></a>  
4. Ensure that the app is running.


<a link="Import sample API">
##Steps to import the sample API in API Manager
</a>

1. Go to bluemix dashboard and select the API Connect service instance.
2. Click on Drafts link 
3. Click on Add link and select the option to "Import existing Open API" and select the file "google-openid-connect-secured-api.yaml"
4. Click on the Design tab 
5. Click on Properties link in the left navigation and edit the value of property <token-url-host> and set it to the hostname 
for the token application obtained in step <3> of [Deploy OAuth Client](#pushapp)
6. Publish the Product and API to a catalog


<a link="Test the API">
Test the API assembly
</a>
6. 
