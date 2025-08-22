import { ConflictException, Injectable } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.services'
import { PrismaService } from 'src/shared/services/prisma.services'
import { RolesService } from './role.service'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { TokenService } from 'src/shared/services/token.services'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly rolesService: RolesService,
  ) {}

  async register(body: any) {
    try {
      const clientRoleId = await this.rolesService.getClientRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
          phoneNumber: body.phoneNumber,
          roleId: clientRoleId,
        },
        omit: {
          password: true,
          totpSecret: true,
        },
      })
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }
}
