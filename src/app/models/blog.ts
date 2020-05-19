export interface Blog {
  _id: string;
  topic: string;
  details: string;
  date: string;
  createdBy?: string;
  comments: Comment[]
}

export interface Comment {
  _id: string;
  comment: string;
  postedBy: string;
}
