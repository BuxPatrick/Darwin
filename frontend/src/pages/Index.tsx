
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center py-20">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Meet Darwin
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Your AI learning assistant that adapts to your learning style and helps you master any subject through personalized conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Button size="lg" asChild>
                <Link to="/chat">Start Learning</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Learn Your Way
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-explain-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-explain"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explain Mode</h3>
              <p className="text-muted-foreground">
                Clear, concise explanations tailored to your understanding
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-quiz-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-quiz"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quiz Mode</h3>
              <p className="text-muted-foreground">
                Test your knowledge and reinforce your learning
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-eli5-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-eli5"
                >
                  <rect width="8" height="14" x="8" y="6" rx="4" />
                  <path d="m19 8-5 4 5 4" />
                  <circle cx="4" cy="8" r="2" />
                  <circle cx="4" cy="16" r="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">ELI5 Mode</h3>
              <p className="text-muted-foreground">
                Complex topics explained in simple, everyday language
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-challenge-light flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-challenge"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Challenge Mode</h3>
              <p className="text-muted-foreground">
                Deep-dive into advanced concepts for expert-level understanding
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Darwin Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask Anything</h3>
              <p className="text-muted-foreground">
                Type or speak your question about any subject or topic
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Darwin Adapts</h3>
              <p className="text-muted-foreground">
                AI identifies the subject and tailors responses to your learning style
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Review your learning journey and identify areas for improvement
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform how you learn?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who are learning faster and more effectively with Darwin.
            </p>
            {user ? (
              <Button size="lg" asChild>
                <Link to="/chat">Start Learning Now</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link to="/auth">Create Free Account</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
