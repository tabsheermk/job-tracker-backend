import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobRequest } from './dtos/create_job.request';
import { CreateJobResponse } from './dtos/create_job.response';
import { GetMyJobsResponse } from './dtos/my_jobs.response';
import { UpdateJobRequest } from './dtos/update_job.request';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(@Body() body: CreateJobRequest): Promise<CreateJobResponse> {
    return await this.jobService.create(body);
  }

  @Get()
  async getMyJobs(userId: string): Promise<GetMyJobsResponse> {
    // we will get userId from token later
    return await this.jobService.findAll(userId);
  }

  @Get(':id')
  async getJob(@Param('id') jobId: string): Promise<CreateJobResponse> {
    return await this.jobService.find(jobId);
  }

  @Patch(':id')
  async updatedJob(
    @Param('id') jobId: string,
    @Body() body: UpdateJobRequest,
  ): Promise<CreateJobResponse> {
    return await this.jobService.update(jobId, body);
  }

  @Delete(':id')
  async deleteJob(@Param('id') jobId: string): Promise<void> {
    return await this.jobService.delete(jobId);
  }
}
