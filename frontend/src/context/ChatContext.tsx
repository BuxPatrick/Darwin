
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

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

  // Mock AI response based on user input
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate AI response based on the learning mode
    const responses = {
      explain: `Here's an explanation: ${userMessage} involves concepts related to [topic]. The key principles are X, Y, and Z. Think of it like [analogy].`,
      quiz: `Let's test your knowledge on ${userMessage}. Question: What is the primary concept behind [related concept]? A) Option 1, B) Option 2, C) Option 3, D) Option 4`,
      eli5: `Imagine ${userMessage} is like playing with toys. When you [simplified analogy], that's basically what's happening with [concept] in simple terms!`,
      challenge: `That's an interesting question about ${userMessage}. Let's go beyond the basics. Consider this challenging scenario: [complex scenario]. How would you apply the principles to solve it?`
    };
    
    return responses[learningMode];
  };

  // Detect subject and topic from user message
  const detectSubjectAndTopic = (message: string) => {
    // In real implementation, this would call a backend API that uses Gemini
    // For now, we'll use a simple mock implementation
    
    if (message.toLowerCase().includes("math")) {
      return { subject: "Mathematics", topic: "Calculus" };
    } else if (message.toLowerCase().includes("science")) {
      return { subject: "Science", topic: "Physics" };
    } else if (message.toLowerCase().includes("history")) {
      return { subject: "History", topic: "World Wars" };
    } else {
      return { subject: "General Knowledge", topic: "Learning" };
    }
  };

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

      // Update subject and topic if this is the first message or if we detect a new subject
      if (messages.length === 0 || Math.random() > 0.7) {
        const newSubjectInfo = detectSubjectAndTopic(content);
        setSubjectInfo(newSubjectInfo);
      }

      // Generate AI response
      const aiResponseContent = await generateAIResponse(content);
      
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
