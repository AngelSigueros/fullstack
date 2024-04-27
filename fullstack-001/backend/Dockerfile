#FROM maven:3.8.3-openjdk-17 AS build
#COPY src /home/app/src
#COPY pom.xml /home/app
##COPY . .
#RUN mvn -f /home/app/pom.xml clean package
#COPY target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","/backend-0.0.1-SNAPSHOT.jar"]

# Clase de Alan
# docker pull eclipse-temurin:21-jre-jammy
# generar .jar con package en maven
#FROM eclipse-temurin:21-jre-jammy
FROM ctoscano/eclipse-temurin-21-jdk-jammy
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} backend.jar
ENTRYPOINT ["java","-jar","/backend.jar"]

# docker build -t backend:0.0.1 .