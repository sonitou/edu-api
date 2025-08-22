import { Module } from '@nestjs/common'
import { RolesService } from './role.service'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  providers: [RolesService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
