export interface Message {
  userName: string;
  userId: string;
  userPhotoURL: string;
  text: string;
  createdAt: number;
}

export interface MessageWithId extends Message {
  id: string;
}
