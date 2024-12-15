package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileForm {

    private String name;
    private String rollno;
    private String department;
    private String email;
    private String phone;
    private String year;
    private String rtype;
}
