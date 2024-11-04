FROM amazoncorretto:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} prestabanco-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./prestabanco-backend.jar"]