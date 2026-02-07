import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProfilePage() {

  const {user} = useContext(UserContext);

  return(
    <div>
      <div>
        hi {user ? user.name : 'Loading...'}
      </div>
    </div>
  );
}

export default ProfilePage;