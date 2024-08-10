package com.narui.bauth.global.mfa.user;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.MissingNode;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

/** 
 * Deserialize 오류 수정
 */
// FIX 01 --START
public class MultiFactorUserDetailsDeserializer extends JsonDeserializer<MultiFactorUserDetails> {

  @Override
  public MultiFactorUserDetails deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
      throws IOException {

    ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
    JsonNode jsonNode = mapper.readTree(jsonParser);

    Long id = readJsonNode(jsonNode, "id").asLong();    
    String email = readJsonNode(jsonNode, "email").asText();
    String phone = readJsonNode(jsonNode, "phone").asText();

    boolean using2FA = readJsonNode(jsonNode, "using2FA").asBoolean();
    String secret = readJsonNode(jsonNode, "secret").asText();
    
    Timestamp lastChallenge  = null; //TODO 
    
    //스프링 시큐리티 변수
    String nickname = readJsonNode(jsonNode, "nickname").asText();
    String password = readJsonNode(jsonNode, "password").asText();    
    boolean enabled = readJsonNode(jsonNode, "enabled").asBoolean();
    boolean accountNonExpired = readJsonNode(jsonNode, "accountNonExpired").asBoolean();
    boolean credentialsNonExpired = readJsonNode(jsonNode, "credentialsNonExpired").asBoolean();
    boolean accountNonLocked = readJsonNode(jsonNode, "accountNonLocked").asBoolean();

    List<GrantedAuthority> authorities =
        mapper.readerForListOf(GrantedAuthority.class).readValue(jsonNode.get("authorities"));

    return MultiFactorUserDetails.builder()
            .id(id)
            .email(email)
            .phone(phone)
            .using2FA(using2FA)
            .secret(secret)
            .lastChallenge(lastChallenge)
            .nickname(nickname)
            .password(password)
            .enabled(enabled)
            .accountNonExpired(accountNonExpired)
            .credentialsNonExpired(credentialsNonExpired)
            .accountNonLocked(accountNonLocked)
            .authorities(authorities)
            .build();
  }

  private JsonNode readJsonNode(JsonNode jsonNode, String field) {
    return jsonNode.has(field) ? jsonNode.get(field) : MissingNode.getInstance();
  }
}
//FIX 01 --END