var jose = require('jose');

// get the input from the request

session.input.readASJSON(function(readAsBufferError, jsonData) {
    if (readAsBufferError) {
        console.error('Error on readAsBuffer: ' + readAsBufferError);
    } else {
        

        try {
            //--------------------------------------------------------------------------
            // Example: JWE Object Compact Serialization Format
            //--------------------------------------------------------------------------
            // Create a jweHeader object and specify the encryption algorithm to use

            var jweHdr = jose.createJWEHeader('A128CBC-HS256');
            // Set the algorithm header parameter in the protected header

            jweHdr.setProtected('alg', 'RSA1_5');

            // Set the key configuration object to process the encrypted key
            jweHdr.setKey(jwk-key);

            // Specify which jweHeader defines how to encrypt this message then
            // update the jweEncrypter with the message to be encrypted then
            // encrypt the JWE Encryption object using the compact serialization
            // output_format as specified
            jose.createJWEEncrypter(jweHdr).update(jsonData.ssnnumber).encrypt('compact', function(error, jweCompactObj) {
                if (error) {
                    // An error occurred during the encrypt process and is passed back
                    // via the error parameter since .encrypt is an asynchronous call
                    // write the error to the output context
                    session.reject(error);
                    return;
                } else {
                    jsonData.ssnnumber = jweCompactObj;
                    session.output.write(jsonData);
                }
            }); // encrypt function
        } catch (e) {
            session.reject("jwe-encrypt-compact.js error: " + e);
            return;
        }
    }
}); // readAsJSON
