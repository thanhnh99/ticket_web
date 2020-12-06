package uet.japit.k62.job;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.errors.MailjetServerException;
import com.mailjet.client.errors.MailjetSocketTimeoutException;
import com.mailjet.client.resource.Emailv31;
import org.json.JSONArray;
import org.json.JSONObject;
public class MailExample {
    /**
     * This call sends a message to one recipient.
     */
    static String MJ_APIKEY_PUBLIC = "4c8d18af2473b22641982e21b5a7bb5c";
    static String MJ_APIKEY_PRIVATE = "83aa40eb443b22ee1e4d85ef37e941db";
    public static void main(String[] args) throws MailjetException, MailjetSocketTimeoutException {
        MailjetClient client;
        MailjetRequest request;
        MailjetResponse response;
        ClientOptions opt = new ClientOptions("v3.1");
        opt.setTimeout(8000);
        client = new MailjetClient(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, opt);
        request = new MailjetRequest(Emailv31.resource)
                .property(Emailv31.MESSAGES, new JSONArray()
                        .put(new JSONObject()
                                .put(Emailv31.Message.FROM, new JSONObject()
                                        .put("Email", "17021156@vnu.edu.vn")
                                        .put("Name", "TickMe"))
                                .put(Emailv31.Message.TO, new JSONArray()
                                        .put(new JSONObject()
                                                .put("Email", "nthue189@gmail.com")
                                                .put("Name", "Hue Nguyen")))
                                .put(Emailv31.Message.SUBJECT, "Long time no see!")
                                .put(Emailv31.Message.TEXTPART, "Dear Hue, long time no see. Do you remember me?")
                                .put(Emailv31.Message.HTMLPART, "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!")
                                ));
//        request = new MailjetRequest(Email.resource)
//                .property(Email.MESSAGE, new JSONArray())
//                .p
//        client.setDebug(2);
        try
        {
            response = client.post(request);

            System.out.println(response.getStatus());
            System.out.println(response.getData());
        }
        catch (MailjetServerException e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }
}