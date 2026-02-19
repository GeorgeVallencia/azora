import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProfilePage() {

  const { user } = useContext(UserContext);

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name}!</h2>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Accountability Stats</h3>
                <p className="text-2xl font-bold text-blue-600">0 Days</p>
                <p className="text-gray-600">Current Streak</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Goals Completed</h3>
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-gray-600">Total Achievements</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading profile information...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;