
# Integration of API Connect with OpenId Connect provider ( Google+)

One can secure the APIs using one or more authentication providers implmementing OpenId Connect protocol using API Connect
policies. In this example we will integrate with Google+.  This can be easily extended to support multiple providers and adding 
headers to identify the identity provider when invoking the secured APIs with the ID Token in the Authorization header.

## Steps to be followed.
1. Deploy an application with an endpoint (e.g. /token ) which initiates the OAuth exchange with Google and returns the access_token and id_token in response.
  - sample app under [GoogleOAuthClient](/OpenIdConnectIntegration/GoogleOAuthClient)
  - Follow the steps to [deploy the OAuthClient](#deployOAuthClient)
1. Have an endpoint in the API which provides the ID Token once the user ( resource owner ) authenticates and provides consent.
  - Gateway assembly for this endpoint has an invoke policy which points to the client application ( Google OAuth client ) 
  - This client application takes care of OAuth exchange with Google and returns the ID token and access_token in resonse
2. For other APIs, have a assembly section which takes care of extracting and validating the ID token
  - In the Gateway assembly, use invoke to get the public certs of the provider ( google ) 
  - Use gatewayscript to extract the token , decode it and find the ”kid” from the token then set the jwk-key to that key from the keyset returned above
  - Use the JWT-Validate policy to verify the JWT including the issuer and audience claims.
  - Use invoke policy to trigger the required API if  JWT validation is successful else set  response code to ”401” – Unauthorized
3. The API consumers need to use the token endpoint to get the token and use that in the Authorization header for all protected APIs        
        

        
<a name="deployOAuthClient">
## Deploy OAuth Client
</a>

1. Clone the project using git clone https://github.com/sachinjha/apiconnect
2. Open a terminal and go to folder OAuthClient
3. Register an OAuth Client app in [Google APIs](https://developers.google.com/identity/protocols/OpenIDConnect)
4. Replace the values of CLIENT_ID and CLIENT_SECRET in app.js with the values obtained in step 3.
5. Type in <a name="pushapp">cf push <app name for OAuthClient></a>  
6. Ensure that the app is running.


<a name="ImportsampleAPI">
## Steps to import the sample API in API Manager
</a>

1. Download the file [google-openid-connect-secured-api.yaml](/OpenIdConnectIntegration/google-openid-connect-secured-api.yaml).
2. Go to bluemix dashboard and select the API Connect service instance.
3. Click on Drafts link 
4. Click on Add link and select the option to "Import existing Open API" and select the file "google-openid-connect-secured-api.yaml"
5. Click on the Design tab 
6. Click on Properties link in the left navigation and edit the value of property <token-url-host> and set it to the hostname 
for the token application obtained in step <3> of [Deploy OAuth Client](#deployOAuthClient)
7. Publish the Product and API to a catalog


<a name="TestTheAPI">
## Test the API 
</a>


1. Go to the developer portal for the catalog, complete registration and then subscribe to teh API product with name "google-openidc-secured-api-product (v1.0.0)" 
2. Select the API to test. You should see 2 apis as show in image below
  - /token
  - /sample
  
  [<img src="/OpenIdConnectIntegration/images/token.png" width="600"/>](#token)
3. Copy the complete URL for /token API and paste it in browser
4. It should redirect you to login using your google Id and then provide consent to access your profile information to your GoogleOAuthClient app
5. Once you do that, you will get redirected to page which has the "access_token" and "id_token" in response.
6. Copy the value of "id_token".  Go to the developer portal and select /sample API
7. Enter the value of Authorization header in the format i.e.  "Bearer <id_token>"  replacing id_token with the value copied in 6.
[<img src="/OpenIdConnectIntegration/images/sample.png" width="600"/>](#token)
8. click on Invoke. In response you should see the response for /sample end point. 

<a name="realScenario">
## How to extend this for a real scenario
</a>

1. Instead of "/sample" you can have any other endpoint that you want to secure. 
2. You just need to update the configuration of "proxy" policy in the "otherwise" case in the API Assembly.
3. One endpoint for GoogleOAuthClient can support multiple APIs
4. Each API  will have 
  - one endpoint  i.e "/token" which internally invokes the GoogleOAuthClient and gets back the id_token.
  - other endpoints in the API which internally invoke the  API application built using "apic developer toolkit" or using any other means.

