# ¿Qué es Docker?

Docker permite:

- Construir
- Ejecutar
- Desplegar

Con Docker se crean paquetes de dependencias.

## Máquinas virtuales VS Contenedores

| Característica  | Máquinas Virtuales (VM)        | Contenedores                     |
| :-------------- | :----------------------------- | :------------------------------- |
| **Aislamiento** | Hardware completo (Hypervisor) | Procesos aislados (mismo kernel) |
| **Recursos**    | Pesados (OS completo)          | Ligeros (comparten OS)           |
| **Arranque**    | Lento (minutos)                | Rápido (segundos)                |
| **Espacio**     | Gigabytes                      | Megabytes                        |

## Arquitectura de Docker

- **Modelo Cliente-API-Servidor (Docker Engine)**.
- **Docker Engine (Servidor)**: gestiona el ciclo de vida.
- **Contenedores**: son procesos aislados del sistema.

## Instalación de Docker

Para instalar Docker en Linux (Ubuntu), puedes usar el siguiente comando:

1. Preparar el sistema
```bash
sudo apt-get update
sudo apt-get remove docker docker-engine docker.io containerd runc
```
2. Instalar dependencias necesarias

```bash 
sudo apt-get install ca-certificates curl gnupg lsb-release
```

3. Agregar la clave GPG oficial de Docker

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
4. Configurar el repositorio

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
5. Instalar Docker Engine

```bash 
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
6. Verificación

```bash
sudo docker --version
sudo docker run hello-world
```


Para otras plataformas, visita la [documentación oficial](https://docs.docker.com/get-docker/).

## Proceso de desarrollo con Docker

1. Tomar un proyecto.
2. Agregar docker a un proyecto, se hace con un archivo `Dockerfile`.

### Dockerfile

Es un archivo de texto plano que Docker utilizará para empaquetar la app y construir la imagen.
La imagen contiene todo lo necesario para ejecutar la app.

En base a la imagen podemos crear contenedores (procesos que cuentan con su propio sistema de archivos).

La imagen se puede almacenar en la nube en **Docker Hub**.

# Panorama de Docker

## Configurar el Dockerfile

```dockerfile
FROM ubuntu:22.04
COPY . /app
WORKDIR /app
CMD bun run app.ts
```

## Construir la imagen

```bash
docker build -t nombre_imagen directorio_dockerfile
```

## Listar imágenes

```bash
docker images ls
```

## Ejecutar una imagen
Para eso debemos transformar la imagen en un contenedor.

```bash
docker run hi
```

## Listar contenedores 

```bash
docker ps -a
```

## Ejecutar contenedores en segundo plano

```bash
docker start -i nombre_contenedor
```

## Eliminar contenedores 

```bash
docker rm -f nombre_contenedor
```

# Linux 

## Eliminar directorios y archivos
```bash
rm hi.txt
rm -rf directorio #
```
## 2.1 Editar archivos
```bash
nano
more name.txt
head -n 10
tail -n 10
tail -f : monitorear un archivo
```

## 2.2 Redirecciones
```bash
>> | >
cat name.txt > result.txt
```

## 2.3 Busqueda de texto
`grep` -> Global regular expression print
```bash
grep -i hola name.txt
grep -i hola *.txt
```

## 2.4 Busqueda de archivos y directorios
```bash
find
find /directory -type d -> search just directory
find /directory -type f -> search just file
find /directory -type f -name | -iname "a*" -> search for pattern
find / -type f -iname ""
```
## 2.5 Encadenando comandos
```bash
mkdir hello; cd hello; echo "ready"
mkdir hello && cd hello && echo "ready"
mkdir hello || cd hello || echo "ready"
```

Separate with line
```bash
mkdir hello :/
> write other instructions
```

## 2.6 Variables de entorno
`env` - environment
```bash
echo $PATH
```

Crear variables de entorno

```bash
export
```

## 2.7 Gestion de procesos
```bash
ps : list processes
sleep 1000 & : run process in background
jobs : list jobs
fg : bring job to foreground
bg : send job to background
kill : kill process
```

## 2.8 Gestion de usuarios
```bash
useradd: add user
usermod: modify user
userdel: delete user

superuser -> #
user normal -> $

docker exec -it -u user <container_id> bash
```


## 2.9 Gestion de grupos
```bash
group
```

## Permisos

- file
d directory

```bash
-rw-rw-r-- 1 esg esg   27 Dec 25 15:32 app.ts
```

r read
w write
x execute

Cambiar permisos
```bash
chmod u+x file.sh
chmod g+x file.sh
chmod o+xw file.sh

chmod u-w, g-wr, o+rw file.sh

