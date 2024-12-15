package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FilterCourseForm {
    private Long id;
    private String code;
    private String name;
    private int credits;
    private int contactHrs;
    private String year;
    private String department;
}
