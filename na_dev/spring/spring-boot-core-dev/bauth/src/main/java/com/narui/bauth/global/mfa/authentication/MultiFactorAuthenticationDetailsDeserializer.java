package com.narui.bauth.global.mfa.authentication;

import java.io.IOException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.MissingNode;

/** 
 * Deserialize 오류 수정
 */
// FIX 01 --START
public class MultiFactorAuthenticationDetailsDeserializer extends JsonDeserializer<MultiFactorAuthenticationDetails> {

  @Override
  public MultiFactorAuthenticationDetails deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
      throws IOException {

    ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
    JsonNode jsonNode = mapper.readTree(jsonParser);

    String verificationCode = readJsonNode(jsonNode, "verificationCode").asText();
    
    return new MultiFactorAuthenticationDetails(verificationCode);
  }

  private JsonNode readJsonNode(JsonNode jsonNode, String field) {
    return jsonNode.has(field) ? jsonNode.get(field) : MissingNode.getInstance();
  }
}
//FIX 01 --END