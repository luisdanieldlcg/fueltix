import { Match } from 'src/common/decorators/match.decorator';
import { LoginDto } from './login.dto';
import { IsIn, IsNotEmpty } from 'class-validator';

export class SignupDto extends LoginDto {
  @Match(LoginDto, (dto) => dto.password, {
    message: 'Las contraseñas no coinciden.',
  })
  readonly passwordConfirm: string;
  @IsNotEmpty({
    message: 'El campo role no puede estar vacío.',
  })
  @IsIn([1, 2, 3])
  role: number;
  @IsNotEmpty({
    message: 'El campo nombre completo no puede estar vacío.',
  })
  fullname: string;
  @IsNotEmpty()
  username: string;
}
