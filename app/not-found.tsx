import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 — Page not found | NoteHub",
  description:
    "The page you are looking for does not exist. Please check the URL or return to the homepage.",
  alternates: {
    canonical: "/404",
  },
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description:
      "This page does not exist. Return to NoteHub to continue working with your notes.",
    url: "https://08-zustand-olive-one.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Page not found",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
