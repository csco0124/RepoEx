package com.narui.test.dto;

import lombok.Builder;

public class Member {

    private Long id;
    private String name;
    private Long age;
    private String addr;
    private String phoneNumber;
    private String useYn;

    public Member() {
        super();
    }
    
    @Builder
    public void createMember(Long id, String name, Long age, String addr, String phoneNumber, String useYn) {
    	this.id = id;
    	this.name = name;
    	this.age = age;
    	this.addr = addr;
    	this.phoneNumber = phoneNumber;
    	this.useYn = useYn;
	}
    
//	//TODO
//	//lombok에서 제공하는 어노테이션으로 자동 getter / setter 적용해야함..

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }
    
    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    @Override
    public String toString() {
        return String.format("[id=%s, name=%s, age=%s, addr=%s, phoneNumber=%s, useYn=%s]", id, name, age, addr, phoneNumber, useYn);
    }

}