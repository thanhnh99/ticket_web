package uet.japit.k62.job;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import uet.japit.k62.models.request.ReqSendMail;

@Service
public class MailProcess {
    Scheduler scheduler;

    public MailProcess() throws SchedulerException {
        this.scheduler = new StdSchedulerFactory().getScheduler();
    }


    public void sendMail(ReqSendMail requestData) throws SchedulerException {
        String identity = "send-mail-notify-translate-to-" + requestData.getSendTo() + "-" + System.currentTimeMillis();
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("data", requestData);
//        jobDataMap.put("emailSender", emailSender);
        JobDetail job = JobBuilder.newJob(SendMailJob.class)
//                .withIdentity(identity)
                .withDescription("Send notification email: translated")
                .usingJobData(jobDataMap)
                .build();
        Trigger trigger = TriggerBuilder.newTrigger()
//                .withIdentity(identity)
                .startNow()
                .build();
        scheduler.start();
        scheduler.scheduleJob(job, trigger);
    }
}
