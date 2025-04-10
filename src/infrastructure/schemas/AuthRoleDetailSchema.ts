import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields/ExtendField';
import {Computable} from '@steroidsjs/nest/infrastructure/decorators/Computable';
import {StringField} from '@steroidsjs/nest/infrastructure/decorators/fields';
import {AuthRoleModel} from '../../domain/models/AuthRoleModel';
import {AuthPermissionSchema} from './AuthPermissionSchema';
import {AuthRoleBaseSchema} from './AuthRoleBaseSchema';

export class AuthRoleDetailSchema {
    @ExtendField(AuthRoleModel)
    id: number;

    @ExtendField(AuthRoleModel)
    name: string;

    @ExtendField(AuthRoleModel)
    title: string;

    @ExtendField(AuthRoleModel)
    description: string;

    @ExtendField(AuthRoleModel)
    isActive: boolean;

    @ExtendField(AuthRoleModel, {
        relationClass: () => AuthRoleBaseSchema,
    })
    parent: AuthRoleBaseSchema;

    @ExtendField(AuthRoleModel)
    parentId: number;

    @ExtendField(AuthRoleModel)
    expireTime: Date;

    @ExtendField(AuthRoleModel, {
        relationClass: () => AuthPermissionSchema,
    })
    authPermissions: AuthPermissionSchema[];

    @StringField({
        isArray: true,
    })
    @Computable(({item}) => item.authPermissions.map(permission => permission.name))
    authPermissionsKeys: string[];
}
