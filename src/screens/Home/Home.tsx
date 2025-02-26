import { ComplaintsList } from "../../components/organisms/ComplaintsList";
import { Form } from "../../components/organisms/Form";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto mt-8 pb-12">
        {isAuthenticated ? <ComplaintsList /> : <Form />}
      </main>
    </div>
  );
};
