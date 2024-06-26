import React from "react";

function PremiumUserPage({ isPremium }) {
  return (
    <div>
      <h1>Welcome to Premium User Page!</h1>
      {isPremium ? (
        <div>
          <h2>Exclusive Premium Content</h2>
          <p>Here you can access premium features and content.</p>
        </div>
      ) : (
        <div>
          <h2>Upgrade to Premium</h2>
          <p>You are currently not a premium user.</p>
          <p>To access premium features, upgrade your account.</p>
        </div>
      )}
    </div>
  );
}

export default PremiumUserPage;
