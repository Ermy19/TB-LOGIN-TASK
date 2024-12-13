import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

function Index() {
  const { user, error, isLoading } = useUser();
  const [isAnimating, setIsAnimating] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsAnimating(true);
    try {
      window.location.href = '/api/auth/login';
    } catch (error) {
      console.error('Login failed:', error);
      setIsAnimating(false);
    }
  };

  const getApiToken = async () => {
    try {
      const response = await fetch('/api/auth/token', {
        credentials: 'same-origin'
      });
      if (!response.ok) {
        throw new Error('Failed to get token');
      }
      const { access_token } = await response.json();
      setToken(access_token);
      return access_token;
    } catch (error) {
      console.error('Failed to get API token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      getApiToken();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {!user ? (
          <>
          <head>
            <script src="/js/main.js" />
          </head>
          <div id="intro-wrapper">
            <div className="outer-black">
              <div className="outer-iron">
                <div className="glare"></div>
                <div className="inner-black">
                  <div className="inner-black-2">
                    <div className="inner-black-3">
                    <button 
                        className={`engine ${isAnimating ? 'active' : ''}`}
                        onClick={handleLogin}
                        disabled={isAnimating}
                      >
                        <div className="light"></div>
                        <span>Press<br /></span>
                        <span>To<br />Login<br /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
      ) : (
        <div>
          <p>Welcome {user.name}!</p>
          <a href="/api/auth/logout">Logout</a>
        </div>
      )}
    </div>
  );
} 

export default Index