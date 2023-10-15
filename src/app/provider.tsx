
"use client";
import { GetSessionParams, SessionProvider, getSession } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider
            refetchInterval={10}
        >{children}</SessionProvider>
    );
}

export async function getServerSideProps(ctx: GetSessionParams | undefined) {
    const session = await getSession(ctx)
    if (!session) {
      return {
        props: {}
      }
    }
    const { user } = session;
    return {
      props: { user },
    }
  }

export default Providers