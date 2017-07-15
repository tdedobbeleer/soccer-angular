#!/bin/bash
# Run in ws dir when server is running

java -jar generate/swagger-codegen-cli-2.2.3.jar generate -i http://localhost:8080/api/v1/api-docs -l typescript-angular2