chmod u=rwx, g=rx, o=rx file.sh
```



# 3. Construcción de imágenes

## 3.1 Introducción 
- Crear Dockerfile
- Construir img
- Versionar img
- Subir img 
- Bajar img 
- Ejecutar img
- Reducir el tamaño de la img 

## 3.2 Imagen vs Contenedor

- Imagen: es un template que contiene todo lo necesario para ejecutar una app.
- Contenedor: es una instancia de una imagen.


Image 
- Todo lo necesario para ejecutar una app.
* Sistema operativo
* Dependencias
* Código
* env


Container 
- Instancia de una imagen.
- Proceso aislado.
- Detenerse o iniciarse 

## 3.3 Dockerfile
Este archivo contiene instrucciones para construir una imagen.

`FROM` -> Indica la imagen base

`WORKDIR` -> Indica el directorio de trabajo

`COPY` -> Copia archivos
`ADD` -> Copia archivos
`RUN` -> Ejecuta comandos
`ENV` -> Define variables de entorno
`EXPOSE` -> Indica puertos
`USER` -> Define usuario
`CMD` -> Define comando
`ENTRYPOINT` -> Define punto de entrada

## 3.4 Elegiendo la imagen correcta

Se elige el sistema operativo base.

Ejemplo: 

`FROM ubuntu:22.04` o `FROM oven/bun:latest`

Necesitamos una img que tenga bun instalado y sea lo más ligera posible.

* Construir la imagen
```bash
docker build -t app-bun .
```

* Ejecutar el contenedor de forma interactiva
```bash
sudo docker run -it app-bun sh
```

- con sh indicamos la terminal y poder acceder al s.o


## 3.5 Copiar archivos al contenedor Docker


`WORKDIR /linvia/`  -> Indica el directorio de trabajo

`COPY . .` -> Copia los archivos del directorio actual al directorio de trabajo

El primer punto es el origen y el segundo es el destino.

## 3.6 Excluyendo archivos
Todo esto se hace en el archivo `.dockerignore`

## 3.7 Instalando dependencias
```dockerfile
RUN bun install
```

## 3.8 Acelerando la construcción de imágenes

- A partir de `COPY` en esta capa empieza los problemas hacia abajo. Al haber modificación en el código, se tiene que volver copiar todo el código y ejecutar `bun install`.

- Pero podemos ordenar el Dockerfile de la siguiente manera:

```dockerfile
FROM oven/bun:1.3.10-alpine

WORKDIR /linvia/

COPY package.json bun.lock ./

RUN bun install

COPY . .

CMD bun run app.ts
```
De esta manera solo se ejecutará `bun install` cuando se modifique `package.json` o `bun.lock`



## 3.9 Variables de entorno
```dockerfile
ENV email=eribertosg.dev@gmail.com
ENV email eribertosg.dev@gmail.com
```

## 3.10 Comandos CMD
```bash
sudo docker build -t app-bun .
sudo docker run app-bun bun dev
```

En Dockerfile lo recomendable es utilizar
```dockerfile
CMD [ "bun", "dev" ]
```
Esto se ejecuta dentro del mismo contenedor y no en una 
nueva shell.

`RUN` -> Se ejecuta en la construcción de la imagen.
`CMD` -> Se ejecuta en la ejecución del contenedor.
`ENTRYPOINT` -> Se ejecuta en la ejecución del contenedor.

* Podemos utilizar CMD y ENTRYPOINT juntos. Al final de cuenta hacen lo mismo.


## 3.11 Puertos

`EXPOSE` -> Indica puertos, pero no lo expone al host.


## 3.12 Usuarios

`USER` -> Define usuario


Dentro del contenedor
```bash
adduser
```

`-G` -> Grupo
`-S` -> System user
`-D` -> Don't assign a password
`-H` -> Don't create home directory
`-u` -> User id
`-k` -> Skeleton directory

Crear un grupo y un usuario
```bash
addgroup linvia
adduser -S -G linvia ESG
```

* En Dockerfile
RUN addgroup linvia && adduser -S -G linvia ESG
USER ESG

```dockerfile
FROM oven/bun:1.3.10-alpine
# Crear un grupo y un usuario
RUN addgroup linvia && adduser -S -G linvia ESG
USER ESG

WORKDIR /linvia/

# Copiar archivos al contenedor Docker especificando el dueño
COPY --chown=ESG:linvia package.json bun.lock ./

RUN bun install
# Copiar el resto de archivos asignando el dueño
COPY --chown=ESG:linvia . .

ENV email=eribertosg.dev@gmail.com

EXPOSE 8080

