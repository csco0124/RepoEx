package com.narui.bauth.domain.client.dto;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ClientDto {
	@Getter
    @Setter
    @NoArgsConstructor
    public static class ClientName {
	   private String id;
	   private String clientName;
	   private String clientId;
	   private List<String> authority;
	   
	   public ClientName(String id, String clientName, String clientId, List<String> authority) {
			this.id = id;
			this.clientName = clientName;
			this.clientId = clientId;
			this.authority = authority;
		}
      
    }
}
