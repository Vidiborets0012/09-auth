import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotePreview from "./NotePreview";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
