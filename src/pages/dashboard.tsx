import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button onClick={() => signOut()} className="text-red-600 underline text-sm">
        Log out
      </button>
    </div>
  );
}

// 👇 Add this BELOW your component (do not put inside the function!)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
