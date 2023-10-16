import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import NotifierProviderType from '@steroidsjs/nest-modules/notifier/enums/NotifierProviderType';
import {AuthConfirmService} from '../../domain/services/AuthConfirmService';
import {PhoneCodeAuthGuard} from '../guards/PhoneCodeAuthGuard';
import {AuthConfirmSendSmsDto} from '../../domain/dtos/AuthConfirmSendSmsDto';
import {AuthConfirmLoginDto} from '../../domain/dtos/AuthConfirmLoginDto';
import {AuthService} from '../../domain/services/AuthService';
import {AuthConfirmSchema} from '../schemas/AuthConfirmSchema';
import {AuthLoginSchema} from '../schemas/AuthLoginSchema';
import {ContextDto} from '../../domain/dtos/ContextDto';
import {Context} from '../decorators/Context';

@ApiTags('Авторизация по телефону')
@Controller('/auth/phone')
export class AuthPhoneController {
    constructor(
        @Inject(AuthConfirmService)
        private authConfirmService: AuthConfirmService,

        @Inject(AuthService)
        private authService: AuthService,
    ) {
    }

    @Post('/sms')
    @ApiOkResponse({type: AuthConfirmSchema})
    async sendSmsCode(
        @Body() dto: AuthConfirmSendSmsDto,
        @Context() context: ContextDto,
    ) {
        return this.authConfirmService.sendCode(
            dto,
            NotifierProviderType.SMS,
            context,
            AuthConfirmSchema,
        );
    }

    @Post('/call')
    @ApiOkResponse({type: AuthConfirmSchema})
    async sendSmsCodeByCall(
        @Body() dto: AuthConfirmSendSmsDto,
        @Context() context: ContextDto,
    ) {
        return this.authConfirmService.sendCode(
            dto,
            NotifierProviderType.CALL,
            context,
            AuthConfirmSchema,
        );
    }

    @Post('/send')
    @ApiOkResponse({type: AuthConfirmSchema})
    async send(
        @Body() dto: AuthConfirmSendSmsDto,
        @Context() context: ContextDto,
    ) {
        return this.authConfirmService.sendCode(
            dto,
            null,
            context,
            AuthConfirmSchema,
        );
    }

    @Post('/confirm')
    @ApiBody({type: AuthConfirmLoginDto})
    @ApiOkResponse({type: AuthLoginSchema})
    @UseGuards(PhoneCodeAuthGuard)
    async loginByPhoneCode(
        @Body() dto: AuthConfirmLoginDto,
    ) {
        return this.authConfirmService.confirmCode(dto, AuthLoginSchema);
    }
}
