import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../status/status-task';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsEnum(TaskStatus)
  status?: TaskStatus; //
}
