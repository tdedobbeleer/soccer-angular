#!/bin/bash
# Run in ws dir when server is running
JAR="/tmp/swagger-codegen-cli.jar"
wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.0/swagger-codegen-cli-2.3.0.jar -O $JAR
java -jar $JAR generate -i http://localhost:8080/api/v1/api-docs -l typescript-angular
rm -rf $JAR