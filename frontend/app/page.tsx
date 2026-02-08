import { MessageForm } from "@/components/MessageForm";
import { MessagesTable } from "@/components/MessagesTable";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-2xl font-bold">Interview Task</h1>
        <MessageForm />
        <MessagesTable />
      </main>
    </div>
  );
}