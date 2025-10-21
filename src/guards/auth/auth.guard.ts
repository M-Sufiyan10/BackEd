import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   
    const request = context.switchToHttp().getRequest()
    const token = request.cookies.token
    if (!token)
    {
      throw new UnauthorizedException("NO Token")
    }
    try{
      const user = this.jwt.verify(token, {
        secret:process.env.SECRET_KEY
      })
      request.user=user;
      return true;
    }
    catch(err)
    {
      console.log("Error:", err)
      throw new UnauthorizedException("Invalid Token")
    }
  }
}
