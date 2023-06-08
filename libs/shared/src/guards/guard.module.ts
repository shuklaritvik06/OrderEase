import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [JwtService],
  controllers: [],
})
export class GuardsModule {}
