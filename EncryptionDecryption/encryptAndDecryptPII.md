## Encryption and Decryption of PII in API Connect Gateway.

One of the requirements of PCI DSS compliance is encryption and decryption of PII data. API gateway should be able to take care of this  instead of each API application having to hahandle that. If you are using the Datapower gateway with API Connect ( stand alone or on Bluemix ) , you have 2 built in policies which can be used to perform encryption / decryption of specific fields 

You can choose either of 
- xslt
- gatewayscript

In this example we will see how to use gatewayscript to achieve encryption and decryption of specific fields.

## Steps to Try out the sampl APIs

There are 2 sample APIs under the folder [/apiconnect/EncryptionDecryption](/apiconnect/EncryptionDecryption)

1. Using [Shared secret key ( HS256 alg )](#symmetric) 
2. Using [Asymmetric key ( RSA alg)](#asymmetric)

The steps for both the approaches are similar. Only the algorithms and the keys would differ.

<a name="asymmetric">
## Import API  encrypt-decrypt-fields-asymmetric-key(RSA) 1.0.0 
</a>

1. Clone the apiconnect project if not already done.
2. Go to API Manager in API Connect and click on Add -> Import Existing Open API  and select the file  encrypt-decrypt-fields-asymmetric-key_1.0.0.yaml
3. You can go to the assembly tab to see how /encrypt and /decrypt APIs are handled 
  -  Key pair has been generated from this web site [https://mkjwk.org/](https://mkjwk.org/)
  -  The gatewayscript is used to modify a particular field "ssn" in the incoming payload for /encrypt method.
  -  Similarly the "ssn" field is decrypted in the incoming payload for /decrypt method.
4. Add the API to a default product and publish the API
5. Navigate to the developer portal and try out the encrypt API with generated schema.
6. The response shows a json with "ssn" field encrypted 
7. Copy the output from above and use that as input for /decrypt API 
8. The response would show the original payload with the "ssn" field decrypted.
9. The API can be extended to invoke the actual endpoints using built in policies like "Invoke" and "Proxy"


<a name="symmetric">
## Import API encrypt-decrypt-fields-shared-symettric-key_1.0.0.yaml
</a>

- Follow the same steps as above using the file encrypt-decrypt-fields-shared-symettric-key_1.0.0.yaml


