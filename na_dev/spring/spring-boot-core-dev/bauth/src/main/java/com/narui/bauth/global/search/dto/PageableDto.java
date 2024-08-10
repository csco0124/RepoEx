package com.narui.bauth.global.search.dto;

import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PageableDto {
  
  @NotNull
  @Range(min = 1, max = 1000)
  @Schema(description = "페이지 사이즈", defaultValue = "10")
  private int size;

  @NotNull
  @PositiveOrZero
  @Schema(description = "페이지", defaultValue = "0")
  private int page;

  @Schema(description = "정렬 키")
  private String sort;

  @Pattern(regexp = "^(ASC|DESC|asc|desc)$")
  @Schema(description = "정렬 방향")
  private String direction;

  public PageableDto() {
    this.size = 10;
    this.page = 0;
    this.sort = "id";
    this.direction = "ASC";
  }

  @JsonIgnore
  public Pageable getPageable() {
    Direction direction = Direction.DESC;
    if ("ASC".equals(this.direction)|| "asc".equals(this.direction)) {
      direction = Direction.ASC;
    }
    return PageRequest.of(this.page, this.size, direction, this.sort);
  }
}