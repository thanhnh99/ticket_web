package uet.japit.k62.job;

import com.sun.mail.smtp.SMTPTransport;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import uet.japit.k62.models.request.ReqSendMail;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendMailJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            Properties props = System.getProperties();
            props.put("mail.smtps.host", "smtp.mailgun.org");
            props.put("mail.smtps.auth", "true");
            Session session = Session.getDefaultInstance(props, null);
            ReqSendMail reqSendMail = (ReqSendMail) context.getJobDetail().getJobDataMap().get("data");
//            JavaMailSender emailSender = (JavaMailSender) context.getJobDetail().getJobDataMap().get("emailSender");
//            MimeMessage message = emailSender.createMimeMessage();
            MimeMessage message = new MimeMessage(session);
//            message.setFrom(new InternetAddress("huuthanh99hn@mailgun.com"));
            InternetAddress[] addrs = InternetAddress.parse(reqSendMail.getSendTo(), false);
            message.setRecipients(Message.RecipientType.TO, addrs);
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setTo(reqSendMail.getSendTo());
            helper.setText(reqSendMail.getContent(), true);
            helper.setSubject(reqSendMail.getSubject());
            SMTPTransport t = (SMTPTransport) session.getTransport("smtps");
            t.connect("smtp.mailgun.org", "postmaster@sandboxdeeebe60b6b54370b4564085103d6e1e.mailgun.org", "575b66bcf01c478977e7617bdd111828-95f6ca46-68657e7f");
            t.sendMessage(message, message.getAllRecipients());
            t.close();
//            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
