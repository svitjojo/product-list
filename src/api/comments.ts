import { client } from "../utils/axiosClient";
import { Comment } from "../types/Comment";

export const getProductComments = (productId: number) => {
  return client.get<Comment[]>(`/comments?productId=${productId}`);
};

export const createComment = (data: Omit<Comment, "id">) => {
  return client.post<Comment>("/comments", data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
