package com.narui.bauth.global.webauthn.authentication;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.MissingNode;
import com.webauthn4j.springframework.security.WebAuthnAuthenticationRequest;
import com.webauthn4j.springframework.security.WebAuthnAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/** 
 * Deserialize 오류 수정
 */
public class WebAuthnAuthenticationTokenDeserializer extends JsonDeserializer<WebAuthnAuthenticationToken> {

    private static final TypeReference<List<GrantedAuthority>> GRANTED_AUTHORITY_LIST = new TypeReference<List<GrantedAuthority>>() {
    };

    private static final TypeReference<Object> OBJECT = new TypeReference<Object>() {
    };

    @Override
    public WebAuthnAuthenticationToken deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JacksonException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        JsonNode jsonNode = mapper.readTree(jp);
        Boolean authenticated = readJsonNode(jsonNode, "authenticated").asBoolean();
        JsonNode principalNode = readJsonNode(jsonNode, "principal");
        Object principal = getPrincipal(mapper, principalNode);
        JsonNode credentialsNode = readJsonNode(jsonNode, "credentials");
        WebAuthnAuthenticationRequest credentials = getCredentials(credentialsNode);
        List<GrantedAuthority> authorities = mapper.readValue(readJsonNode(jsonNode, "authorities").traverse(mapper),
                GRANTED_AUTHORITY_LIST);
        WebAuthnAuthenticationToken token = (!authenticated)
                ? new WebAuthnAuthenticationToken(principal, credentials, new ArrayList<>())
                : new WebAuthnAuthenticationToken(principal, credentials, authorities);
        JsonNode detailsNode = readJsonNode(jsonNode, "details");
        if (detailsNode.isNull() || detailsNode.isMissingNode()) {
            token.setDetails(null);
        } else {
            Object details = mapper.readValue(detailsNode.toString(), OBJECT);
            token.setDetails(details);
        }
        return token;
    }

    private WebAuthnAuthenticationRequest getCredentials(JsonNode credentialsNode) {
        if (credentialsNode.isNull() || credentialsNode.isMissingNode()) {
            return null;
        }

        ObjectMapper om = new ObjectMapper();
        try {
            byte[] credentialId = om.treeToValue(credentialsNode.get("credentialId"), byte[].class);
            byte[] clientDataJSON = om.treeToValue(credentialsNode.get("clientDataJSON"), byte[].class);
            byte[] authenticatorData = om.treeToValue(credentialsNode.get("authenticatorData"), byte[].class);
            byte[] signature = om.treeToValue(credentialsNode.get("signature"), byte[].class);
            String clientExtensionsJSON = om.treeToValue(credentialsNode.get("clientExtensionsJSON"), String.class);

            return new WebAuthnAuthenticationRequest(
                    credentialId,
                    clientDataJSON,
                    authenticatorData,
                    signature,
                    clientExtensionsJSON);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private Object getPrincipal(ObjectMapper mapper, JsonNode principalNode)
            throws IOException, JsonParseException, JsonMappingException {
        if (principalNode.isObject()) {
            return mapper.readValue(principalNode.traverse(mapper), Object.class);
        }
        return principalNode.asText();
    }

    private JsonNode readJsonNode(JsonNode jsonNode, String field) {
        return jsonNode.has(field) ? jsonNode.get(field) : MissingNode.getInstance();
    }
}
