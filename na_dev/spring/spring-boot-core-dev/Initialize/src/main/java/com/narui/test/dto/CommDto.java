package com.narui.test.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
@Getter
@Setter
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class CommDto {

    private LocalDateTime regDt;
    private String registrar;
    private LocalDateTime mdfDt;
    private String modifier;
    private String delYn;

}
