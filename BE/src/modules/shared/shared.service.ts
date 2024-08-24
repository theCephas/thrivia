import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  SmtpConfiguration,
  TermiiConfiguration,
} from 'src/config/configuration';
import phone from 'phone';
import { NotificationTemplates } from 'src/entities/notification-templates.entity';
import { IEmailDto } from 'src/types';
import mailer from 'nodemailer-promise';
import axios from 'axios';
import { replacer } from 'src/utils';

@Injectable()
export class SharedService {
  private readonly logger: Logger = new Logger(SharedService.name);

  constructor(
    @InjectRepository(NotificationTemplates)
    private readonly notificationTemplatesRepository: EntityRepository<NotificationTemplates>,
    @Inject(TermiiConfiguration.KEY)
    private readonly termiiConfig: ConfigType<typeof TermiiConfiguration>,
    @Inject(SmtpConfiguration.KEY)
    private readonly smtpConfig: ConfigType<typeof SmtpConfiguration>,
  ) {}

  validatePhoneNumber(phoneNo: string) {
    const { isValid, phoneNumber } = phone(phoneNo, { country: 'NG' });
    if (!isValid)
      throw new BadRequestException(
        'Phone number must be a valid nigeria phone number',
      );
    return phoneNumber;
  }

  async sendEmail(email: IEmailDto) {
    const sendMail = mailer.config({
      host: this.smtpConfig.host,
      port: this.smtpConfig.port,
      secure: true,
      from: 'Thrivia <no-reply@thrivia.ng>',
      auth: {
        user: this.smtpConfig.username,
        pass: this.smtpConfig.password,
      },
    });
    const notificationTemplate =
      await this.notificationTemplatesRepository.findOne({
        code: email.templateCode,
      });
    if (!notificationTemplate)
      throw new NotFoundException(
        `Notification template: ${email.templateCode} does not exist`,
      );
    email.html = email.data
      ? replacer(0, Object.entries(email.data), notificationTemplate.body)
      : notificationTemplate.body;
    delete email.templateCode;
    if (!email.bcc) email.bcc = 'admin@thrivia.ng';
    if (!email.from) email.from = 'Thrivia <no-reply@thrivia.ng>';
    sendMail(email);
  }

  async sendOtp(
    otp: string,
    phone: string,
    { templateCode, subject, data, to }: IEmailDto,
  ) {
    let smsOtpResponse: any;
    try {
      smsOtpResponse = await axios.post(
        `${this.termiiConfig.baseUrl}/api/sms/send`,
        {
          to: phone,
          from: 'Thrivia',
          sms: `Hi there, your code from Thrivia is: ${otp}`,
          type: 'plain',
          channel: 'generic',
          api_key: this.termiiConfig.apiKey,
        },
      );
    } catch (error) {
      this.logger.error(
        `Error occurred while Sending SMS OTP to: ${phone}. Error: ${error}`,
      );
      throw error;
    }
    if (smsOtpResponse.data.code !== 'ok')
      throw new InternalServerErrorException(smsOtpResponse.data.message);

    // if (to) {
    //   await this.sendEmail({
    //     templateCode,
    //     to,
    //     subject,
    //     data,
    //   });
    // }
    return otp;
  }
}
