package com.narui.bauth.domain.mfa.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Base64;

import javax.imageio.ImageIO;

import org.jboss.aerogear.security.otp.Totp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.narui.bauth.domain.mfa.dto.MultiFactorAuthenticationDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.user.service.UserService;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.common.api.ApiException;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MultiFactorAuthenticationController {

	@Value("${jwt.issuer-uri}")
	private String issuerUri;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/private/view/multi-factor/register-2fa-auth")
	public String generateQRPage() {
		return "auth/register2FaAuth";
	}

	@GetMapping(value = "/private/api/qrcode")
	public ResponseEntity<String> getQRCode(@AuthenticationPrincipal MultiFactorUserDetails user) throws Exception {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		BufferedImage qrCode = generateQRcode(user, 200);
		ImageIO.write(qrCode, "png", output);
		return new ResponseEntity<>(Base64.getEncoder().encodeToString(output.toByteArray()), HttpStatus.OK);
	}
	
	@GetMapping(value="/private/api/auth-link")
	public String moveTo2Factor(@AuthenticationPrincipal MultiFactorUserDetails user) throws UnsupportedEncodingException {
	
		String APP_NAME = "BAUTH";
		String url2Factor = "redirect:otpauth://totp/"
							+ URLEncoder.encode(APP_NAME + ":" + user.getEmail(), "UTF-8").replace("+", "%20")
							+ "?secret=" 
							+ URLEncoder.encode(user.getSecret(), "UTF-8").replace("+", "%20") 
							+ "&issuer="
							+ URLEncoder.encode(APP_NAME, "UTF-8").replace("+", "%20");
		return url2Factor;
	}
	
	/**
	 * otp 용 qrocde 생성
	 */
	public BufferedImage generateQRcode(MultiFactorUserDetails user, int qrsize) throws UnsupportedEncodingException, WriterException {
		String APP_NAME = "BAUTH";
	
		// @formatter:off
		String content = "otpauth://totp/"
						+ URLEncoder.encode(APP_NAME + ":" + user.getEmail(), "UTF-8").replace("+", "%20")
						+ "?secret=" 
						+ URLEncoder.encode(user.getSecret(), "UTF-8").replace("+", "%20") 
						+ "&issuer="
						+ URLEncoder.encode(APP_NAME, "UTF-8").replace("+", "%20");
		// @formatter:on
	
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, qrsize, qrsize);
		BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
		
		return bufferedImage;
	}
	
	@PutMapping(value="private/api/multi-factor/otp-auth")
	@ResponseBody
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> updateUsing2Fa(@RequestBody MultiFactorAuthenticationDto mfaDto){
		UserEntity userDetails =  userRepository.findByEmail(mfaDto.getEmail());
		
		if(!checkTotpUser(userDetails.getSecret(), mfaDto.getAuth())) {
		    throw new ApiException("인증번호가 일치하지 않습니다.");
		}
		
		userService.allowUsing2fa(userDetails);
		return ApiResponse.toOkResponseEntity();
	}

	private boolean checkTotpUser(String secret, String verificationCode) {
		final Totp totp = new Totp(secret);
		if(isValidLong(verificationCode) && totp.verify(verificationCode)) {
			return true;
		}
		return false;
	}
	
	private boolean isValidLong(String verificationCode) {
		try {
			Long.parseLong(verificationCode);
		} catch (final NumberFormatException e) {
			return false;
		}
		return true;
	}
}
