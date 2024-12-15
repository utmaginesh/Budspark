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
public class CollegeForm {
    private String department;
    private BigDecimal tuition;
    private BigDecimal specialCourse;
    private BigDecimal total;
}
