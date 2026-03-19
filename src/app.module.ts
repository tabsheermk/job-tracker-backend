import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './libs/user/user.module';
import { JobModule } from './libs/job/job.module';
import { NoteModule } from './libs/note/note.module';

@Module({
  imports: [UserModule, JobModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
