import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";

const OrganizationJoinPage: NextPage = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const joinOrg = api.organization.joinOrganization.useMutation();

    const handleJoin = async () => {
      const orgId = (document.getElementById("organizationId") as HTMLInputElement).value
      console.log(orgId)
      if (!userId) {
        return;
      }
      await joinOrg.mutateAsync({ userId: userId, organizationId: orgId });
    }

    if (!isLoaded || !userId) {
        return (
            <p></p>
        );
    } else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="flex items-center justify-center bg-gray-200">
              <form className="w-full max-w-sm bg-gray rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="organization"
                  >
                    Organization Join Code
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="organizationId"
                    type="text"
                    placeholder="Paste Code"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    // eslint-disable-next-line
                    onClick={handleJoin}
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
            </main>
          );
    }
};

export default OrganizationJoinPage;
