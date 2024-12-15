package com.example.demo.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HostelForm {
    private String block;
    private BigDecimal hfees;
    private BigDecimal messFees;
    private BigDecimal total;
}
