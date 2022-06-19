package com.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ItemController {
	
    @GetMapping(value = "/admin/item/new")
    public String itemForm(Model model){
        
        return "item/itemForm";
    }
}
