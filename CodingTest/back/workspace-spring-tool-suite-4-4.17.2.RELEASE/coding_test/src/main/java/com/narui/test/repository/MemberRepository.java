package com.narui.test.repository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.narui.test.dto.Member;

@Repository
public class MemberRepository {
	
    @Autowired
    JdbcTemplate jdbcTemplate;
    
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public List<Member> findAll() {
        return jdbcTemplate.query("select * from Member", new BeanPropertyRowMapper<>(Member.class));
    }

    public Member findById(long id) {
        return jdbcTemplate.queryForObject("select * from Member where id=?", new BeanPropertyRowMapper<>(Member.class), id);
    }

    public int update(Member Member) {
        return jdbcTemplate.update("update Member " + " set name = ?, age = ?, addr = ?, phone_number = ?, use_yn = ? " + " where id = ?",
                Member.getName(), Member.getAge(), Member.getAddr(), Member.getPhoneNumber(), Member.getUseYn(), Member.getId());
    }
    
    public void deleteById(long id) {
        jdbcTemplate.update("delete from Member where id=?", id);
    }
    
    /* 코딩영역시작 */


    
    /* 코딩영역종료 */

}
