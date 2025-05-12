
import { useState, useRef, useEffect } from "react";
import { useChat, LearningMode } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, SendIcon } from "lucide-react";
import Message from "./Message";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ChatInterface() {
  const {
    messages,
    subjectInfo,
    learningMode,
    setLearningMode,
    sendMessage,
    loading,
    error
  } = useChat();
  
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  };

  const toggleListening = () => {
    // This would be implemented with Web Speech API
    // For now, it's just a UI toggle
    setIsListening(!isListening);
    
    if (!isListening) {
      // Mock voice detection
      setTimeout(() => {
        setInputValue("Can you explain the chain rule in calculus?");
        setIsListening(false);
      }, 2000);
    }
  };

  const LearningModeOptions = [
    { value: "explain", label: "Explain" },
    { value: "quiz", label: "Quiz Me" },
    { value: "eli5", label: "ELI5" },
    { value: "challenge", label: "Challenge" }
  ];

  return (
    <div className="chat-container h-full flex flex-col">
      {/* Subject and Topic Banner */}
      {subjectInfo && (
        <div className="bg-secondary px-4 py-2 text-sm flex items-center justify-center border-b">
          <span className="font-semibold mr-1">Current Subject:</span> {subjectInfo.subject} 
          <span className="mx-2">|</span> 
          <span className="font-semibold mr-1">Topic:</span> {subjectInfo.topic}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4 animate-fade-in">
            <div className="message-ai rounded-lg rounded-tl-none px-4 py-2 max-w-[80%]">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                <span className="text-sm ml-1">Darwin is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Learning Mode Selector */}
      <div className="flex items-center justify-between px-4 py-2 border-t bg-card">
        <Select
          value={learningMode}
          onValueChange={(value) => setLearningMode(value as LearningMode)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Learning Mode" />
          </SelectTrigger>
          <SelectContent>
            {LearningModeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className={`px-2 py-1 rounded-full text-xs ${`learning-mode-${learningMode}`}`}>
          <span className="capitalize">{learningMode} Mode</span>
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-4 border-t">
        <Button
          type="button"
          size="icon"
          variant={isListening ? "default" : "outline"}
          className="flex-shrink-0"
          onClick={toggleListening}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Darwin anything..."
          className="flex-1"
          disabled={loading}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="flex-shrink-0"
          disabled={!inputValue.trim() || loading}
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
