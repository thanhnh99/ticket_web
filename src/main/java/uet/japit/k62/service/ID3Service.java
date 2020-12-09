package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.id3.Id3;
import uet.japit.k62.models.response.http_response.MessageResponse;

@Service
public class ID3Service {
    @Autowired
    Id3 id3;

    public MessageResponse decisive(String outlook,
                                    Integer temp,
                                    String wind,
                                    String date) {
        MessageResponse response = new MessageResponse();
        response.setMessage(id3.decision(outlook, temp, wind, date));
        return response;
    }
}
