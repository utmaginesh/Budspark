package com.example.demo.service;

// import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProfileForm;
import com.example.demo.dto.SignUpForm;
import com.example.demo.model.Profiles;
import com.example.demo.model.Students;
import com.example.demo.repository.UserRepository;

@Service
public class StudentService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Integer studentregister(SignUpForm stu){
        Students student = repository.findByEmail(stu.getEmail()).orElse(null);
        if(student != null){
            return 1;
        }
        try{
            Students students = new Students();
            students.setIsProfUpdated(false);
            students.setRole("user");
            students.setName(stu.getName());
            students.setEmail(stu.getEmail());
            System.out.println("Hello");
            students.setPassword(passwordEncoder.encode(stu.getPassword()));
            students.setProfile(new Profiles(null, stu.getName(), null, null, stu.getEmail(), null, null, null, students));
            repository.save(students);
            return 2;
        }
        catch(Exception e){
            return -1;
        }
    }
    // public Integer studentLogin(LoginForm loginForm){
    //     Students stu = repository.findByEmail(loginForm.getEmail()).orElse(null);
    //     if(stu == null)
    //         return 1;
    //     else if(!stu.getPassword().equals(loginForm.getPassword()))
    //         return 2;
    //     else
    //         return 3;
    // }
    public Profiles getProfiles(String email){
        Students s = repository.findByEmail(email).orElse(null);
        if(s != null)
        return s.getProfile();
        return null;
    }
    public void updatedProfile(String email, ProfileForm form){
        Students s = repository.findByEmail(email).orElse(null);
        s.setIsProfUpdated(true);
        Profiles p = s.getProfile();
        p.setName(form.getName());
        p.setRollno(form.getRollno());
        p.setDepartment(form.getDepartment());
        p.setYear(form.getYear());
        p.setPhone(form.getPhone());        
        p.setRtype(form.getRtype());
        repository.save(s);
    }
    public boolean getIsUpdate(String email){
        Students s = repository.findByEmail(email).orElse(null);
        return (s == null ? false : s.getIsProfUpdated());
    }
}
