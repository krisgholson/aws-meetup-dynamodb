DYNAMODB_HOME=$HOME/dynamodb/dynamodb_local_2016-05-17
java -Djava.library.path=$DYNAMODB_HOME/DynamoDBLocal_lib -jar $DYNAMODB_HOME/DynamoDBLocal.jar -sharedDb
