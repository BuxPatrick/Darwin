
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("progress");

  // Mock data - in a real app this would come from Firestore
  const progressData = [
    { subject: "Mathematics", topic: "Calculus", accuracy: 85 },
    { subject: "Physics", topic: "Kinematics", accuracy: 70 },
    { subject: "Computer Science", topic: "Algorithms", accuracy: 92 },
    { subject: "History", topic: "World War II", accuracy: 65 }
  ];

  const sessionData = [
    { date: "2023-05-12", duration: "25 mins", questions: 12, subject: "Mathematics", topic: "Calculus" },
    { date: "2023-05-11", duration: "40 mins", questions: 18, subject: "Physics", topic: "Kinematics" },
    { date: "2023-05-10", duration: "15 mins", questions: 8, subject: "Computer Science", topic: "Algorithms" }
  ];

  const badges = [
    { name: "5-Day Streak", description: "You've been learning for 5 days straight!" },
    { name: "Quiz Master", description: "Answered 10 quiz questions correctly" },
    { name: "Subject Explorer", description: "Explored 3 different subjects" }
  ];

  const learningStyle = "Visual Learner";
  const streak = 5;
  const totalSessions = 24;
  const quizAccuracy = 78;

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.displayName || "Learner"}! Here's your learning progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} days</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Style</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningStyle}</div>
            <p className="text-xs text-muted-foreground">
              Based on your learning history
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              15 hours of learning
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quiz Accuracy</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different dashboard sections */}
      <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        
        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <div>
                    <span>{item.subject}</span>
                    <span className="text-muted-foreground"> | {item.topic}</span>
                  </div>
                  <span>{item.accuracy}%</span>
                </div>
                <Progress value={item.accuracy} className="h-2" />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Session History Tab */}
        <TabsContent value="history">
          <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
          <div className="space-y-4">
            {sessionData.map((session, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {session.subject} - {session.topic}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.duration}
                      </p>
                    </div>
                    <div className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs">
                      {session.questions} questions
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges">
          <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <CardTitle>{badge.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{badge.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
