import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { generateGeminiResponse, detectSubjectAndTopic } from "@/lib/gemini";

export type LearningMode = "explain" | "quiz" | "eli5" | "challenge";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export type SubjectInfo = {
  subject: string;
  topic: string;
} | null;

interface ChatContextType {
  messages: MessageType[];
  subjectInfo: SubjectInfo;
  learningMode: LearningMode;
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  setLearningMode: (mode: LearningMode) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [subjectInfo, setSubjectInfo] = useState<SubjectInfo>(null);
  const [learningMode, setLearningMode] = useState<LearningMode>("explain");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    setError(null);
    setLoading(true);

    try {
      // Add user message
      const userMessage: MessageType = {
        id: Date.now().toString(),
        content,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Always detect subject and topic for new messages
      console.log('Detecting subject and topic for message:', content);
      const newSubjectInfo = await detectSubjectAndTopic(content);
      console.log('Detected subject info:', newSubjectInfo);
      setSubjectInfo(newSubjectInfo);

      // Generate AI response using Gemini
      const aiResponseContent = await generateGeminiResponse(content);
      
      // Add AI response
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSubjectInfo(null);
  };

  useEffect(() => {
    // Add welcome message when chat is initialized
    if (messages.length === 0) {
      const welcomeMessage: MessageType = {
        id: "welcome",
        content: "Hi there! I'm your AI learning assistant. What would you like to learn about today?",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const value = {
    messages,
    subjectInfo,
    learningMode,
    loading,
    error,
    sendMessage,
    setLearningMode,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
