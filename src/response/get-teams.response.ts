import { ApiProperty } from '@nestjs/swagger';

export class GetTeamsResponse {
  @ApiProperty({
    example: '6b20b1a9-df51-469a-9d0a-f5c4eb90fbfc',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Team 1',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 100,
  })
  score: number;
}
