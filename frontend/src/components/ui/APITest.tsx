import { useToastStore } from "../../store/useToastStore";
import myAxios from "../../api/myAxios";
import Button from "../../components/ui/Button";
import { Shared } from "@app/shared";
import { useState } from "react";

type Props = React.ComponentProps<'div'>;

export default function APITest({ ...props }: Props) {
  const [message, setMessage] = useState('')
  const addToast = useToastStore((state) => state.addToast);

  async function handleAPITest() {
    try {
      const { data } = await myAxios.get(Shared.api.test.url);
      addToast(data.message, 'success')
      setMessage(Shared.api.test.successMessage)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
      addToast(errorMessage, 'error')
      setMessage(Shared.api.test.failMessage)
    }
  }

  return (
    <div {...props}>
      {
        message && (
          <p className="mb-2">{message}</p>
        )
      }
      <Button onClick={() => handleAPITest()}>{Shared.pages.dashboard.buttonText}</Button>
    </div>
  );
}