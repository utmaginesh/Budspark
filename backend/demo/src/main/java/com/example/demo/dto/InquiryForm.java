package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InquiryForm {
    private String inquirycode;
    private String name;
    private String rollno;
    private String gender;
    private String phone;
    private String subject;
    private String department;
    private String inquirytype;
    private String inquiry;
    private String studentEmail;
}
