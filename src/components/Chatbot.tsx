import { useState, useEffect } from 'react';
import { trackChatInteraction } from '../utils/analytics';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gradioLoaded, setGradioLoaded] = useState(false);

  // Load Gradio script dynamically when needed
  useEffect(() => {
    if (isOpen && !gradioLoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://gradio.s3-us-west-2.amazonaws.com/5.33.1/gradio.js';
      script.onload = () => setGradioLoaded(true);
      document.head.appendChild(script);
    }
  }, [isOpen, gradioLoaded]);

  const handleToggleChat = () => {
    const action = !isOpen ? 'open' : 'close';
    setIsOpen(!isOpen);
    trackChatInteraction(action);
  };

  return (
    <>
      {/* Floating Chat Button - only show when modal is closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75" style={{
            animation: 'slowPing 4s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}></div>
          
          <button
            onClick={handleToggleChat}
            className="relative bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
            style={{
              animation: 'bounce 2s infinite, jiggle 3s infinite 1s'
            }}
            aria-label="Open chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleToggleChat}
          />
          
          {/* Chat Container */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">
                💬 Chat with Brett
              </h3>
              <button
                onClick={handleToggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Gradio App Container */}
            <div className="flex-1 overflow-hidden">
              {gradioLoaded ? (
                <iframe
                  src="https://dontfretbrett-career-conversation.hf.space"
                  className="w-full h-full border-0"
                  onLoad={() => trackChatInteraction('message')}
                  title="Chat with Brett"
                />
              ) : (
                <div 
                  className="flex items-center justify-center h-full"
                  role="status"
                  aria-live="polite"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading chat...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slowPing {
          0% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.75; }
        }
        
        @keyframes jiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>
    </>
  );
};

export default Chatbot; 