import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialDto
    ): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(/* @Req() req */@GetUser() user: User) {
        console.log('user', User);
    }
}
