export interface AuthPayloadInterface {
  id: number | string;
  address: string;
}

export interface MobileAuthPayloadInterface {
  phoneNumber: string;
}

export interface UserAuthPayloadInterface {
  authType: 'admin' | 'client';
  userId: number;
  entity: string;
}
