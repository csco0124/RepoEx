package com.narui.bauth.domain.mail.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.UUID;

import org.bouncycastle.crypto.BufferedAsymmetricBlockCipher;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.narui.bauth.domain.mail.dto.AttachFileDto;
import com.narui.bauth.domain.mail.dto.MailDto;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeUtility;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Profile({"dev", "prd"})
@Slf4j
@Service
public class MailServiceImpl implements MailService {

	@Value("${gabia.smsId}")
	private String smsId;

	@Value("${gabia.smsKey}")
	private String smsKey;

	@Value("${gabia.callback}")
	private String callback;
	
	@Value("${jwt.issuer-uri}")
	private String serverUrl;

	private final JavaMailSenderImpl javaMailSender;
	private final SpringTemplateEngine springTemplateEngine;

	public MailServiceImpl(JavaMailSenderImpl javaMailSender, SpringTemplateEngine springTemplateEngine) {
		this.javaMailSender = javaMailSender;
		this.springTemplateEngine = springTemplateEngine;
	}
	
	@Async
	@Override
	public void sendMail(MailDto mailDto) throws MessagingException, UnsupportedEncodingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		mimeMessageHelper.setSubject(MimeUtility.encodeText(mailDto.getSubject(), "UTF-8", "B"));
		mimeMessageHelper.setText(mailDto.getContent(), mailDto.isUseHtml());
		// mimeMessageHelper.setFrom(mailDto.getFrom());
		
		if(mailDto.getTo() == null) {
			String[] recipients = mailDto.getRecipients();
			mimeMessageHelper.setTo(recipients); // 받는사람이 여러명인 경우
		} else {			
			mimeMessageHelper.setTo(mailDto.getTo());
		}

