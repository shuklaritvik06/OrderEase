import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = this.extractRoleFromHeader(request);
    if (role === 'ADMIN') {
      return true;
    }
    return false;
  }
  private extractRoleFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    const decoded = this.jwtService.decode(token, { json: true });
    return type === 'Bearer' ? decoded['role'] : undefined;
  }
}
