import { useState } from "react";
import myAxios from "../api/myAxios";
import Button from "../components/Button";

export default function First() {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleAPITest() {
    if (message || errorMessage) {
      setMessage('')
      setErrorMessage('')
      return
    }

    try {
      const { data } = await myAxios.get('/test');
      setMessage(data.message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
      setErrorMessage(`Error: ${errorMessage}`)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="mb-2">
          <p className="text-white mb-2">{message || errorMessage ? 'You got a message!' : 'Click a button below.'}</p>
          {
            (message || errorMessage) && (
              <div className="p-4 bg-white rounded-sm">
                <div className={errorMessage ? 'text-red-500' : ''}>{message || errorMessage}</div>
              </div>
            )
          }
        </div>
        <Button onClick={() => handleAPITest()}>{message || errorMessage ? 'Reset' : 'API Test'}</Button>
      </div>
    </div>
  );
}