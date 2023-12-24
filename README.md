# ISC

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Frameworks de integración 
`PrimeNG v17.1.0`

`Node v20.9.0`

## Dependencias relacionadas:
  Proyecto `Nova` integreado Spring Boot

## Development server - Despliegue local

Ejecute `ng serve` como servidor de desarrollo local.

## Ejemplo de acceso a web app
 `http://192.168.1.103:443/`.

Para correr en red local, la IP dependerá de la establecida en el equipo, así como el puerto asignado en el archivo package.json.

`"start": "ng serve --host 0.0.0.0 --port=443"`


Consuma datos del proyecto Nova especificando la url en el proyecto, especificamente en el archivo enviroment.ts. 

### Opcional.
Puede incluir IP publica para acceso fuera de la red, pero deberá cambiar la url de consumo de datos Nova.

## Ejemplo de archivo configurado(`environment.ts`) para consumo de Proyecto Nova relacional
 `hostBackend: 'http://192.168.1.103:8080'`

## 


