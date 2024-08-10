package com.narui.democlientb.test.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TreeDto extends CommDto {

    private String uid;
    private String treeJson;
    private String treeType;

}