CMD [ "bun", "dev" ]
```

## 3.13 Eliminando imágenes

Lista imágenes

```bash
sudo docker images
```

Eliminar imagen

```bash
sudo docker rmi app-bun:latest
sudo docker image prune
sudo docker image rm <id>
```

Listar contenedores

```bash
sudo docker ps -a
```

Eliminar contenedores

```bash
sudo docker container prune
```

## 3.14 Etiquetas

Asignar una etiqueta al crear una imagen

```bash
sudo docker build -t app-bun:1.0.0 .
```

Eliminar una imagen por etiqueta cuando existen
dos imágenes con el mismo ID.

```bash
sudo docker rm app-bun:1.0.0
```
* Cambiar la etiqueta de una imagen
```bash
sudo docker tag app-bun:1.0.0 app-bun:latest
```


## 3.15 Publicando imágenes

### Subir la imagen a GitHub Container Registry
1. Configurar GitHub
  - Entrar a settings
  - Developer settings
  - Personal access tokens
  - Token (classic)
  - Generate new token (Classic)
  - Seleccionar write:packages, read:packages, delete:packages, repo

2. Iniciar sesión

```bash
docker login ghcr.io
```

```sh
esg@esg:~/Documents/course/docker/linvia$ docker login ghcr.io
Username: EribertoSG
Password: Aquí va el token generado en GitHub

WARNING! Your credentials are stored unencrypted in '/home/esg/.docker/config.json'.
Configure a credential helper to remove this warning. See
https://docs.docker.com/go/credential-store/

Login Succeeded
```
3. Etiquetar imagen

Formato: ghcr.io/USUARIO/NOMBRE_IMAGEN:VERSION

```bash
sudo docker tag app-bun:1.0.1 ghcr.io/eribertosg/app-bun:1.0.1
```
4. Subir la imagen

```bash
sudo docker push ghcr.io/eribertosg/app-bun:1.0.1
```
5. (Opcional pero recomendado) crear el tag `latest`

Esto permite siempre descargar la versión más reciente.
```bash
docker tag app-bun:1.0.1 ghcr.io/EribertoSG/app-bun:latest
docker push ghcr.io/EribertoSG/app-bun:latest
```

6. Luego podrás descargarla desde cualquier servidor
```bash
docker pull ghcr.io/EribertoSG/app-bun:1.0.1
```

### Construir la imagen lista para subir:

```bash
docker build -t ghcr.io/eribertosg/app-bun:1.0.2 .
```

```bash
docker push ghcr.io/eribertosg/app-bun:1.0.2
```

* Crear también latest

La práctica común es tener:

1.0.2
latest

Entonces haces:
```bash
docker tag ghcr.io/eribertosg/app-bun:1.0.2 ghcr.io/eribertosg/app-bun:latest
```

Luego:
```bash
docker push ghcr.io/eribertosg/app-bun:latest
```


## 3.16 Guardar y compartir imágenes

```bash
 docker image save -o bun-app.tar ghcr.io/eribertosg/app-bun:1.0.2
