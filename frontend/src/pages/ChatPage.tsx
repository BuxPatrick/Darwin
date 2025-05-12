
import ChatInterface from "@/components/Chat/ChatInterface";
import Layout from "@/components/Layout/Layout";

export default function ChatPage() {
  return (
    <Layout requireAuth>
      <div className="container max-w-screen-xl mx-auto px-4 h-[calc(100vh-5rem)]">
        <ChatInterface />
      </div>
    </Layout>
  );
}
