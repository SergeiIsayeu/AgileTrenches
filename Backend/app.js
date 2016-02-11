exports.handler = function (event, context) {
    console.log('Starting');
    console.log('Passed request:');
    console.log(event);
    
    var nconf = require('nconf');
    var AWS = require('aws-sdk');
    // First consider commandline arguments and environment variables, respectively.
    nconf.argv().env();
    
    // Then load configuration from a designated file.
    nconf.file({ file: 'config.json' });
    var secretKey = nconf.get('auth:secretKey');
    var clashCallerUri = nconf.get('clashCallerUri');
    var passedInSecretKey = event.secretKey;
    var newWarId = event.warId;
    console.log('Comparing', secretKey, passedInSecretKey);
    var response = JSON.stringify({ isSuccessful : false, message: "Error while processing request" });
    if (secretKey === passedInSecretKey) {
        //update file with war id
        var updatedDataFile = JSON.stringify({ clashCallerUri: clashCallerUri, warId: newWarId, warUri: clashCallerUri + newWarId});
        console.log(updatedDataFile);
        //saving file as S3 bucket
        var s3 = new AWS.S3();
        var params = { Bucket: 'trenches.isayeu.com', Key: 'data.json', Body: updatedDataFile, ACL: 'public-read' };
        s3.putObject(params, function (err, data) {
            
            if (err) {
                console.log(err)
                response = JSON.stringify({ isSuccessful : false, message: "Valid secret key, error saving config file to a bucket" });
            }
            else {
                console.log("file saved successfully");
                response = JSON.stringify({ isSuccessful : true, message: "Valid secret key, war id updated successfully" });
            }
            console.log(response);
            context.succeed(response);
        });
    }
    else {
        //respond with 'Not OK' response
        response = JSON.stringify({ isSuccessful : false, message: "Invalid secret key" });
        console.log(response);
        context.succeed(response);
    }
  

}

function fake_context() {
    fake_context.prototype.succeed = function (message) {
        console.log(message);
    }
}
var request = { secretKey: 'trenchesRock', warId : 'zzyyx' };
var AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: 'AKIAIK7PK6MOZR22WJPQ', secretAccessKey: 'SDmlN4jgHjHfWwrBDKR/FVKqldvzTtuvr/IWMKtl' });
exports.handler(request, new fake_context());