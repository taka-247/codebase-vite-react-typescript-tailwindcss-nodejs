import APITest from "../components/ui/APITest";
import PageTitle from "../components/ui/PageTitle";
import { useProfile } from "../hooks/useProfile";

export default function Dashboard() {
  const { data: profile } = useProfile();

  console.log(profile);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="mb-2">
      </div>
      <APITest />
    </>
  );
}