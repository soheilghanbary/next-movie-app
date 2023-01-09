import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class">
      <section>
        <Navbar />
        <main className="max-w-screen-xl mx-auto p-4">{children}</main>
      </section>
    </ThemeProvider>
  );
}
