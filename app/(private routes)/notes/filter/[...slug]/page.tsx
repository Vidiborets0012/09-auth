import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  // const tag = slug?.[0] === "all" ? "All notes" : slug?.[0];
  const isAll = slug?.[0] === "all";

  const tag = isAll ? null : slug?.[0];

  // const title = tag
  //   ? `Notes filtered by "${tag}" | NoteHub`
  //   : "All notes | NoteHub";
  const title = isAll
    ? "All notes | NoteHub"
    : `Notes filtered by "${tag}" | NoteHub`;

  // const description = tag
  //   ? `Browse notes filtered by "${tag}" in NoteHub.`
  //   : "Browse all your notes in NoteHub.";
  const description = isAll
    ? "Browse all your notes in NoteHub."
    : `Browse notes filtered by "${tag}" in NoteHub.`;

  const url = `https://08-zustand-olive-one.vercel.app/notes/filter/${slug?.join(
    "/"
  )}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub — notes filter",
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0] === "all" ? "" : slug[0];

  const queryKey = tag
    ? ["notes", { page: 1, search: "", tag }]
    : ["notes", { page: 1, search: "" }];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
