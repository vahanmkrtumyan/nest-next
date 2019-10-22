import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    register(username: string, password: string): Promise<string>;
}
