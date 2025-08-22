import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.services'
import { HashingService } from './services/hashing.services'
import { TokenService } from './services/token.services'
import { JwtModule } from '@nestjs/jwt'

const SharedService = [PrismaService, HashingService, TokenService]

@Global()
@Module({
  exports: SharedService,
  providers: [...SharedService],
  imports: [JwtModule],
})
export class SharedModule {}
