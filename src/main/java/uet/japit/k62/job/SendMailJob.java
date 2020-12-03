package uet.japit.k62.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import uet.japit.k62.models.request.ReqSendMail;

import javax.mail.internet.MimeMessage;

public class SendMailJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            ReqSendMail reqSendMail = (ReqSendMail) context.getJobDetail().getJobDataMap().get("data");
            JavaMailSender emailSender = (JavaMailSender) context.getJobDetail().getJobDataMap().get("emailSender");
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setTo(reqSendMail.getSendTo());
            helper.setText(reqSendMail.getContent(), true);
            helper.setSubject(reqSendMail.getSubject());
            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}