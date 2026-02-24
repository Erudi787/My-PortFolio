'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#F8F9FA',
        color: '#070B0C',
        margin: 0,
        padding: 0,
      }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
            }}>
              Critical Error
            </h1>

            <p style={{
              color: '#575454',
              marginBottom: '1.5rem',
            }}>
              A critical error has occurred. Please refresh the page or try again later.
            </p>

            <button
              onClick={reset}
              style={{
                backgroundColor: '#043CAA',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
