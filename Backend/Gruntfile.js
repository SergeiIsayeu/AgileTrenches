var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
   lambda_invoke: {
      default: {
         options: {
            file_name: 'app.js'
         }
      }
   },
   lambda_deploy: {
      default: {
         arn: 'arn:aws:lambda:us-east-1:746132205570:function:GruntDeploymentTests',
         options:{
           profile: 'deploy'
         }
      }
   },
   lambda_package: {
      default: {
   }
   }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy'])
