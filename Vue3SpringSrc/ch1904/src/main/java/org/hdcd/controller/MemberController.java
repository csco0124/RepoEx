package org.hdcd.controller;

import java.util.List;

import org.hdcd.domain.Address;
import org.hdcd.domain.Card;
import org.hdcd.domain.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/users")
public class MemberController {
	
	@PostMapping(path = "", produces="text/plain;charset=utf-8")
	public ResponseEntity<String> register(@Validated @RequestBody Member member, BindingResult result) {
		log.info("register");
		
		log.info("member.getUserId() = " + member.getUserId());
		log.info("member.getPassword() = " + member.getPassword());
		log.info("member.getUserName() = " + member.getUserName());
		log.info("member.getEmail() = " + member.getEmail());
		log.info("member.getDateOfBirth() = " + member.getDateOfBirth());
		
		Address address = member.getAddress();
		
		if(address != null) {
			log.info("address != null address.getPostCode() = " + address.getPostCode());
			log.info("address != null address.getLocation() = " + address.getLocation());
		}
		else {
			log.info("address == null");
		}
		
		List<Card> cardList = member.getCardList();
		
		if(cardList != null) {
			log.info("cardList != null = " + cardList.size());
			
			for(int i = 0; i < cardList.size(); i++) {
				Card card = cardList.get(i);
				log.info("card.getNo() = " + card.getNo());
				log.info("card.getValidMonth() = " + card.getValidMonth());
			}
		}
		else {
			log.info("cardList == null");
		}		
		
		if(result.hasErrors()) {
			ResponseEntity<String> entity = new ResponseEntity<String>(result.toString(), HttpStatus.BAD_REQUEST);
			
			return entity;
		}
		
		ResponseEntity<String> entity = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);

		return entity;
	}

}
