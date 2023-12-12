/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export interface NotifyEmailMessage {
  email: string;
  message: string;
}

export interface Empty {}

function createBaseNotifyEmailMessage(): NotifyEmailMessage {
  return { email: '', message: '' };
}

export const NotifyEmailMessage = {
  encode(
    message: NotifyEmailMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.email !== '') {
      writer.uint32(10).string(message.email);
    }
    if (message.message !== '') {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotifyEmailMessage {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotifyEmailMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotifyEmailMessage {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : '',
      message: isSet(object.message) ? globalThis.String(object.message) : '',
    };
  },

  toJSON(message: NotifyEmailMessage): unknown {
    const obj: any = {};
    if (message.email !== '') {
      obj.email = message.email;
    }
    if (message.message !== '') {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotifyEmailMessage>, I>>(
    base?: I,
  ): NotifyEmailMessage {
    return NotifyEmailMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotifyEmailMessage>, I>>(
    object: I,
  ): NotifyEmailMessage {
    const message = createBaseNotifyEmailMessage();
    message.email = object.email ?? '';
    message.message = object.message ?? '';
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

export interface NotificationsService {
  NotifyEmail(request: NotifyEmailMessage): Promise<Empty>;
}

export const NotificationsServiceServiceName =
  'notifications.NotificationsService';
export class NotificationsServiceClientImpl implements NotificationsService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || NotificationsServiceServiceName;
    this.rpc = rpc;
    this.NotifyEmail = this.NotifyEmail.bind(this);
  }
  NotifyEmail(request: NotifyEmailMessage): Promise<Empty> {
    const data = NotifyEmailMessage.encode(request).finish();
    const promise = this.rpc.request(this.service, 'NotifyEmail', data);
    return promise.then((data) => Empty.decode(_m0.Reader.create(data)));
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
