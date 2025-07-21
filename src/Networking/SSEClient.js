export function initSSE(onMessage, channel) {
    console.log("i have started")
    if(!channel) return null;
    const eventSource = new EventSource(`/backend/events/notification/${channel}`, {withCredentials: true});
    console.log("i have started listening")

    eventSource.onopen = () => {
      console.log("Connected to channel: ", channel)
    }

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('SSE message received:', data.message);

        onMessage(data.message);
    };
  
    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      eventSource.close();
    };
  
    return () => {
      eventSource.close();
    };
  }
  