```

* Cargar la imagen en docker

```bash
docker image load -i bun-app.tar
```

# 4. Contenedores 
## 4.1 Introducción 
- Como ejecutar contenedores
- Diferentes parametros para que funcionen correctamente

## 4.2 Iniciando contenedores

* Crea y ejecuta inmediatamente un contenedor a partir de la imagen 

Usa docker run

- Cuando quieres probar o ejecutar rápido un contenedor


```bash
sudo docker run -it ghcr.io/eribertosg/app-bun:1.0.2 sh
```

* Crear un contenedor en base a una imagen 
* Usa docker create
Cuando quieres:
- Preparar contenedores
- Configurarlos antes de ejecutarlos
- Orquestarlos manualmente


```bash
sudo docker create --name app-bun ghcr.io/eribertosg/app-bun:1.0.2
```

* El comando crea el contenedor,pero no lo ejecuta. Para ejecutarlo se usa el comando start

```bash
sudo docker start app-bun
```

* Listar todos los contenedores creados

```bash
sudo docker ps -a
```
* Ver los contenedores corriendo 

```bash
sudo docker ps
```

* Iniciar un contenedor

```bash
sudo docker start app-bun
```

* Detener un contenedor

```bash
sudo docker stop app-bun
```
* Eliminar un contenedor

```bash
sudo docker rm app-bun
```

* Crea y ejecuta inmediatamente un contenedor a partir de la imagen 
```bash
docker run -d --name app-bun-2 ghcr.io/eribertosg/app-bun:1.0.2 
```

* Eliminar todos los contenedores detenidos

```bash
sudo docker container prune
```

## 4.3 Logs

* Mostrar logs de los contenedores 

```bash
sudo docker logs app-bun
```
`-f` -> follow
`--tail` -> number of lines

```bash
sudo docker logs -f app-bun
```

```bash
sudo docker logs -f --tail 10 app-bun
```
* Mostrar logs con más detalles

```bash
docker logs -t -n 10 app-bun
```

## 4.4 Puertos 
* Qué significa EXPOSE 8080 en tu Dockerfile

```dockerfile
EXPOSE 8080
```
Significa que el contenedor está escuchando en el puerto 8080, pero no lo expone al host.

* Cómo realmente abrir el puerto
  Debes usar port mapping cuando creas el contenedor.

```bash
docker run -d -p 8080:8080 --name linvia ghcr.io/eribertosg/app-bun:1.0.2
```

* Publicar todos los puertos expuestos

También puedes usar:

```sh
docker run -P imagen
```


### Importante 
El puerto se tiene que especificar al crear un contenedor. De lo contrario ya no se podrá hacer después al iniciarlo.

Por eso es importante indicarle los puertos del host y contenedor al crear y ejecutar.

* Usar docker create con puertos

Crear un contenedor 
```bash
docker create -p 8080:8080 --name app-bun ghcr.io/eribertosg/app-bun:1.0.2
```

y después ejecutarlo

```sh
docker start app-bun
```

* Ver los puertos configurados 

```bash
docker inspect app-bun
```

### Regla importante en Docker

Los puertos, volúmenes y redes se definen al crear el contenedor, no al iniciarlo.

## 4.5 Deteniendo e iniciando contenedores

* Iniciar contenedores 

```bash
sudo docker start app-bun
```

* Detener contenedores

```bash
sudo docker stop app-bun
```

## 4.6 Eliminar y reiniciar contenedores

* Reiniciar contenedores

```bash
sudo docker restart app-bun
```

* Eliminar contenedores

```bash
sudo docker rm app-bun
```

- Forma explícita

```bash
docker container rm app-bun
```

* Eliminar todos los contenedores detenidos

```bash
sudo docker container prune
```

* Eliminar todos los contenedores

```bash
sudo docker rm $(sudo docker ps -a -q)
```

* Eliminar contenedores corrieno

```bash
sudo docker rm -f app-bun
```

## 4.7 Ejecutando contenedores

* Entrar a un contenedor corriendo

```sh 
docker exec -it app-bun sh
``` 

* Listar directorios pero sin entrar en modo interactivo

```sh
docker exec app-bun ls -la
```
* app-bun es el nombre del container corriendo no de la img

## 4.8 Volúmenes
En Docker, los volúmenes se utilizan para guardar datos fuera del contenedor, de forma que no se pierdan cuando el contenedor se elimina o se recrea. 💾🐳

Los contenedores están diseñados para ser efímeros (temporales). Si eliminas un contenedor, todo lo que está dentro se pierde, excepto lo que esté guardado en volúmenes.

* Tipos de volúmenes en Docker
1. Volumen gestionado por Docker (recomendado)
-v mi-volumen:/data

Docker lo guarda en:

/var/lib/docker/volumes/

Ventajas:

más seguro
más portable
Docker lo administra

2. Bind mount (carpeta del sistema)
-v /home/esg/data:/data

Aquí conectas una carpeta del host.

Ejemplo:

/home/esg/data → contenedor:/data

Esto se usa mucho en desarrollo.

* Manage volumes

Commands:
  create      Create a volume
  inspect     Display detailed information on one or more volumes
  ls          List volumes
  prune       Remove unused local volumes
  rm          Remove one or more volumes

* Crear volumen manualmente
```sh
docker volume create linvia-data
```

Usarlo:
```sh 
docker run -v linvia-data:/linvia/data imagen
```

* Crear un volumen

```bash
sudo docker volume create my-data
```

* Inspeccionar un volumen

```bash
sudo docker volume inspect my-data
```

* Listar volúmenes

```bash
sudo docker volume ls
```

* Eliminar un volumen

```bash
sudo docker volume rm my-data
```

* Eliminar todos los volúmenes

```bash
sudo docker volume prune
```

* Crear un volumen al crear un contenedor

```bash
sudo docker run -d -p 8080:8080 --name linvia -v my-data:/linvia/data ghcr.io/eribertosg/app-bun:1.0.2
```

* Cambiar los permisos de root al nombre del usuario
```dockerfile
FROM oven/bun:1.3.10-alpine
RUN addgroup linvia && adduser -S -G linvia ESG
USER ESG

WORKDIR /linvia/
# Crear una carpeta para los volumenes
RUN mkdir data
COPY --chown=ESG:linvia package.json bun.lock ./

RUN bun install

COPY --chown=ESG:linvia . .

ENV email=eribertosg.dev@gmail.com

EXPOSE 8080

