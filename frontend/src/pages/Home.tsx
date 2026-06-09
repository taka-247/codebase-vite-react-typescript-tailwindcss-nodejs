import myAxios from "../api/myAxios";
import Button from "../components/ui/Button";
import PageTitle from "../components/ui/PageTitle";
import Shared from "@app/shared";
import { useToastStore } from "../store/useToastStore";

export default function Home() {
  const addToast = useToastStore((state) => state.addToast);

  async function handleAPITest() {
    try {
      const { data } = await myAxios.get(Shared.api.test.url);
      addToast(data.message, 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
      addToast(errorMessage, 'error')
    }
  }

  return (
    <>
      <PageTitle>Home</PageTitle>
      <div className="mb-2">
      </div>
      <Button onClick={() => handleAPITest()}>Test API</Button>
    </>
  );
}