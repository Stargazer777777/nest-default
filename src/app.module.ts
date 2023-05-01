import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config, getConfig } from './utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from '@/entities/entities.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], // 加载配置文件
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: config.db.username,
      password: config.db.password,
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      synchronize: true, // 是否自动将实体同步到数据库
      retryDelay: 500, // 重连数据库间隔
      retryAttempts: 10, // 最大重连次数
      autoLoadEntities: true, // 自动加载实体的forFeature
    }),
    // 注册实体模块
    EntitiesModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './static'),
      serveRoot: '/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
