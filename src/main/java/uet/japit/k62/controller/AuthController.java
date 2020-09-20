package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.service.UserService;

@RestController
@RequestMapping("")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody ReqLogin request)
    {
        HttpResponse response = new HttpResponse();
        if(userService.authenticateUser(request) != null)
        {
            response.setMessage("success");
            response.setStatusCode("200");
            response.setData(userService.authenticateUser(request));
            return ResponseEntity.status(200).body(response);
        }
        response.setMessage("bad request");
        response.setStatusCode("400");
        response.setData(userService.authenticateUser(request));
        return ResponseEntity.status(400).body(response);
    }
}