CMD [ "bun", "dev" ]
```

### Crear dockerfile, imagen, contenedor, volumen

1. Dockerfile → describe cómo construir la imagen
2. Imagen → plantilla inmutable
```sh
docker build -t app-bun .
```
3. Contenedor → instancia ejecutable de la imagen
```sh
docker run -d --name app-bun app-bun(name img)
```

4. Crear un volumen

```sh
docker volume create linvia-data
```
5. Usar el volumen en un contenedor

Cuando creas el contenedor:

```sh
docker run -d -p 8080:8080 -v linvia-data:/linvia/data --name linvia app-bun
```

6. Dónde guarda Docker los volúmenes

Normalmente en:

`/var/lib/docker/volumes/`

### Cómo inspeccionar un volumen

```sh
docker volume inspect data
```


## 4.9 Compartiendo código

Haciendo un bind mount (vinculación directa de un directorio del host).

```sh
sudo docker run -d -p 8080:8080 --name backend-2 -v ./index.ts:/linvia/index.ts ghcr.io/eribertosg/app-bun:1.0.3
```

El punto clave es:
`-v ./index.ts:/linvia/index.ts`

Esto conecta:
Directorio en tu computadora → Directorio dentro del contenedor



## Nota

* Nunca se sobrescriben versiones
- Las imágenes se versionan así:

1.0.0 → primera versión
1.0.1 → bug fix
1.1.0 → nueva funcionalidad
2.0.0 → cambio grande

Esto se llama semantic versioning.

## 4.10 Copiando archivos 

* Copiar un archivo o directorio desde un contenedor

```sh
sudo docker cp backend-2:/linvia/container-docker.txt ../
```
* Copiar desde el anfitrión a un container

```sh
sudo docker cp host-file.txt backend-2:/linvia/
```

# 5. Trabajando con múltiples contenedores
## 5.1  Limpiar espacio de trabajo
* Listar contenedores 

```sh
sudo docker container|ps ls -aq
```


* Eliminar todos los contenedores 
```sh
sudo docker container|ps rm -f $(sudo docker container ls -aq)
```

* Lista images 

```sh
sudo docker image ls -q
```

* Eliminar todas las images 

```sh
sudo docker image rm $(sudo docker image ls -q)
```


## 5.2 JSON vs YAML

* JSON para transferir información 

* YAML para configuraciones

## 5.3 Archivo docker-compose.yaml
docker-compose.yml se utiliza para definir y ejecutar aplicaciones con varios contenedores de Docker usando un solo archivo de configuración.

En lugar de ejecutar muchos comandos docker run, puedes describir toda la infraestructura en un archivo YAML y levantar todo con un solo comando.

✔ Docker Compose es una herramienta que:

* Construye imágenes
* Crea contenedores
* Configura redes
* Monta volúmenes
* Inicia los servicios

Todo basado en docker-compose.yml.


```yml
name: task # Nombre del proyecto de Docker Compose. Agrupa todos los servicios (frontend, backend y base de datos).

services: # Definición de todos los servicios que se crearán al ejecutar `docker compose up`

  app: # Servicio del frontend
    build: ./frontend # Directorio donde se encuentra el Dockerfile para construir la imagen del frontend

    environment: # Variables de entorno disponibles dentro del contenedor
      VITE_API_PROXY_TARGET: http://api:8080 # URL interna para comunicarse con el servicio "api" dentro de la red de Docker

    ports: # Mapeo de puertos (host:contenedor)
      - 5173:5173 # Expone el puerto 5173 del contenedor al puerto 5173 del host

    volumes: # Montaje de volúmenes para desarrollo
      - ./frontend/src:/frontend/src # Bind mount: enlaza el directorio local con el contenedor para reflejar cambios en tiempo real

    depends_on: # Define dependencias de inicio entre servicios
      - api # El servicio "app" depende del servicio "api"

  api: # Servicio del backend
    build: ./backend # Directorio donde se encuentra el Dockerfile del backend

    env_file: # Archivo que contiene variables de entorno
      - ./backend/.env # Este archivo debe existir antes de ejecutar `docker compose up`

    environment: # Variables de entorno adicionales para la conexión a la base de datos
      DB_HOST: db # Host de la base de datos (nombre del servicio dentro de la red de Docker)
      DB_USER: ${APP_DB_USER} # Usuario de la base de datos
      DB_PASSWORD: ${APP_DB_PASSWORD} # Contraseña del usuario
      DB_NAME: ${APP_DB_NAME} # Nombre de la base de datos
      DB_PORT: 5432 # Puerto interno de PostgreSQL

    ports:
      - 8080:8080 # Expone la API en el puerto 8080 del host

    volumes:
      - ./backend/app:/backend/app # Bind mount para sincronizar el código del backend con el contenedor

    depends_on: # Dependencia del servicio de base de datos
      db:
        condition: service_healthy # Espera a que PostgreSQL pase el healthcheck antes de iniciar la API

  db: # Servicio de base de datos
    image: postgres:18-alpine # Imagen oficial de PostgreSQL basada en Alpine Linux (más ligera)

    environment: # Variables usadas por el contenedor de PostgreSQL
      # Variables utilizadas por la imagen oficial de PostgreSQL para crear la base de datos inicial
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}

      # Variables adicionales utilizadas por scripts personalizados dentro de /docker-entrypoint-initdb.d
      APP_DB_NAME: ${APP_DB_NAME}
      APP_DB_USER: ${APP_DB_USER}
      APP_DB_PASSWORD: ${APP_DB_PASSWORD}

    volumes: # Volúmenes para persistencia de datos y scripts de inicialización
      - postgres_data:/var/lib/postgresql/data # Volumen nombrado donde PostgreSQL almacena sus datos
      - ./db/init:/docker-entrypoint-initdb.d # Carpeta con scripts SQL o shell que se ejecutan al inicializar la base de datos

    healthcheck: # Verificación de que PostgreSQL esté listo para aceptar conexiones
      test: ["CMD", "pg_isready", "-U", "${POSTGRES_USER}"]
      interval: 10s # Tiempo entre cada verificación
      timeout: 5s # Tiempo máximo de espera por verificación
      retries: 5 # Número de intentos antes de marcar el servicio como no saludable

