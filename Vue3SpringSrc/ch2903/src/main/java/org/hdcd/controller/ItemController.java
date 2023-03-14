package org.hdcd.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hdcd.domain.Item;
import org.hdcd.service.ItemService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {

	private final ItemService itemService;

	@Value("${upload.path}")
	private String uploadPath;

	@PostMapping
	public ResponseEntity<Item> register(@RequestPart("item") String itemString, @RequestPart("file") MultipartFile picture, @RequestPart("file2") MultipartFile picture2) throws Exception {
		log.info("itemString: " + itemString);
		
		Item item = new ObjectMapper().readValue(itemString, Item.class);
		
		String itemName = item.getItemName();
		String description = item.getDescription();
		
		if(itemName != null) {
			log.info("item.getItemName(): " + itemName);
			
			item.setItemName(itemName);
		}
		
		if(description != null) {
			log.info("item.getDescription(): " + description);
			
			item.setDescription(description);
		}	
		
		List<MultipartFile> pictures = new ArrayList<MultipartFile>();
		pictures.add(picture);
		pictures.add(picture2);
		
		item.setPictures(pictures);
		
		for (int i = 0; i < pictures.size(); i++) {
			MultipartFile file = pictures.get(i);

			log.info("originalName: " + file.getOriginalFilename());
			log.info("size: " + file.getSize());
			log.info("contentType: " + file.getContentType());

			String savedName = uploadFile(file.getOriginalFilename(), file.getBytes());

			if (i == 0) {
				item.setPictureUrl(savedName);
			} else if (i == 1) {
				item.setPictureUrl2(savedName);
			}
		}

		this.itemService.regist(item);
		
		log.info("register item.getItemId() = " + item.getItemId());

		Item createdItem = new Item();
		createdItem.setItemId(item.getItemId());

		return new ResponseEntity<>(createdItem, HttpStatus.OK);
	}
	
	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uid = UUID.randomUUID();

		String createdFileName = uid.toString() + "_" + originalName;

		File target = new File(uploadPath, createdFileName);

		FileCopyUtils.copy(fileData, target);

		return createdFileName;
	}

	@GetMapping("/display")
	public ResponseEntity<byte[]> displayFile(Long itemId) throws Exception {
		ResponseEntity<byte[]> entity = null;
	
		String fileName = itemService.getPicture(itemId);
	
		log.info("FILE NAME: " + fileName);
	
		try {
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
	
			MediaType mediaType = getMediaType(formatName);
	
			HttpHeaders headers = new HttpHeaders();
			
			File file = new File(uploadPath + File.separator + fileName);
	
			if (mediaType != null) {
				headers.setContentType(mediaType);
			}
	
			entity = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file), headers, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}

	private MediaType getMediaType(String formatName){
		if(formatName != null) {
			if(formatName.equals("JPG")) {
				return MediaType.IMAGE_JPEG;
			}
			
			if(formatName.equals("GIF")) {
				return MediaType.IMAGE_GIF;
			}
			
			if(formatName.equals("PNG")) {
				return MediaType.IMAGE_PNG;
			}
		}
		
		return null;
	}

	@GetMapping
	public ResponseEntity<List<Item>> list() throws Exception {
		log.info("list");
		List<Item> itemList = this.itemService.list();
		
		return new ResponseEntity<>(itemList, HttpStatus.OK);
	}

	@GetMapping("/{itemId}")
	public ResponseEntity<Item> read(@PathVariable("itemId") Long itemId) throws Exception {
		log.info("read");
		
		Item item = this.itemService.read(itemId);
			
		return new ResponseEntity<>(item, HttpStatus.OK);
	}

	@DeleteMapping("/{itemId}")
	public ResponseEntity<Void> remove(@PathVariable("itemId") Long itemId) throws Exception {
		log.info("remove");
		
		this.itemService.remove(itemId);
	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	@PutMapping
	public ResponseEntity<Item> modify(@RequestPart("item") String itemString, @RequestPart("file") MultipartFile picture, @RequestPart("file2") MultipartFile picture2) throws Exception {
		log.info("itemString: " + itemString);
		
		Item item = new ObjectMapper().readValue(itemString, Item.class);
		
		String itemName = item.getItemName();
		String description = item.getDescription();
		
		if(itemName != null) {
			log.info("item.getItemName(): " + itemName);
			
			item.setItemName(itemName);
		}
		
		if(description != null) {
			log.info("item.getDescription(): " + description);
			
			item.setDescription(description);
		}		
		
		List<MultipartFile> pictures = new ArrayList<MultipartFile>();
		pictures.add(picture);
		pictures.add(picture2);
		
		item.setPictures(pictures);
		
		for (int i = 0; i < pictures.size(); i++) {
			MultipartFile file = pictures.get(i);

			if (file != null && file.getSize() > 0) {
				log.info("originalName: " + file.getOriginalFilename());
				log.info("size: " + file.getSize());
				log.info("contentType: " + file.getContentType());

				String savedName = uploadFile(file.getOriginalFilename(), file.getBytes());

				if (i == 0) {
					item.setPictureUrl(savedName);
				}
				else if (i == 1) {
					item.setPictureUrl2(savedName);
				}
			}
		}

		this.itemService.modify(item);
	
		Item modifiedItem = new Item();
		modifiedItem.setItemId(item.getItemId());
	
		return new ResponseEntity<>(modifiedItem, HttpStatus.OK);
	}

	@GetMapping("/display2")
	public ResponseEntity<byte[]> displayFile2(Long itemId) throws Exception {
		ResponseEntity<byte[]> entity = null;
	
		String fileName = itemService.getPicture2(itemId);
	
		log.info("FILE NAME: " + fileName);
	
		try {
	
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
	
			MediaType mediaType = getMediaType(formatName);
	
			HttpHeaders headers = new HttpHeaders();
			
			File file = new File(uploadPath + File.separator + fileName);
	
			if (mediaType != null) {
				headers.setContentType(mediaType);
			}
	
			entity = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file), headers, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}
	
}
