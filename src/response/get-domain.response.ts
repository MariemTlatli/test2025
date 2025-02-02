import { ApiProperty } from '@nestjs/swagger';

export class DomainResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Domain 1' })
  name: string;
}
