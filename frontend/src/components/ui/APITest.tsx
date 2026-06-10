import { useToastStore } from "../../store/useToastStore";
import myAxios from "../../api/myAxios";
import Button from "../../components/ui/Button";
import Shared from "@app/shared";

type Props = React.ComponentProps<'div'>;

export default function APITest({ ...props }: Props) {
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
    <div {...props}>
      <Button onClick={() => handleAPITest()}>{Shared.pages.home.buttonText}</Button>
    </div>
  );
}