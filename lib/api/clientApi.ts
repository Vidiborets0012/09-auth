import { CreateNoteData, Note } from "@/types/note";
import nextServer from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number, search: string, tag: string) => {
  const params =
    tag && tag !== "all"
      ? { page, perPage: 12, search, tag }
      : { page, perPage: 12, search };

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
