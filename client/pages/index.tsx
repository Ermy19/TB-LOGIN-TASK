import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

function Index() {
  const { user, error, isLoading } = useUser();
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    setIsAnimating(true);
    try {
      window.location.href = '/api/auth/login';
    } catch (error) {
      console.error('Login failed:', error);
      setIsAnimating(false);
    }
  };

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
        <div>Loading dashboard...</div>
      )}
    </div>
  );
}

export default Index;