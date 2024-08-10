package com.open.toss;

import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;

import im.toss.cert.sdk.TossCertSession;
import im.toss.cert.sdk.TossCertSessionGenerator;

@Controller
public class CertificationController {
	
	public static String[] user_key = {"ci", "name", "phone", "birthday", "gender",
										"nationality", "ci2", "di", "ciUpdate", "address", 
										"addressDetails", "zipCode", "email"};
	
	@Value("${toss.certification.request.url}")
	private String certRequestUrl;
	@Value("${toss.certification.result.url}")
	private String certResultUrl;
	
	@Autowired
	private TossAuthCommon tossAuthCommon;
	
	@GetMapping("/toss/certification")
	public String main() {
		return "toss/certification/index";
	}
	
	@GetMapping("/toss/certStart")
	public String certStart(Model model) throws Exception {
		model.addAttribute("tokenInfo", tossAuthCommon.getToken());
		return "toss/certification/certStart";
	}
	
	@PostMapping("/toss/certificationRequest")
	public @ResponseBody String certificationRequest(@RequestBody Map<String, Object> formData, Model model) throws Exception {
		HashMap<String, String> resultMap = tossAuthCommon.certRequestData(certRequestUrl, formData);
		Gson gson = new Gson();
		return gson.toJson(resultMap);
	}
	
	@PostMapping("/toss/certificationRequestResult")
	public String certRequestResult(@RequestParam("txId") String txId, @RequestParam("access_token") String accessToken, Model model) throws Exception {
		Map<String, String> userInfoMap = tossAuthCommon.getUserInfo(certResultUrl, user_key, txId, accessToken);
		model.addAttribute("userInfoMap", userInfoMap);
		return "/toss/certification/certRequestResult";
	}
	
}
