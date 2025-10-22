// email.processor.ts
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  @Process('WelcomeMail')
  async handleWelcomeEmail(job: Job) {
    const { userId, mail } = job.data;
    console.log(`Sending welcome email to ${mail} for user ${userId}`);
  }
}