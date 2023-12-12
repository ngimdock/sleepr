/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export interface AuthenticateMessage {
  Authentication: string;
}

export interface AuthenticateResponse {
  id: string;
  email: string;
  password: string;
}

function createBaseAuthenticateMessage(): AuthenticateMessage {
  return { Authentication: '' };
}

export const AuthenticateMessage = {
  encode(
    message: AuthenticateMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.Authentication !== '') {
      writer.uint32(10).string(message.Authentication);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateMessage {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.Authentication = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateMessage {
    return {
      Authentication: isSet(object.Authentication)
        ? globalThis.String(object.Authentication)
        : '',
    };
  },

  toJSON(message: AuthenticateMessage): unknown {
    const obj: any = {};
    if (message.Authentication !== '') {
      obj.Authentication = message.Authentication;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateMessage>, I>>(
    base?: I,
  ): AuthenticateMessage {
    return AuthenticateMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateMessage>, I>>(
    object: I,
  ): AuthenticateMessage {
    const message = createBaseAuthenticateMessage();
    message.Authentication = object.Authentication ?? '';
    return message;
  },
};

function createBaseAuthenticateResponse(): AuthenticateResponse {
  return { id: '', email: '', password: '' };
}

export const AuthenticateResponse = {
  encode(
    message: AuthenticateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== '') {
      writer.uint32(18).string(message.email);
    }
    if (message.password !== '') {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AuthenticateResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      email: isSet(object.email) ? globalThis.String(object.email) : '',
      password: isSet(object.password)
        ? globalThis.String(object.password)
        : '',
    };
  },

  toJSON(message: AuthenticateResponse): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.email !== '') {
      obj.email = message.email;
    }
    if (message.password !== '') {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateResponse>, I>>(
    base?: I,
  ): AuthenticateResponse {
    return AuthenticateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateResponse>, I>>(
    object: I,
  ): AuthenticateResponse {
    const message = createBaseAuthenticateResponse();
    message.id = object.id ?? '';
    message.email = object.email ?? '';
    message.password = object.password ?? '';
    return message;
  },
};

export interface AuthService {
  Authenticate(request: AuthenticateMessage): Promise<AuthenticateResponse>;
}

export const AuthServiceServiceName = 'auth.AuthService';
export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AuthServiceServiceName;
    this.rpc = rpc;
    this.Authenticate = this.Authenticate.bind(this);
  }
  Authenticate(request: AuthenticateMessage): Promise<AuthenticateResponse> {
    const data = AuthenticateMessage.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Authenticate', data);
    return promise.then((data) =>
      AuthenticateResponse.decode(_m0.Reader.create(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
