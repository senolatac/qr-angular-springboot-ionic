package com.sha.serverusermanagement.controller;

import com.sha.serverusermanagement.model.OutputMessage;
import com.sha.serverusermanagement.model.User;
import com.sha.serverusermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class QrLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private SimpMessageSendingOperations messageSendingOperations;

    ExecutorService executor = Executors.newSingleThreadExecutor();

    @PostMapping("/api/user/qrlogin/{token}")
    public ResponseEntity<?> qrLoginWithToken(@RequestBody User user, @PathVariable("token") String token){
        User u = userService.findUserByIdAndUsername(user);
        if(u==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        final OutputMessage message = new OutputMessage();
        executor.submit(()->{
            message.setToken(token);
            message.setUser(u);
            jobEnd(token, message);
        });
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/api/user/clientlogin")
    public ResponseEntity<?> qrLoginClientAuthentication(@RequestBody User user){
        User u = userService.findUserByIdAndUsername(user);
        if(u==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    private void jobEnd(String token, OutputMessage message){
        messageSendingOperations.convertAndSend(
                "/queue/messages-"+token, message);
    }
}
