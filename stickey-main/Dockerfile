FROM openjdk:21

WORKDIR /app

COPY build/libs/*.jar back_application.jar

EXPOSE 9090

CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "-Dspring.profiles.active=server",
"back_application.jar"]