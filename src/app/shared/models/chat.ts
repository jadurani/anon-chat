import { User } from './user';

export interface ChatGroup {
  host: User;
  messageList: ChatMessage[];
}

export interface ChatMessage {
  timeSent?: string;
  sender?: User;
  text: string;
}