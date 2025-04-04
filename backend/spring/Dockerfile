# Use the official OpenJDK image as the base image
FROM eclipse-temurin:21-jre-ubi9-minimal

WORKDIR /app

COPY target/webapp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]