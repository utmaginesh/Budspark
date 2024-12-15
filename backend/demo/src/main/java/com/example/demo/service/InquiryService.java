package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ChatForm;
import com.example.demo.dto.InquiriesCount;
import com.example.demo.dto.InquiryForm;
import com.example.demo.model.Chat;
import com.example.demo.model.InquirySubmission;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.InquiryRepository;

@Service
public class InquiryService {
    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private ChatRepository chatRepository;

    public InquirySubmission submitInquiry(InquiryForm inquiryForm){
        InquirySubmission inquirySubmission = new InquirySubmission(null, inquiryForm.getInquirycode(), inquiryForm.getName(), 
        inquiryForm.getRollno(), inquiryForm.getGender(), inquiryForm.getPhone(), inquiryForm.getSubject(), inquiryForm.getDepartment(), 
        inquiryForm.getInquirytype(), inquiryForm.getInquiry(), "Received", LocalDateTime.now(),false,null, inquiryForm.getStudentEmail());
        InquirySubmission iSubmission = inquiryRepository.save(inquirySubmission);
        storeMessage(new ChatForm(iSubmission.getInquirycode(), "user", inquiryForm.getInquiry()));
        return iSubmission;
    }

    public Chat storeMessage(ChatForm chatForm){
        InquirySubmission inquirySubmission = inquiryRepository.findByInquirycode(chatForm.getIc()).get(0);
        Chat chat = new Chat(null, inquirySubmission, chatForm.getRole(), LocalDateTime.now(), chatForm.getMessage());
        return chatRepository.save(chat);
    }
    public List<InquirySubmission> getAllInquiries(){
        return inquiryRepository.findAll();
    }
    public List<Chat> getInquiryChat(Long id){
        InquirySubmission iSubmission = inquiryRepository.findById(id).orElse(null);
        return iSubmission.getChatMessages();
    }
    public List<Chat> saveMessage(Long id, String role, String message){
        InquirySubmission inquirySubmission = inquiryRepository.findById(id).orElse(null);
        Chat chat = new Chat(null, inquirySubmission, role, LocalDateTime.now(), message);
        chatRepository.save(chat);
        InquirySubmission iSubmission = inquiryRepository.findById(id).orElse(inquirySubmission);
        return iSubmission.getChatMessages();
    }
    public List<InquirySubmission> getStudentInquiries(String email){
        return inquiryRepository.findByStudentEmail(email);
    }

    public InquiriesCount getInquiriesCount(){
        InquiriesCount inquiriesCount = new InquiriesCount();
        inquiriesCount.setClarified(inquiryRepository.findByStatus("Clarified").size());
        inquiriesCount.setReceived(inquiryRepository.findByStatus("Received").size());
        inquiriesCount.setInprogress(inquiryRepository.findByStatus("Inprogress").size());
        inquiriesCount.setInquiries(inquiryRepository.findAll().size());
        return inquiriesCount;
    }
    
    public InquiriesCount getUserInquiriesCount(String email){
        InquiriesCount inquiriesCount = new InquiriesCount();
        inquiriesCount.setClarified(inquiryRepository.findByStudentEmailAndStatus(email, "Clarified").size());
        inquiriesCount.setReceived(inquiryRepository.findByStudentEmailAndStatus(email, "Received").size());
        inquiriesCount.setInprogress(inquiryRepository.findByStudentEmailAndStatus(email, "Inprogress").size());
        inquiriesCount.setInquiries(inquiryRepository.findByStudentEmail(email).size());
        return inquiriesCount;
    }

    public InquirySubmission updateInquiry(long id, String status){
        InquirySubmission iSubmission = inquiryRepository.findById(id).orElse(null);
        iSubmission.setStatus(status);
        return inquiryRepository.save(iSubmission);
    }
    public InquirySubmission updateChatOption(long id, String option){
        InquirySubmission iSubmission = inquiryRepository.findById(id).orElse(null);
        if(option.equals("enable"))
            iSubmission.setIsChatEnabled(true);
        else   
            iSubmission.setIsChatEnabled(false);
        return inquiryRepository.save(iSubmission);
    }
}