volumes: # Declaración de volúmenes nombrados administrados por Docker
  postgres_data: # Volumen persistente donde se almacenan los datos de PostgreSQL
```
### Comandos para compose 

1. Construir y levantar todos los servicios
```sh
docker compose up
```
- Construye las imágenes si no existen.
- Crea los contenedores.
- Inicia todos los servicios.
- Muestra los logs en la terminal.
2. Levantar servicios en segundo plano
```sh
docker compose up -d
```
-d significa detached mode.

3. Reconstruir imágenes y levantar servicios

* Útil cuando cambias el Dockerfile.
```sh
docker compose up --build
```
4. Reconstruir todo desde cero
```sh
docker compose up --build --force-recreate
```
Esto:

- reconstruye imágenes
- recrea contenedores

5. Ver los contenedores del proyecto
- Activos
```sh
docker compose ps
```
- Detenidos
```sh
docker compose ps -a
```
6. Ver logs de todos los servicios
```sh
docker compose logs
```
7. Ver logs en tiempo real
```sh
docker compose logs -f
```
8. Ver logs de un solo servicio

Ejemplo con API:
```sh
docker compose logs -f api
```
10. Manipular los servicios
- Detener
```sh
docker compose stop
```
- Iniciar contenedores detenidos
```sh
docker compose start
```
- Reiniciar servicios 
```sh
docker compose restart
```
- Reiniciar un en específico
```sh
docker compose restart api
```

11. Ejecutar comandos dentro de un contenedor
Ejemplo entrar al backend:
```sh
docker compose exec api sh
```
Entrar a PostgreSQL:
```sh
docker compose exec db psql -U postgres
```
12. Detener y eliminar contenedores
```sh
docker compose down
```
Elimina:

* contenedores
* redes

No elimina volúmenes.

13. Eliminar también los volúmenes
```sh
docker compose down -v
```
15. Ver volúmenes creados
```sh
docker volume ls
```
16. Ver redes creadas
```sh
docker network ls
```


## Construyendo imágenes con Compose

```sh
docker compose build
```

* Reconstruir imágenes sin usar caché
```sh
docker compose build --no-cache
```

* Reconstruir imágenes y forzar recreación de contenedores
```sh
docker compose build --force-recreate
```

* Reconstruir imágenes y forzar recreación de contenedores sin usar caché
```sh
docker compose build --force-recreate --no-cache
```

* Reconstruir e iniciar todo
```sh
docker compose up --build --no-cache
```
Esto hace:
- reconstruye imágenes
- no usa cache
- crea contenedores
- inicia servicios


### Importante
Cuándo usar --no-cache

Usa --no-cache cuando:
- Cambias dependencias
- Cambias Dockerfile
- Hay problemas de build
- Quieres un build 100% limpio

## 5.4 Logs
* Recrear todos los servicios y ejecutarlo como detached
```sh
docker compose up --build -d
```
* Ver los logs de todos los servicios
```sh
docker compose logs
```
* Ver los logs en tiempo real
```sh
docker compose logs -f
```
* Ver los logs de un solo servicio
```sh
docker compose logs -f api
```
* Ver los logs de un solo servicio en tiempo real
```sh
docker compose logs -f api
```
## 5.5 Redes 

* Ver las redes creadas
```sh
docker network ls
```
- bridge
- host
- none
- task_default

Las primeras 3 son redes internas que Docker crea automáticamente, y la última fue creada por Docker Compose para tu proyecto.

1. bridge (red por defecto)
```sh
bridge
```
* Es la red default de Docker.

Cuando creas un contenedor sin especificar red:

```sh
docker run nginx
```

Docker lo conecta automáticamente a bridge.

Cómo funciona

Docker crea un switch virtual dentro del sistema:

```
Contenedor A
      │
      │
   bridge network
      │
      │
Contenedor B
```

* Los contenedores conectados a esta red pueden comunicarse usando IP interna.

Ejemplo:

```sh
172.17.0.2
172.17.0.3
```

⚠️ Pero no pueden resolverse por nombre automáticamente.

Por eso Compose crea otra red.

2. host
host

* En esta red el contenedor usa directamente la red del sistema operativo.

* No hay aislamiento de red.

```
Contenedor
     │
     │
