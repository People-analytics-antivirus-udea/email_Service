# Servicio de registro de emails para envío de predicciones

## Información del proyecto
* Creado usando Serverless Framework, crea lambdas y almacena el código de las mismas en un bucket de S3, crea el endpoint en API Gateway y adicionalmente una tabla en AWS DynamoDB donde se almacenan los usuarios que recibirán las predicciones.

## ¿Como ejecutarlo?

Primero se debe de tener instalado en el equipo el AWS CLI, y Serverless Framework CLI

Se deben de tener las credenciales de AWS registradas en AWS CLI con el comando: 
```
aws configure
```

Luego se instalan las dependencias necesarias y se ejecuta el proyecto con los siguientes comandos:
```
npm install
sls deploy -v
```

La consola indicará los servicios creados junto con el endpoint.
