package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.ID3Service;

@RestController
@RequestMapping("id3")
public class ID3Controller {
    @Autowired
    ID3Service id3Service;

    @GetMapping()
    public ResponseEntity<MessageResponse> decisive()
    {
        return ResponseEntity.ok().body(id3Service.decisive("rainy", 15, "FALSE", "weekend"));
    }
}