Red del servidor (host)
```

* Ejemplo:

Si tu aplicación escucha en:

```sh
localhost:8080
```

* Entonces será directamente el puerto del servidor.

* No necesitas mapear puertos:

```sh
-p 8080:8080
```

⚠️ Se usa poco porque reduce el aislamiento.



* Entrar a un contenedor como root y ver la red
```sh
docker exec -it -u root 3be5ecce3663 sh
```


3. none

```sh
none
```

* Esta red desactiva completamente la red del contenedor.

* El contenedor:

* No tiene IP
* No tiene acceso a internet
* No puede comunicarse con otros contenedores

Ejemplo:

```
Contenedor
   │
   ✖ sin red
```

* Se usa en casos de seguridad extrema o tareas aisladas.

4. task_default (tu red de Docker Compose)

```sh
task_default
```

* Esta red fue creada automáticamente por Docker Compose porque tu proyecto se llama:

```sh
task
```

* Compose crea una red así:

```sh
nombreProyecto_default
```

* Entonces:

```sh
task_default
```

4. task_default (tu red de Docker Compose)
task_default

* Esta red fue creada automáticamente por Docker Compose porque tu proyecto se llama:
task

* Compose crea una red así:

```sh
nombreProyecto_default
```

* Entonces:
```sh
task_default
```

* Cómo funciona esta red

Todos los servicios del docker-compose.yml se conectan automáticamente a esa red.

En tu caso:

- app
- api
- db

quedan así:

```
          task_default network
        ┌───────────┬───────────┐
        │           │           │
       app         api         db
```

* Lo más importante

Dentro de esta red los contenedores se resuelven por nombre de servicio.

Ejemplo:

Tu backend puede conectarse a PostgreSQL usando:

```yaml
DB_HOST=db
```
- porque db es el nombre del servicio.

Docker tiene un DNS interno que resuelve:

db → IP del contenedor de postgres

* Cómo ver qué contenedores están en una red

Puedes inspeccionarla:

docker network inspect task_default

Verás algo así:

```sh
Containers:
  task-api-1
  task-app-1
  task-db-1
```

* Cómo se ve realmente la arquitectura

Tu sistema funciona así:

```
                 INTERNET
                     │
                     │
              ┌─────────────┐
              │   HOST OS   │
              └──────┬──────┘
                     │
                Docker Engine
                     │
              task_default network
        ┌────────────┼────────────┐
        │            │            │
      app          api           db
  (5173)        (8080)       (5432)
```

- Los contenedores se comunican dentro de la red interna.

- Los puertos publicados permiten acceso desde el host.

* Algo importante que pocos saben

Si ejecutas:
```sh
docker compose down
```
Docker elimina automáticamente:
```sh
task_default
```
Pero no elimina:
```sh
bridge
host
none
```
porque son redes del sistema.

💡 Tip importante

Si tienes varios proyectos Docker, cada uno tendrá su propia red:

project1_default
project2_default
project3_default

Esto evita conflictos entre contenedores.


## 5.6 Contenedores dependientes
En Docker Compose las opciones depends_on y healthcheck se usan para controlar el orden de arranque y verificar que un servicio realmente esté listo antes de que otros lo utilicen.

Son muy importantes cuando tienes dependencias como:

```
API → Base de datos
Frontend → API
```

Esto asegura que el contenedor de la base de datos esté listo antes de iniciar el contenedor de la API.
1. Qué hace depends_on
depends_on indica que un servicio necesita que otro se inicie primero.

Ejemplo:

```yaml
services:
  api:
    depends_on:
      - db
```

Esto significa:

1. iniciar db
2. iniciar api

Pero hay un detalle importante.

⚠️ Solo garantiza que el contenedor se inicie, no que esté listo para usar.

Ejemplo real:

db container → iniciado
postgres → aún cargando
api → intenta conectarse
error conexión

Por eso se usa healthcheck.


2. Qué hace healthcheck
Un healthcheck es una verificación que Docker ejecuta periódicamente para saber si un contenedor está sano.

En Docker un contenedor puede estar:

- starting
- healthy
- unhealthy

Ejemplo para PostgreSQL:

```yaml
healthcheck:
  test: ["CMD", "pg_isready", "-U", "postgres"]
  interval: 10s
  timeout: 5s
  retries: 5
```

Esto significa:

- cada 10 segundos
- Docker ejecuta pg_isready
- si falla 5 veces
- el contenedor se marca como unhealthy

3. Usar depends_on con healthcheck

Docker Compose permite esperar hasta que el servicio esté realmente listo.

Ejemplo:

```yaml
api:
  depends_on:
    db:
      condition: service_healthy
