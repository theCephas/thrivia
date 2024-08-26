import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
} from './cooperatives.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CreateCooperativeDto, RejectApplicationDto } from './cooperatives.dto';
import { ApplicationStatus, IAuthContext, Role } from 'src/types';
import { v4 } from 'uuid';
import { generateRandomDigits } from 'src/utils';
import { Wallets } from '../wallets/wallets.entity';

@Injectable()
export class CooperativesService {
  constructor(
    @InjectRepository(Cooperatives)
    private readonly cooperativesRepository: EntityRepository<Cooperatives>,
    @InjectRepository(CooperativeUsers)
    private readonly cooperativeUsersRepository: EntityRepository<CooperativeUsers>,
    @InjectRepository(CooperativeApplications)
    private readonly cooperativeApplicationsRepository: EntityRepository<CooperativeApplications>,
    @InjectRepository(Wallets)
    private readonly walletsRepository: EntityRepository<Wallets>,
    private readonly em: EntityManager,
  ) {}

  async createCooperative(
    cooperative: CreateCooperativeDto,
    { uuid }: IAuthContext,
  ) {
    const existingCooperative = await this.cooperativesRepository.findOne([
      { name: cooperative.name },
      { regNo: cooperative.regNo },
    ]);
    if (existingCooperative) {
      if (existingCooperative.name === cooperative.name) {
        throw new ConflictException(
          `Cooperative with name: ${existingCooperative.name} already exist`,
        );
      }
      if (existingCooperative.regNo === cooperative.regNo) {
        throw new ConflictException(
          `Cooperative with registration no: ${existingCooperative.regNo} already exist`,
        );
      }
    }
    const cooperativeModel = this.cooperativesRepository.create({
      uuid: v4(),
      name: cooperative.name,
      regNo: cooperative.regNo,
      address: cooperative.address,
      contactEmail: cooperative.contactEmail,
      contactPhone: cooperative.contactPhone,
      bankName: cooperative.bankName,
      accountNo: cooperative.accountNo,
      accountName: cooperative.accountName,
      uniqueId: `COOP-${generateRandomDigits()}`,
      slug: `${cooperative.name.replace(/ /g, '-')}.thrivia.com`,
      createdBy: { uuid },
    });
    await this.em.persistAndFlush(cooperativeModel);
    const cooperativeUserModel = this.cooperativeUsersRepository.create({
      uuid: v4(),
      cooperative: { uuid: cooperativeModel.uuid },
      user: { uuid },
    });
    await this.em.persistAndFlush(cooperativeUserModel);
    const walletModel = this.walletsRepository.create({
      uuid: v4(),
      title: 'Savings',
      cooperative: { uuid: cooperativeModel.uuid },
      createdBy: { uuid },
    });
    await this.em.persistAndFlush(walletModel);
  }

  async fetchWallets(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.walletsRepository.find({
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async fetchApplications(cooperativeUuid: string, { uuid }: IAuthContext) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.cooperativeApplicationsRepository.find({
      cooperative: { uuid: cooperativeUuid },
    });
  }

  async approveApplication(
    cooperativeUuid: string,
    applicationUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    const applicationExists =
      await this.cooperativeApplicationsRepository.findOne({
        uuid: applicationUuid,
      });
    if (!applicationExists)
      throw new NotFoundException(
        `Cooperative application with id: ${applicationUuid} does not exist`,
      );
    const cooperativeApplicationModel =
      this.cooperativeApplicationsRepository.create({
        id: applicationExists.id,
        reviewedAt: new Date(),
        reviewedBy: { uuid },
        status: ApplicationStatus.APPROVED,
      });
    await this.em.persistAndFlush(cooperativeApplicationModel);
  }

  async rejectApplication(
    cooperativeUuid: string,
    applicationUuid: string,
    { reason }: RejectApplicationDto,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    const applicationExists =
      await this.cooperativeApplicationsRepository.findOne({
        uuid: applicationUuid,
      });
    if (!applicationExists)
      throw new NotFoundException(
        `Cooperative application with uuid: ${applicationUuid} does not exist`,
      );
    const cooperativeApplicationModel =
      this.cooperativeApplicationsRepository.create({
        id: applicationExists.id,
        reviewedAt: new Date(),
        reviewedBy: { uuid },
        rejectionReason: reason,
        status: ApplicationStatus.REJECTED,
      });
    await this.em.persistAndFlush(cooperativeApplicationModel);
  }

  async getApplicationDetails(
    cooperativeUuid: string,
    applicationUuid: string,
    { uuid }: IAuthContext,
  ) {
    await this.cooperativeGuard(cooperativeUuid, uuid);
    return this.cooperativeApplicationsRepository.findOne({
      uuid: applicationUuid,
    });
  }

  private async cooperativeGuard(cooperativeUuid: string, userUuid: string) {
    const cooperativeUser = await this.cooperativeUsersRepository.findOne({
      cooperative: { uuid: cooperativeUuid },
      user: { uuid: userUuid },
    });
    if (!cooperativeUser)
      throw new UnauthorizedException(
        'User not found in specified cooperative',
      );
    if (cooperativeUser.role !== Role.MANAGER)
      throw new ForbiddenException(
        'User is not a manager in specified cooperative',
      );
  }
}
