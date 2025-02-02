import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getSecretChallenge(challengeId: number, key: string) {
    const challenge = await this.prismaService.challenge.findFirst({
      where: {
        id: challengeId,
      },
    });
    if (!challenge) throw new NotFoundException('Challenge not found');
    if (challenge.key !== key)
      throw new BadRequestException('Wrong key habiby !');

    return challenge;
  }
  async getChallengesByDomain(domaineId: number) {
    const publicChallenges = await this.prismaService.challenge.findMany({
      where: {
        domaineId,
        key: null,
      },
    });
    const secretChallenges = await this.prismaService.challenge.findMany({
      where: {
        domaineId,
        key: {
          not: null,
        },
      },

      select: {
        id: true,
        name: true,
        points: true,
        tech: true,
        number: true,
        hint: true,
      },
    });

    return [...publicChallenges, ...secretChallenges];
  }
  async getDomains() {
    return await this.prismaService.domaine.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getChallenges() {
    const openChallenges = await this.prismaService.domaine.findMany({
      select: {
        id: true,
        name: true,
        challenges: {
          select: {
            id: true,
            name: true,
            description: true,
            points: true,
            tech: true,
            number: true,
          },
        },
      },
      where: {
        challenges: {
          some: {
            key: null,
          },
        },
      },
    });
  }

  async getPublicLeaderboard() {
    const { isFrozen } = await this.prismaService.controle.findFirst({
      where: {
        id: 1,
      },
    });
    if (isFrozen) throw new BadRequestException('Yezzi mil blada !');

    const result = await this.prismaService.team.findMany({
      select: {
        id: true,
        name: true,
        challenges: {
          select: {
            score: true,
          },
        },
      },
    });

    return result.map((team) => ({
      id: team.id,
      name: team.name,
      score: team.challenges.reduce((acc, curr) => acc + curr.score, 0),
    }));
  }
  async refresh() {
    await this.cacheManager.reset();
  }
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
