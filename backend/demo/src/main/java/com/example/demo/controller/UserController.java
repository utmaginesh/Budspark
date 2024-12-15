package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.ProfileForm;
import com.example.demo.dto.SignUpForm;
import com.example.demo.model.Profiles;
import com.example.demo.model.Students;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.StudentService;

@CrossOrigin(origins = "https://budsparkinquiry.netlify.app")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpForm students) {
        Integer res = studentService.studentregister(students);
        if (res == 1 || res == 2) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(500).body(res);
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            Students stu = userRepository.findByEmail(authRequest.getUsername()).orElse(null);
            if (stu == null) {
                return ResponseEntity.status(404).body("User not found!");  
            }
            String password = stu.getPassword();
            try{
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
                if (authentication.isAuthenticated() && passwordEncoder.matches(authRequest.getPassword(), password)) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials!");  
                }
            }
            catch(Exception e){
                return ResponseEntity.status(401).body("Invalid credentials!");  

            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("There was an error processing your request!");
        }
    }

    @GetMapping("/user/profiles/{email}")
    public ResponseEntity<ProfileForm> getProfileById(@PathVariable String email) {
        try {
            Profiles profiles = studentService.getProfiles(email);
            ProfileForm pf = new ProfileForm(profiles.getName(), profiles.getRollno(), profiles.getDepartment(),
                    profiles.getEmail(), profiles.getPhone(), profiles.getYear(), profiles.getRtype());
            return ResponseEntity.ok(pf);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/updateprofiles/{email}")
    public ResponseEntity<?> updateProfile(@PathVariable String email, @RequestBody ProfileForm updatedProfile) {
        try {
            studentService.updatedProfile(email, updatedProfile);
            return ResponseEntity.status(200).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/user/getisUpdate/{email}")
    public ResponseEntity<Boolean> getIsUpdate(@PathVariable String email) {
        try {
            return ResponseEntity.ok(studentService.getIsUpdate(email));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }

    }
}
