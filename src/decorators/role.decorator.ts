import { SetMetadata } from '@nestjs/common';

export const Role = (...args: Array<string | number>) =>
  SetMetadata('role', args);
