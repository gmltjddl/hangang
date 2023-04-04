import React, { useState, useEffect } from 'react';

const Main = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFestivalDropdownOpen, setIsFestivalDropdownOpen] = useState(false);
  const [isHotplaceDropdownOpen, setIsHotplaceDropdownOpen] = useState(false);

  const handleLogout = () => {
    fetch("auth/logout")
      .then((response) => {
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((exception) => {
        console.log(exception);
      });
  };

  useEffect(() => {
    fetch("auth/user")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          setUsername(result.data.name);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((exception) => {
        alert("로그인 사용자 정보 조회 오류!");
      });
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div>
          <span id="username">{username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!isLoggedIn && <div>Please login</div>}
      <div>
        <button id="festival-dropdown" onClick={() => setIsFestivalDropdownOpen(!isFestivalDropdownOpen)}>Festival</button>
        {isFestivalDropdownOpen && (
          <div id="festival-menu" className="show">
            {/* festival menu items */}
          </div>
        )}
      </div>
      <div>
        <button id="hotplace-dropdown" onClick={() => setIsHotplaceDropdownOpen(!isHotplaceDropdownOpen)}>Hotplace</button>
        {isHotplaceDropdownOpen && (
          <div id="hotplace-menu" className="show">
            {/* hotplace menu items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
