enum MessageType {
  ERROR,
  SUCCESS
}

export interface ErrorResponse {
  message: string;
  type: MessageType;
}

export interface HttpResponse {
  success: boolean;
  errors: ErrorResponse[];
}
