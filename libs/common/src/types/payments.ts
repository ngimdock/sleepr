/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "payments";

export interface CreateChargeMessage {
  user: UserMessage | undefined;
  amout: number;
  card: CardMessage | undefined;
}

export interface CreateChargeResponse {
  id: string;
}

export interface UserMessage {
  id: string;
  email: string;
  password: string;
}

export interface CardMessage {
  cvc: string;
  expMonth: number;
  expYear: number;
  number: number;
}

function createBaseCreateChargeMessage(): CreateChargeMessage {
  return { user: undefined, amout: 0, card: undefined };
}

export const CreateChargeMessage = {
  encode(message: CreateChargeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      UserMessage.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.amout !== 0) {
      writer.uint32(16).int32(message.amout);
    }
    if (message.card !== undefined) {
      CardMessage.encode(message.card, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChargeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChargeMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = UserMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.amout = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.card = CardMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateChargeMessage {
    return {
      user: isSet(object.user) ? UserMessage.fromJSON(object.user) : undefined,
      amout: isSet(object.amout) ? globalThis.Number(object.amout) : 0,
      card: isSet(object.card) ? CardMessage.fromJSON(object.card) : undefined,
    };
  },

  toJSON(message: CreateChargeMessage): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = UserMessage.toJSON(message.user);
    }
    if (message.amout !== 0) {
      obj.amout = Math.round(message.amout);
    }
    if (message.card !== undefined) {
      obj.card = CardMessage.toJSON(message.card);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChargeMessage>, I>>(base?: I): CreateChargeMessage {
    return CreateChargeMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateChargeMessage>, I>>(object: I): CreateChargeMessage {
    const message = createBaseCreateChargeMessage();
    message.user = (object.user !== undefined && object.user !== null)
      ? UserMessage.fromPartial(object.user)
      : undefined;
    message.amout = object.amout ?? 0;
    message.card = (object.card !== undefined && object.card !== null)
      ? CardMessage.fromPartial(object.card)
      : undefined;
    return message;
  },
};

function createBaseCreateChargeResponse(): CreateChargeResponse {
  return { id: "" };
}

export const CreateChargeResponse = {
  encode(message: CreateChargeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChargeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChargeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateChargeResponse {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: CreateChargeResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChargeResponse>, I>>(base?: I): CreateChargeResponse {
    return CreateChargeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateChargeResponse>, I>>(object: I): CreateChargeResponse {
    const message = createBaseCreateChargeResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseUserMessage(): UserMessage {
  return { id: "", email: "", password: "" };
}

export const UserMessage = {
  encode(message: UserMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserMessage();
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

  fromJSON(object: any): UserMessage {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserMessage): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserMessage>, I>>(base?: I): UserMessage {
    return UserMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserMessage>, I>>(object: I): UserMessage {
    const message = createBaseUserMessage();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseCardMessage(): CardMessage {
  return { cvc: "", expMonth: 0, expYear: 0, number: 0 };
}

export const CardMessage = {
  encode(message: CardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cvc !== "") {
      writer.uint32(10).string(message.cvc);
    }
    if (message.expMonth !== 0) {
      writer.uint32(16).int32(message.expMonth);
    }
    if (message.expYear !== 0) {
      writer.uint32(24).int32(message.expYear);
    }
    if (message.number !== 0) {
      writer.uint32(32).int32(message.number);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cvc = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expMonth = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expYear = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.number = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CardMessage {
    return {
      cvc: isSet(object.cvc) ? globalThis.String(object.cvc) : "",
      expMonth: isSet(object.expMonth) ? globalThis.Number(object.expMonth) : 0,
      expYear: isSet(object.expYear) ? globalThis.Number(object.expYear) : 0,
      number: isSet(object.number) ? globalThis.Number(object.number) : 0,
    };
  },

  toJSON(message: CardMessage): unknown {
    const obj: any = {};
    if (message.cvc !== "") {
      obj.cvc = message.cvc;
    }
    if (message.expMonth !== 0) {
      obj.expMonth = Math.round(message.expMonth);
    }
    if (message.expYear !== 0) {
      obj.expYear = Math.round(message.expYear);
    }
    if (message.number !== 0) {
      obj.number = Math.round(message.number);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CardMessage>, I>>(base?: I): CardMessage {
    return CardMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CardMessage>, I>>(object: I): CardMessage {
    const message = createBaseCardMessage();
    message.cvc = object.cvc ?? "";
    message.expMonth = object.expMonth ?? 0;
    message.expYear = object.expYear ?? 0;
    message.number = object.number ?? 0;
    return message;
  },
};

export interface PaymentsService {
  CreateCharge(request: CreateChargeMessage): Promise<CreateChargeResponse>;
}

export const PaymentsServiceServiceName = "payments.PaymentsService";
export class PaymentsServiceClientImpl implements PaymentsService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || PaymentsServiceServiceName;
    this.rpc = rpc;
    this.CreateCharge = this.CreateCharge.bind(this);
  }
  CreateCharge(request: CreateChargeMessage): Promise<CreateChargeResponse> {
    const data = CreateChargeMessage.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCharge", data);
    return promise.then((data) => CreateChargeResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
