import { Match } from 'src/common/decorators/match.decorator';
import { LoginDto } from './login.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums';

export class SignupDto extends LoginDto {
    @Match(LoginDto, (dto) => dto.password, {
        message: 'Las contraseñas no coinciden.',
    })
    readonly passwordConfirm: string;
    @IsNotEmpty({
        message: 'El campo role no puede estar vacío.',
    })
    @IsEnum(Role)
    role: Role;
    @IsNotEmpty({
        message: 'El campo nombre completo no puede estar vacío.',
    })
    fullname: string;
    @IsNotEmpty()
    username: string;
}
