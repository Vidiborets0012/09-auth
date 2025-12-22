import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description:
    "Create a new note in NoteHub. Add a title, content, and choose a category to organize your notes.",
  openGraph: {
    title: "Create note | NoteHub",
    description:
      "Create a new note in NoteHub. Quickly capture your ideas and stay organized.",
    url: "https://08-zustand-olive-one.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — create note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}
