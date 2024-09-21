import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: (args) => `${args.value} no es un email válido.` })
  @IsNotEmpty({
    message: 'El campo email no puede estar vacío.',
  })
  readonly email: string;
  @IsNotEmpty({
    message: 'La contraseña no puede estar vacía.',
  })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  })
  readonly password: string;
}