		if (!CollectionUtils.isEmpty(mailDto.getAttachFileList())) {
			for (AttachFileDto attachFileDto : mailDto.getAttachFileList()) {
				FileSystemResource fileSystemResource = new FileSystemResource(new File(attachFileDto.getRealFileNm()));
				mimeMessageHelper.addAttachment(MimeUtility.encodeText(attachFileDto.getAttachFileNm(), "UTF-8", "B"),
						fileSystemResource);
			}
		}
		javaMailSender.send(mimeMessage);
	}
	
	@Async
	@Override
	public void sendAttachMail(MailDto mailDto, MultipartFile excelFile) throws MessagingException, UnsupportedEncodingException, IOException {
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

	    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
	    mimeMessageHelper.setSubject(MimeUtility.encodeText(mailDto.getSubject(), "UTF-8", "B"));
	    mimeMessageHelper.setText(mailDto.getContent(), mailDto.isUseHtml());

	    if (StringUtils.hasText(mailDto.getFrom())) {
	        mimeMessageHelper.setFrom(mailDto.getFrom());
	    }

	    if (mailDto.getTo() == null) {
	        String[] recipients = mailDto.getRecipients();
	        mimeMessageHelper.setTo(recipients); // 받는 사람이 여러 명인 경우
	    } else {
	        mimeMessageHelper.setTo(mailDto.getTo());
	    }
	    
	    // Determine MIME type based on the file extension
        String mimeType;
        if (excelFile.getName().endsWith(".xls")) {
            mimeType = "application/vnd.ms-excel";
        } else if (excelFile.getName().endsWith(".xlsx")) {
            mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else {
            // If the file extension is unknown, set a generic MIME type for Excel files
            mimeType = "application/octet-stream";
        }
        
        if (excelFile != null && !excelFile.isEmpty()) {
        	// 1. MultipartFile에서 InputStream을 얻기
            InputStream inputStream = excelFile.getInputStream();

            // 2. InputStream을 InputStreamResource로 감싸주기
            InputStreamResource inputStreamResource = new InputStreamResource(inputStream);

            // 3. InputStreamResource를 첨부
            mimeMessageHelper.addAttachment(excelFile.getOriginalFilename(), inputStreamResource, mimeType);
	        //mimeMessageHelper.addAttachment(excelFile.getOriginalFilename(), excelFile, mimeType);
	    }
        	    
        // 원본
//    	if (excelFile != null && !excelFile.isEmpty()) {
//	        mimeMessageHelper.addAttachment(excelFile.getOriginalFilename(), excelFile);
//	    }
    	
        // 임시파일 생성 후 첨부 
//    	if (excelFile != null && !excelFile.isEmpty()) {
//    	    // 1. 임시 파일 생성
//    	    File tempFile = File.createTempFile(excelFile.getName(), null);
//
//    	    // 2. StandardMultipartFile을 File로 변환하여 임시 파일에 저장
//    	    excelFile.transferTo(tempFile);
//
//    	    // 3. 임시 파일을 첨부
//    	    mimeMessageHelper.addAttachment(excelFile.getOriginalFilename(), tempFile, mimeType);
//    	}
        
//        if (excelFile != null && !excelFile.isEmpty()) {
//            // 1. 임시 파일 생성
//            File tempFile = File.createTempFile(excelFile.getName(), null);
//
//            // 2. StandardMultipartFile을 File로 변환하여 임시 파일에 저장
//            excelFile.transferTo(tempFile);
//
//            // 3. 임시 파일을 InputStreamSource로 변환
//            InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(tempFile));
//
//            // 4. 임시 파일을 첨부
//            mimeMessageHelper.addAttachment(excelFile.getOriginalFilename(), inputStreamResource, mimeType);
//        }
	        
	    javaMailSender.send(mimeMessage);
	}

	/**
	 * SMS 발송 (sms.gabia.com)
	 */
	public String sendSms(String phone, String message) throws IOException {

		String apiKeyStr = smsId + ":" + smsKey;
		String authorization = "Basic " + Base64.getEncoder().encodeToString(apiKeyStr.getBytes());

		log.debug("apiKeyStr :: {}", apiKeyStr);
		
		OkHttpClient client = new OkHttpClient();

		// 사용자 인증
		MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
		RequestBody body = RequestBody.create("grant_type=client_credentials", mediaType);

		Request request = new Request.Builder().url("https://sms.gabia.com/oauth/token").post(body)
				.addHeader("Content-Type", "application/x-www-form-urlencoded")
				.addHeader("Authorization", authorization).addHeader("cache-control", "no-cache").build();

		Response response = client.newCall(request).execute();
		String responseStr = response.body().string();

		JSONObject responseJson = new JSONObject(responseStr);
		String accessToken = responseJson.get("access_token").toString();

		log.debug("accessToken: {}", accessToken);

		apiKeyStr = smsId + ":" + accessToken;
		authorization = "Basic " + Base64.getEncoder().encodeToString(apiKeyStr.getBytes());

		String refkey = UUID.randomUUID().toString();

		// 단문(SMS) 발송 하기

		String msg = "phone=" + phone + "&callback=" + callback + "&message=" + URLEncoder.encode(message, "UTF-8")
				+ "&refkey=" + refkey;

		body = RequestBody.create(msg, mediaType);
		request = new Request.Builder().url("https://sms.gabia.com/api/send/sms").post(body)
				.addHeader("Content-Type", "application/x-www-form-urlencoded")
				.addHeader("Authorization", authorization).addHeader("cache-control", "no-cache").build();

		response = client.newCall(request).execute();
		return response.body().string();
	}
	
	/**
	 * 메일 전송 시, 동적으로 템플릿에 데이터 추가 시 사용
	 * *템플릿과 데이터 셋팅은 Thymeleaf 사용
	 */
	@Async
	@Override
	public void sendEmailWithTemplate(MailDto mailDto) throws MessagingException, MailParseException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		
		if(mailDto.getTo() == null) {
			String[] recipients = mailDto.getRecipients();
			helper.setTo(recipients); // 받는사람이 여러명인 경우
		} else {			
			helper.setTo(mailDto.getTo()); // 보내는 이메일
		}
		
		helper.setSubject(mailDto.getSubject()); // 메일 제목

		StringBuilder htmlBuilder = new StringBuilder();
		try {
			URL url = new URL(serverUrl + mailDto.getTemplatePath());
			URLConnection con = (URLConnection)url.openConnection();
			InputStreamReader reader = new InputStreamReader(con.getInputStream(), "utf-8");
			
			BufferedReader buff = new BufferedReader(reader);
			
			String pageContents = "";
			
			while((pageContents = buff.readLine())!=null){
				htmlBuilder.append(pageContents);
				htmlBuilder.append("\r\n");
			}
			
			buff.close();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		
		//템플릿에 전달할 데이터 설정
		HashMap<String, String> values = mailDto.getValues();
		
		String html = htmlBuilder.toString();
		html = html.replace("{resetLink}", values.get("resetLink"));
		
//		Context context = new Context();
		
//		values.forEach((key, value) -> {
//            context.setVariable(key, value);
//        });
//        
//		String html = springTemplateEngine.process(mailDto.getTemplatePath(), context); // 템플릿
		helper.setText(html.toString(), true);

		javaMailSender.send(message);		
	}
}
