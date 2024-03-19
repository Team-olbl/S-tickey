package com.olbl.stickeymain.global.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// S3 스토리지를 사용하기 위한 기본 설정 클래스
@Configuration
public class S3Config {

  @Value("${cloud.aws.s3.credentials.access-key}")
  private String accessKey; // IAM 사용자 액세스 키

  @Value("${cloud.aws.s3.credentials.secret-key}")
  private String secretKey; // IAM 사용자 비밀 액세스 키

  @Value("${cloud.aws.region.static}")
  private String region; // 버킷 리전


  // AmazonS3Client에 사용자 인증 정보, 버켓 리전 설정
  @Bean
  public AmazonS3Client amazonS3Client() {
    BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
    return (AmazonS3Client) AmazonS3ClientBuilder.standard()
        .withCredentials(new AWSStaticCredentialsProvider(credentials))
        .withRegion(region)
        .build();
  }
}
