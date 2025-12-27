import { cookies } from "next/headers";
import nextServer from "./api";
import type { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (
  page: number,
  search: string,
  tag: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params =
    tag && tag !== "all"
      ? { page, perPage: 12, search, tag }
      : { page, perPage: 12, search };

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkServerSession = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
