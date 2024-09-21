import { Match } from 'src/common/decorators/match.decorator';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @Match(LoginDto, (dto) => dto.password, {
    message: 'the passwords entered do not match.',
  })
  readonly passwordConfirm: string;
}
