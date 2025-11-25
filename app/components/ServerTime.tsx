// app/components/ServerTime.tsx
import { useState, useEffect } from 'react';

/**
 * 一个React组件，用于从Nitro后端获取并显示服务器时间。
 */
function ServerTime() {
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 从 /api/time 获取服务器时间，并处理加载和错误状态。
   */
  const fetchServerTime = () => {
    setError(null); // 重置错误状态
    fetch('/api/time')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTime(data.serverTime);
      })
      .catch(err => {
        setError('Failed to fetch server time.');
        console.error(err);
      });
  };

  // 组件首次加载时获取时间
  useEffect(() => {
    fetchServerTime();
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '15px' }}>
      <h4>Server Time Component</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {time ? (
        <p>Current server time is: <strong>{new Date(time).toLocaleString()}</strong></p>
      ) : (
        <p>Loading server time...</p>
      )}
      <button onClick={fetchServerTime}>Refresh Time</button>
    </div>
  );
}

export default ServerTime;