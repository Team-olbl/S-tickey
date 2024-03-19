package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender sender;

    // 6자리 인증코드 생성
    @Override
    public String createAuthCode() {
        StringBuffer code = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int idx = random.nextInt(3);
            switch (idx) {
                case 0: // 영어 소문자
                    code.append((char) (random.nextInt(26) + 97));
                    break;
                case 1: // 영어 대문자
                    code.append((char) (random.nextInt(26) + 65));
                    break;
                case 2: // 숫자
                    code.append(random.nextInt(10));
                    break;
            }
        }
        return code.toString();
    }

    // 인증 코드 메일 발송
    @Override
    public String sendAuthEmail(EmailCodeReq emailCodeReq) {
        // 인증 코드 생성
        String code = createAuthCode();

        // 메일 발송
        String to = emailCodeReq.getEmail();
        String title = "S:Tickey 회원 가입 인증 이메일입니다.";
        String text = "<h2>S:tickey에 오신 것을 환영합니다!</h2>\n"
            + "        <p>회원가입을 완료하려면 1시간 내에 이메일 주소를 인증해주세요.</p>\n"
            + "        <p>인증 코드는 다음과 같습니다: <strong>" + code + "</strong></p>\n"
            + "        <p>만약 회원가입을 요청하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>";

        sendMail(to, title, text);

        // TODO: 레디스에 인증 코드 저장 (만료 시간 1시간)

        return code;
    }

    // 이메일 전송
    public void sendMail(String to, String title, String text) {
        MimeMessage message = sender.createMimeMessage();

        try {
            // 이메일 설정
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, false, "UTF-8");
            messageHelper.setFrom("stickey@naver.com"); // 발신자
            messageHelper.setTo(to);  // 수신자
            messageHelper.setSubject(title); // 메일 제목
            messageHelper.setText(text, true);  // 메일 본문

            // 이메일 전송
            sender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