```
Flujo real:

1. iniciar db
2. ejecutar healthcheck
3. postgres responde correctamente
4. db = healthy
5. iniciar api

Esto evita errores de conexión.

4. Parámetros de healthcheck
* test

Comando que verifica el servicio.

```yaml
test: ["CMD", "pg_isready", "-U", "postgres"]
```

* interval

Cada cuánto se ejecuta el chequeo.

```yaml
interval: 10s
```

* timeout

Tiempo máximo que puede tardar el chequeo.

```yaml
timeout: 5s
```

* retries

Número de intentos antes de marcarlo como fallido.

```yaml
retries: 5
```

* start_period (opcional)

Tiempo de gracia antes de iniciar los chequeos.

```yaml
start_period: 30s
```
## 5.7 Ejecutando tests
1. Ejecutar tests manualmente en un contenedor

La forma más común es ejecutar los tests dentro del servicio existente.

Ejemplo para tu backend:

docker compose exec api bun test

2. Ejecutar tests en un contenedor temporal

Otra forma más limpia es usar:

docker compose run --rm api bun test


1. Ejecutar tests manualmente en un contenedor

La forma más común es ejecutar los tests dentro del servicio existente.

Ejemplo para tu backend:

docker compose exec api bun test

services:
```yml
  api:
    build: ./backend

  test:
    build: task-api # nombre del direcotio-nombre del servicio
    command: bun test # Este ejecuta el test, remplazando el comando en el dockerfile
    depends_on:
      db:
        condition: service_healthy
```

6. Algo muy útil para CI/CD

Muchos pipelines hacen:

docker compose build api
docker compose run --rm api bun test

# 6. Despliegue de app 

## 6.1 Herramientas de despliegue
- Docker swarn
- Kubernetes K8s
- Despliegue simple 
- Imagen

## 6.2 Opciones de despliegue
- AWS
- Azure 
- Google Claud
- Digital Ocean
## 6.3 Presentación de Digital Ocean 


## 6.4 Llaves SSH
* Crear la llave publica y privada 

```bash
ssh-keygen -t ed25519 -C "tu_email@example.com"
```

* Compartir la llave publica con el servidor

Compartir la clave que esta en el archivo .pub con el servidor

```bash
ssh-copy-id user@host
```

## 6.5 Tipos de docker-componse.yml
1. docker-compose.prod.yml
Se utiliza exclusivamente para producción

2. docker-compose.dev.yml
Se utiliza exclusivamente para desarrollo

3. docker-compose.test.yml
Se utiliza exclusivamente para pruebas

Aqui podemos reutilizar una imagen de algun servicio como api
para testear. 


* Indicarle el docker-compose al construir las imagenes

```bash
# Para desarrollo
docker compose -f docker-compose.dev.yml up

# Para producción
docker compose -f docker-compose.prod.yml up

# Para pruebas
docker compose -f docker-compose.test.yml up
```

* Reconstruir las imagenes

```bash
docker compose -f docker-compose.pro.yml up -d --build
```

* y bajar con:

```bash
docker compose -f docker-compose.pro.yml down
```

El volumen no se eliminará.

## 6.6 Optimizando el tamaño de las imagenes

El objetivo es construir la version minificada de react y utilizar nginx para ejecutar la app.

* Cuando se construyen las imagenes se pueden pasar dos tipos de comandos: 

1. En una primera instancia
RUN 
WORKDIR
ETC
2. En una segunda instancia(se ejecuta cuando se esta creando el contenedor)
COPY
CMD
ENTRYPOINT


Etaps de un Dockerfile

1. Build de la imagen
2. Ejecución del contenedor


```dockerfile
# Paso 1 Build de la imagen
# Se crea una imagen temporal para construir la aplicación
FROM oven/bun:1.3.10-alpine AS build-stage
# Se define una variable de entorno que se pasara al momento de construir la imagen
ARG VITE_API_PROXY_TARGET 
# Se asigna el valor de la variable de entorno
ENV VITE_API_PROXY_TARGET=${VITE_API_PROXY_TARGET}
WORKDIR /frontend/
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN [ "bun", "run", "build" ]

# Paso 2 Ejecución del container
# Se crea la imagen final con nginx
FROM nginx:1.29.6-alpine-slim
# Se copia el contenido del build-stage al contenedor de nginx
COPY --from=build-stage /frontend/dist /usr/share/nginx/html
# Se expone el puerto 5173
EXPOSE 5173
# Se inicia nginx
CMD [ "nginx", "-g", "daemon off;" ]
```

* Configurar el docker-compose para especificar las variables de entorno

```yaml
services:
  app:
    build:
      context: ./frontend
      dockerfile: Dockerfile.pro.yml
      args:
        VITE_API_PROXY_TARGET: http://api:8080
```
## 6.7 Construyendo la imagen
Construir la imagen de react con nginx para ver el peso

```bash
docker build -t react-nginx -f Dockerfile.prod .
```