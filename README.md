# Spring Boot, Angular 7, MySQL, Ionic 4, Hibernate, Liquibase

The application structure is as follows.
- **server-user-management** - Microservice implemented using Spring boot. [More info](server-user-management/README.md)
- **client-user-management** - A NodeJs application implemented using Angular 7. This consumes services hosted by server-user-management.  [More info](client-user-management/README.md)
- **mobile-user-management** - Ionic 4 multiplatform mobile application. [More info](mobile-user-management/README.md)

### Build

#### 1) Build server-user-management

```
$ cd server-user-management
$ gradlew bootJar
$ gradlew bootRun
```

### Access server side using following URL

```
http://localhost:8080
```

#### 2) Build and run client-user-management application

```
$ cd client-user-management
$ ng serve
```

### Access client side using following URL

```
http://localhost:4200
```

#### 3) Build and run mobile-user-management application

```
$ cd mobile-user-management
$ ionic serve
```

### Access client side using following URL

```
http://localhost:8100
```
