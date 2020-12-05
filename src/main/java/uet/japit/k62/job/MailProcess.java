package uet.japit.k62.job;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Service;
import uet.japit.k62.models.request.ReqSendMail;

@Service
public class MailProcess {
    Scheduler scheduler;

    public MailProcess() throws SchedulerException {
        this.scheduler = new StdSchedulerFactory().getScheduler();
    }


    public void sendMail(ReqSendMail requestData, String jobDescription) throws SchedulerException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("data", requestData);
        JobDetail job = JobBuilder.newJob(SendMailJob.class)
                .withDescription(jobDescription)
                .usingJobData(jobDataMap)
                .build();
        Trigger trigger = TriggerBuilder.newTrigger()
                .startNow()
                .build();
        scheduler.start();
        scheduler.scheduleJob(job, trigger);
    }
}
