import {
  MiddlewareSequence,
  RequestContext,
  SequenceHandler,
  HttpErrors,
} from '@loopback/rest';

export class MySequence extends MiddlewareSequence implements SequenceHandler {
  async handle(context: RequestContext): Promise<void> {
    const req = context.request;
    const start = Date.now();
    await super.handle(context);
    if (context.response.statusCode < 400) {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${
          req.url
        } - ${Date.now() - start}ms`,
      );
    }
  }

}
