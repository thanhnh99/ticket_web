package uet.japit.k62.job;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.resource.Emailv31;
import org.json.JSONArray;
import org.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import uet.japit.k62.models.request.ReqSendMail;

public class SendMailJob implements Job {
    MailjetClient client;
    static String MJ_APIKEY_PUBLIC = "4c8d18af2473b22641982e21b5a7bb5c";
    static String MJ_APIKEY_PRIVATE = "83aa40eb443b22ee1e4d85ef37e941db";
    public SendMailJob() {
        ClientOptions opt = new ClientOptions("v3.1");
        opt.setTimeout(8000);
        client = new MailjetClient(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, opt);
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            ReqSendMail reqSendMail = (ReqSendMail) context.getJobDetail().getJobDataMap().get("data");
            MailjetRequest request;
            MailjetResponse response;
            request = new MailjetRequest(Emailv31.resource)
                    .property(Emailv31.MESSAGES, new JSONArray()
                            .put(new JSONObject()
                                    .put(Emailv31.Message.FROM, new JSONObject()
                                            .put("Email", reqSendMail.getFrom())
                                            .put("Name", "TickMe"))
                                    .put(Emailv31.Message.TO, new JSONArray()
                                            .put(new JSONObject()
                                                    .put("Email", reqSendMail.getSendTo())
                                                    .put("Name", reqSendMail.getSenderName())))
                                    .put(Emailv31.Message.SUBJECT, reqSendMail.getSubject())
                                    .put(Emailv31.Message.HTMLPART, reqSendMail.getHtmlContent())
                            ));
            response = client.post(request);
            System.out.println(response.getStatus());
            System.out.println(response.getData());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}