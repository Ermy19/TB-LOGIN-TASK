import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProtectedController } from './auth/auth.controller';
import { Auth0Middleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController, ProtectedController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth0Middleware)
      .forRoutes('protected');
  }
}
