import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Domain } from './response/get-challenges.response';
import { GetTeamsResponse } from './response/get-teams.response';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { DomainResponse } from './response/get-domain.response';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/public-leaderboard')
  @ApiOkResponse({
    description: 'Get all teams with their scores',
    type: [GetTeamsResponse],
  })
  getPublicLeaderboard() {
    return this.appService.getPublicLeaderboard();
  }

  @Get('/domains/:domainId/challenges')
  @ApiOkResponse({
    description: 'Get all challenges of a domain',
    type: [Domain],
  })
  getChallengesByDomain(@Param('domainId') domainId: number) {
    return this.appService.getChallengesByDomain(domainId);
  }

  @Get('/domains')
  @ApiOkResponse({
    description: 'Get all domains',
    type: [DomainResponse],
  })
  getDomains() {
    return this.appService.getDomains();
  }

  // @Get('/challenges')
  // @ApiOkResponse({
  //   description: 'Get all challenges',
  //   type: [Domain],
  // })
  // getChallenges() {
  //   return this.appService.getChallenges();
  // }

  @Get('/challenges/:challengeId/:key')
  @ApiOkResponse({
    description: 'Get a secret challenge',
    type: [Domain],
  })
  getOneChallenge(
    @Param('challengeId') challengeId: number,
    @Param('key') key: string,
  ) {
    return this.appService.getSecretChallenge(challengeId, key);
  }
  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
