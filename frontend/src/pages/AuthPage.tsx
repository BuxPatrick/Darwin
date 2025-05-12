
import AuthForm from "@/components/Auth/AuthForm";
import Layout from "@/components/Layout/Layout";

export default function AuthPage() {
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto px-4 h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <AuthForm />
      </div>
    </Layout>
  );
}
