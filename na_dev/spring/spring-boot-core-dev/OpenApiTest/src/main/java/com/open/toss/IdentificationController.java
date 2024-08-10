package com.open.toss;

import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.apache.tomcat.util.json.JSONParser;
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
public class IdentificationController {
	
	public static String[] user_key = {"ci", "name", "birthday", "gender", "nationality",
										"ci2", "di", "ciUpdate"};
	
	@Value("${toss.identification.request.url}")
	private String idenRequestUrl;
	@Value("${toss.identification.result.url}")
	private String idenResultUrl;
	
	@Autowired
	private TossAuthCommon tossAuthCommon;
	
	@GetMapping("/toss/identification")
	public String main() {
		return "toss/identification/index";
	}
	
	@GetMapping("/toss/idenStart")
	public String idenStart(Model model) throws Exception {
		
		model.addAttribute("tokenInfo", tossAuthCommon.getToken());
		return "toss/identification/idenStart";
	}
	
	@PostMapping("/toss/certRequest")
	public @ResponseBody String certRequest(@RequestBody Map<String, Object> formData, Model model) throws Exception {
		HashMap<String, String> resultMap = tossAuthCommon.certRequestData(idenRequestUrl, formData);
		Gson gson = new Gson();
		return gson.toJson(resultMap);
	}
	
	@PostMapping("/toss/certRequestResult")
	public String certRequestResult(@RequestParam("txId") String txId, @RequestParam("access_token") String accessToken, Model model) throws Exception {
		Map<String, String> userInfoMap = tossAuthCommon.getUserInfo(idenResultUrl, user_key, txId, accessToken);
		model.addAttribute("userInfoMap", userInfoMap);
		return "/toss/identification/certRequestResult";
	}
	
}
