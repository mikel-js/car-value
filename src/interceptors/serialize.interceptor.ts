import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {}; // meaning any class will do
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a req is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        // run something before req is sent out
        return plainToClass(this.dto, data, {
          // turn data to dto
          excludeExtraneousValues: true, // will look into this.dto that is passed and check for expose
        });
      }),
    );
  }
}
