import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { WalletLedgerModule } from './wallet-ledger/wallet-ledger.module';
import { RegistrationModule } from './registration/registration.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.getOrThrow<string>('database.host'),
          port: config.getOrThrow<number>('database.port'),
          username: config.getOrThrow<string>('database.username'),
          password: config.getOrThrow<string>('database.password'),
          database: config.getOrThrow<string>('database.name'),
          schema: config.getOrThrow<string>('database.schema'),
          synchronize: config.getOrThrow<boolean>('database.synchronize'),
          logging: config.getOrThrow<boolean>('database.logging'),
          autoLoadEntities: true,
        };
      },
    }),

    UserModule,

    AuthModule,

    WalletModule,

    SubscriptionModule,

    WalletLedgerModule,

    RegistrationModule,

    IdentityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
