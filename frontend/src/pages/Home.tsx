import { useState } from "react";
import myAxios from "../api/myAxios";
import Button from "../components/ui/Button";
import PageTitle from "../components/ui/PageTitle";
import Shared from "@app/shared";

export default function Home() {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleAPITest() {
    if (message || errorMessage) {
      setMessage('')
      setErrorMessage('')
      return
    }

    try {
      const { data } = await myAxios.get(Shared.api.test.url);
      setMessage(data.message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
      setErrorMessage(`Error: ${errorMessage}`)
    }
  }

  return (
    <>
      <PageTitle>Home</PageTitle>
      <div className="mb-2">
        <p className="text-text mb-2">{message || errorMessage ? 'You got a message!' : 'Click a button below.'}</p>
        {
          (message || errorMessage) && (
            <div className="p-4 bg-white text-primary rounded-sm">
              <div className={errorMessage ? 'text-red-500' : ''}>{message || errorMessage}</div>
            </div>
          )
        }
      </div>
      <Button onClick={() => handleAPITest()}>{message || errorMessage ? 'Reset' : 'API Test'}</Button>
    </>
  );
}