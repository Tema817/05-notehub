import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export interface DeleteNoteResponse {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return response.data;
}

export async function createNote(
  noteData: CreateNoteParams
): Promise<Note> {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await api.delete<DeleteNoteResponse>(
    `/notes/${id}`
  );
  return response.data;
}