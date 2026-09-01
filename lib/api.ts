import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = {
    page,
    perPage,
    search,
    ...(tag !== "all" && { tag }),
  };

  return axios
    .get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    })
    .then((response) => response.data);
};

export const createNote = ({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> => {
  return axios
    .post<Note>(
      "https://notehub-public.goit.study/api/notes",
      {
        title,
        content,
        tag,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response.data);
};

export const deleteNote = (id: string): Promise<Note> => {
  return axios
    .delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const fetchNoteById = (id: string): Promise<Note> => {
  return axios
    .get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};
