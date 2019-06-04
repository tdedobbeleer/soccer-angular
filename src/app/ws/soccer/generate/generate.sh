#!/bin/bash
# Run in ws dir when server is running
JAR="/tmp/swagger-codegen-cli.jar"
wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O $JAR
java -jar $JAR generate -i http://localhost:8080/api/v1/api-docs -l typescript-angular --additional-properties ngVersion=8.0.1
rm -rf $JAR
