import { Injectable } from '@nestjs/common'
import { RoleName } from 'src/shared/constants/role.constants'
import { PrismaService } from 'src/shared/services/prisma.services'

@Injectable()
export class RolesService {
  private clientRoleId: number | null = null
  constructor(private readonly prismaService: PrismaService) {}

  async getClientRoleId() {
    if (this.clientRoleId) return this.clientRoleId

    const role = await this.prismaService.role.findFirstOrThrow({
      where: { name: RoleName.Client },
    })

    if (!role) throw new Error('Client role not found')

    this.clientRoleId = role.id
    return role.id
  }
}
