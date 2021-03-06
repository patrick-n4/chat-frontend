import { useState } from "react";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
export default function PageNotFound() {
  const [userInfo, setUserInfo] = useState({});
  const getUserData = (data) => {
    setUserInfo(data);
  };
  document.title = "404 Page not Found";
  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-1">
      <Navbar userInfo={userInfo} />
      <div className="h-[95%] w-[100%] flex items-center justify-center">
        <div className="text-red-500 text-[2em]"> 404 Page not found!</div>
      </div>
    </div>
  );
}
