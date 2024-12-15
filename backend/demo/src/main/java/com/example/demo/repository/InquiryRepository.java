package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.InquirySubmission;
import java.util.List;


public interface InquiryRepository extends JpaRepository<InquirySubmission, Long>{
    List<InquirySubmission> findByInquirycode(String inquirycode);
    List<InquirySubmission> findByStudentEmail(String studentEmail);
    List<InquirySubmission> findByStatus(String status);
    List<InquirySubmission> findByStudentEmailAndStatus(String studentEmail, String status);
}
