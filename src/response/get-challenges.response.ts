import { ApiProperty } from '@nestjs/swagger';
import { Tech } from '@prisma/client';
import { DomainResponse } from './get-domain.response';

export class Challenge {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Challenge 1' })
  name: string;

  @ApiProperty({ example: 'Description of Challenge 1' })
  description: string;

  @ApiProperty({ example: 10 })
  points: number;

  @ApiProperty({ example: Tech.AI })
  tech: Tech;

  @ApiProperty({ example: 1 })
  number: number;
}

export class Domain extends DomainResponse {
  @ApiProperty({ type: () => [Challenge] })
  challenges: Challenge[];
}
