import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {RoomService, BookingService, UserService} from './services';
import {AgendaDataSource} from './datasources';
import cookieParser from 'cookie-parser';
import {HashPasswordService} from './util/hashpassword.util';
import {AuthService} from './services';
import {SessionService} from './services';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {JWTAuthenticationStrategy} from './authentication/jwt.strategy';
import {
  AuthorizationComponent,
  AuthorizationTags,
} from '@loopback/authorization';

import {MyAuthorizationProvider} from './providers/my-authorization.provider';
import {MulterFileUploadProvider} from './providers/file-upload.provider';
export {ApplicationConfig};

export class AgendaApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    //Cor config
    options.rest = options.rest ?? {}; // Đảm bảo options.rest tồn tại
    options.rest.cors = {
      origin: process.env.CORS_ORIGIN || 'http://127.0.0.1:3000',

      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };

    //End cors config
    super(options);

    this.service(RoomService);
    this.service(BookingService);
    this.service(UserService);
    this.service(HashPasswordService);
    this.service(AuthService);
    this.service(SessionService);
    this.sequence(MySequence);
    this.expressMiddleware('cookieParser', cookieParser() as any, {
      injectConfiguration: false,
    });

    this.static('/files', path.join(__dirname, '../public')); 
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    this.component(AuthorizationComponent);

    this.bind('authorizationProviders.my-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);
    this.bind('middleware.FileUploadProvider').toProvider(
      MulterFileUploadProvider,
    );
    this.dataSource(AgendaDataSource);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
