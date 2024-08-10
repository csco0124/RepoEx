package com.open.toss;

import java.util.HashMap;
import java.util.Map;

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

@Controller
public class SignatureController {
	
	public static String[] user_key = { "ci", "name", "birthday", "gender", "nationality",
										"ci2", "di", "ciUpdate", "phone", "address", 
										"addressDetails", "zipCode", "email", "doc", "signedDoc"};
	
	@Value("${toss.signature.request.url}")
	private String signRequestUrl;
	@Value("${toss.signature.result.url}")
	private String signResultUrl;
	
	@Autowired
	private TossAuthCommon tossAuthCommon;
	
	@GetMapping("/toss/signature")
	public String main() {
		return "toss/signature/index";
	}
	
	@GetMapping("/toss/signStart")
	public String signStart(Model model) throws Exception {
		
		model.addAttribute("tokenInfo", tossAuthCommon.getToken());
		return "toss/signature/signStart";
	}
	
	@PostMapping("/toss/signRequest")
	public @ResponseBody String signRequest(@RequestBody Map<String, Object> formData, Model model) throws Exception {
		HashMap<String, String> resultMap = tossAuthCommon.certAppPushSignatureRequestData(signRequestUrl, formData);
		Gson gson = new Gson();
		return gson.toJson(resultMap);
	}
	
	@PostMapping("/toss/signRequestResult")
	public String signRequestResult(@RequestParam("txId") String txId, @RequestParam("access_token") String accessToken, Model model) throws Exception {
		model.addAttribute("txId", txId);
		model.addAttribute("accessToken", accessToken);
		return "/toss/signature/signRequestResult";
	}
	
	@PostMapping("/toss/signRequestResultCheck")
	public @ResponseBody String signRequestResultCheck(@RequestBody Map<String, Object> formData, Model model) throws Exception {
		Map<String, String> userInfoMap = tossAuthCommon.getUserInfo(signResultUrl, user_key, ""+formData.get("tx_id"), ""+formData.get("access_token"));
		Gson gson = new Gson();
		return gson.toJson(userInfoMap);		
	}
	
	
}
