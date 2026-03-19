import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Job } from './job.schema';
import { CreateJobRequest } from './dtos/create_job.request';
import { User } from '../user/user.schema';
import { CreateJobResponse } from './dtos/create_job.response';
import { GetMyJobsResponse } from './dtos/my_jobs.response';
import { UpdateJobRequest } from './dtos/update_job.request';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_MODEL') private readonly jobModel: Model<Job>,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  async create(body: CreateJobRequest): Promise<CreateJobResponse> {
    const user = await this.userModel
      .findOne({ _id: body.userId, isDeleted: { $ne: true } })
      .exec();

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const existingJob = await this.jobModel
      .findOne({ jobUrl: body.jobUrl })
      .exec();

    if (!existingJob) {
      throw new HttpException('Job already exists', HttpStatus.CONFLICT);
    }

    const job = new this.jobModel(body);
    await job.save();

    const { userId, isDeleted, ...createdJob } = job.toObject();

    return createdJob;
  }

  async findAll(userId: string): Promise<GetMyJobsResponse> {
    const user = await this.userModel
      .findOne({ _id: userId, isDeleted: { $ne: true } })
      .exec();

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const jobs = await this.jobModel
      .find({ userId: userId, isDeleted: { $ne: true } })
      .select('-userId')
      .exec();

    return { data: jobs };
  }

  async find(jobId: string): Promise<CreateJobResponse> {
    const job = await this.jobModel
      .findOne({ _id: jobId, isDeleted: { $ne: true } })
      .select('-userId')
      .exec();

    if (!job) {
      throw new HttpException('Job does not exist', HttpStatus.NOT_FOUND);
    }

    return job;
  }

  async update(
    jobId: string,
    body: UpdateJobRequest,
  ): Promise<CreateJobResponse> {
    const existingJob = await this.jobModel
      .findOne({ _id: jobId, isDeleted: { $ne: true } })
      .select('-userId')
      .exec();

    if (!existingJob) {
      throw new HttpException('Job does not exist', HttpStatus.NOT_FOUND);
    }

    const updatedJob = await this.jobModel
      .findOneAndUpdate({ _id: jobId }, { $set: { body } }, { new: true })
      .select('-userId')
      .exec();

    if (!updatedJob) {
      throw new HttpException(
        'Something went wrong, job was not updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedJob;
  }

  async delete(jobId: string): Promise<void> {
    const existingJob = await this.jobModel
      .findOne({ _id: jobId, isDeleted: { $ne: true } })
      .select('-userId')
      .exec();

    if (!existingJob) {
      throw new HttpException('Job does not exist', HttpStatus.NOT_FOUND);
    }

    await this.jobModel.findOneAndUpdate(
      { _id: jobId },
      { $set: { isDeleted: true } },
    );
  }
}
