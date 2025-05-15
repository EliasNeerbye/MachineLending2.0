import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/common/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;