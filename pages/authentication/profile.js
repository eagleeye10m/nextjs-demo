import { Fragment } from "react";
import UserProfile from "../../components/authentication/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return (
    <Fragment>
      <style jsx global>{`
        body {
          background-color: white;
        }
      `}</style>
      <UserProfile />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); //if the user is not authenticated this will be null

  if (!session) {
    return {
      redirect: {
        destination: "/authentication/login",
        permenant: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
