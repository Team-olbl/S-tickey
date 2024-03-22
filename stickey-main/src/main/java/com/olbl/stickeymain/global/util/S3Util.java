package com.olbl.stickeymain.global.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Util {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket; // 버킷명

  @Value("${cloud.aws.cloudfront.domain}")
  private String cloudFrontDomain; // CloudFrontn 도메인

  private String[] directories = new String[]{
      "individual/profile/",        // 개인 프로필
      "organization/profile/",      // 단체 프로필
      "organization/player/",       // 단체 소속 선수 프로필
      "organization/registration/", // 단체 사업자 등록증
      "game/profile/",              // 경기 포스터
      "support/profile/"            // 후원 대표 사진
  };

  // 파일 1개 업로드
  public String uploadFile(MultipartFile multipartFile, int code) {
    // 파일 메타 데이터
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentEncoding(multipartFile.getContentType());
    objectMetadata.setContentLength(multipartFile.getSize());

    // 파일명 생성
    String key = makeFileName(directories[code], multipartFile.getOriginalFilename());

    // S3에 파일 오브젝트 저장
    try {
      amazonS3Client.putObject(bucket, key, multipartFile.getInputStream(), objectMetadata);
    } catch (Exception e) {
      e.printStackTrace();
    }

    // 파일 URL 생성하여 리턴
    return "https://" + cloudFrontDomain + "/" + key;
  }

  // 파일명을 생성하는 메소드
  public String makeFileName(String directory, String fileName) {
    // 파일명 중복을 방지하기 위해 현재 시간 반영
    String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd_HHmmSS"));
    return directory + time + "_" + fileName;
  }

}
