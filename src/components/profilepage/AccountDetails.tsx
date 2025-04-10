// components/AccountDetails/AccountDetails.tsx
import { useUser } from "@clerk/clerk-react";

const AccountDetails = () => {
  const { user } = useUser();

  return (
    <div>
      <h2 className="text-md md:text-xl md:text-left text-center font-semibold pb-2 md:pb-4">Account Details</h2>
      <div className="flex flex-col items-center md:items-start gap-6">
        <div className="flex items-center justify-start">
          <div className="w-15 h-15 md:w-10 md:h-10 rounded-full bg-[#F0F1FF] text-[#4078FF] flex items-center justify-center text-lg md:text-md font-normal">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-80">
          <label className="text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={`${user?.firstName} ${user?.lastName}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col gap-2 w-80">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={user?.emailAddresses[0]?.emailAddress || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
