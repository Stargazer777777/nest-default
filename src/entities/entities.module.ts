import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  exports: [TypeOrmModule.forFeature([])],
})
export class EntitiesModule {}
