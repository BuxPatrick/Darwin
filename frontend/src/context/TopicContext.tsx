import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { 
  getSubjectTopicMap, 
  addTopicToSubject, 
  addRelatedSubject,
  validateSubjectTopic,
  getRelatedSubjects,
  type SubjectTopicMap 
} from "@/lib/subjectMapping";

export type TopicHistory = {
  subject: string;
  topic: string;
  timestamp: Date;
  messageCount: number;
  lastMessage: string;
  relatedSubjects?: string[];
};

interface TopicContextType {
  topicHistory: TopicHistory[];
  subjectMaps: Record<string, SubjectTopicMap>;
  addTopicToHistory: (subject: string, topic: string, message: string) => Promise<void>;
  getTopicHistory: (subject?: string) => TopicHistory[];
  clearTopicHistory: () => Promise<void>;
  validateTopic: (subject: string, topic: string) => boolean;
  getRelatedTopics: (subject: string) => string[];
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function useTopic() {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopic must be used within a TopicProvider");
  }
  return context;
}

interface TopicProviderProps {
  children: ReactNode;
}

export function TopicProvider({ children }: TopicProviderProps) {
  const { user } = useAuth();
  const [topicHistory, setTopicHistory] = useState<TopicHistory[]>([]);
  const [subjectMaps, setSubjectMaps] = useState<Record<string, SubjectTopicMap>>({});

  // Load topic history and subject maps when user logs in
  useEffect(() => {
    if (user) {
      loadTopicHistory();
      loadSubjectMaps();
    } else {
      setTopicHistory([]);
      setSubjectMaps({});
    }
  }, [user]);

  const loadSubjectMaps = async () => {
    if (!user) return;

    try {
      const maps = await getSubjectTopicMap(user.uid);
      setSubjectMaps(maps);
    } catch (error) {
      console.error("Error loading subject maps:", error);
    }
  };

  const loadTopicHistory = async () => {
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      const topicHistoryDoc = await getDoc(doc(userDoc, "topicHistory", "history"));
      
      if (topicHistoryDoc.exists()) {
        const data = topicHistoryDoc.data();
        setTopicHistory(data.history.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      }
    } catch (error) {
      console.error("Error loading topic history:", error);
    }
  };

  const addTopicToHistory = async (subject: string, topic: string, message: string) => {
    if (!user) return;

    // Add topic to subject map if it doesn't exist
    await addTopicToSubject(user.uid, subject, topic);

    // Get related subjects
    const relatedSubjects = getRelatedSubjects(subject, subjectMaps);

    const newTopic: TopicHistory = {
      subject,
      topic,
      timestamp: new Date(),
      messageCount: 1,
      lastMessage: message,
      relatedSubjects
    };

    try {
      const userDoc = doc(db, "users", user.uid);
      const topicHistoryDoc = doc(userDoc, "topicHistory", "history");
      
      // Update Firestore
      await setDoc(topicHistoryDoc, {
        history: arrayUnion(newTopic)
      }, { merge: true });

      // Update local state
      setTopicHistory(prev => [...prev, newTopic]);
    } catch (error) {
      console.error("Error adding topic to history:", error);
    }
  };

  const getTopicHistory = (subject?: string) => {
    if (subject) {
      return topicHistory.filter(topic => topic.subject === subject);
    }
    return topicHistory;
  };

  const clearTopicHistory = async () => {
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      const topicHistoryDoc = doc(userDoc, "topicHistory", "history");
      
      // Clear Firestore
      await setDoc(topicHistoryDoc, { history: [] });
      
      // Clear local state
      setTopicHistory([]);
    } catch (error) {
      console.error("Error clearing topic history:", error);
    }
  };

  const validateTopic = (subject: string, topic: string) => {
    return validateSubjectTopic(subject, topic, subjectMaps);
  };

  const getRelatedTopics = (subject: string) => {
    return getRelatedSubjects(subject, subjectMaps);
  };

  const value = {
    topicHistory,
    subjectMaps,
    addTopicToHistory,
    getTopicHistory,
    clearTopicHistory,
    validateTopic,
    getRelatedTopics
  };

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
} 