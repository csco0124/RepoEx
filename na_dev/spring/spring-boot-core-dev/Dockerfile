FROM openjdk:17-jdk-slim
ARG SPRING_PROFILES_ACTIVE
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
ARG VLT_TOKEN
ENV VLT_TOKEN=${VLT_TOKEN}

VOLUME /tmp
ADD /bauth/target/*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
