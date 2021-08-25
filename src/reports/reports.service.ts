import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  public create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return this.repo.save(report);
  }

  public async findOne(id: string) {
    if (!id) {
      return null;
    }
    const report = await this.repo.findOne(id); // return 1 record or null
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  public async changeApproval(id: string, approved: boolean) {
    const report = await this.findOne(id);
    report.approved = approved;

    return this.repo.save(report);
  }

  public createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        // .select('AVG(price)', 'price')
        .select('*')
        .where('make=:make', { make })
        .andWhere('model=:model', { model })
        .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
        .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
        .andWhere('year - :year BETWEEN -3 and 3', { year })
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage }) // Because setparams above does not have 2nd arg
        .limit(3)
        .getRawMany()
    );
  }
}
