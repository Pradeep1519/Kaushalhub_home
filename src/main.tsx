import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import "./styles/index.css";
import "./styles/index.css";

// ✅ ADD RESPONSIVE VIEWPORT HANDLER
const setupViewportHandler = () => {
  // Prevent zoom on mobile devices
  const preventZoom = (e: Event) => {
    e.preventDefault();
  };
  
  // Double-tap zoom prevention for mobile
  document.addEventListener('dblclick', preventZoom);
  
  // Handle orientation changes
  const handleOrientationChange = () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      if (window.orientation === 90 || window.orientation === 90) {
        // Landscape mode
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.7, maximum-scale=1.0');
      } else {
        // Portrait mode  
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=5.0, user-scalable=yes');
      }
    }
  };
  
  window.addEventListener('orientationchange', handleOrientationChange);
};

// ✅ ERROR BOUNDARY FOR BETTER UX
const ErrorFallback = ({ error }: { error: Error }) => (
  <div style={{ 
    padding: '2rem', 
    textAlign: 'center',
    fontFamily: 'system-ui, sans-serif'
  }}>
    <h2>Something went wrong</h2>
    <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
      {error.message}
    </details>
    <button 
      onClick={() => window.location.reload()}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        background: '#007acc',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Reload Page
    </button>
  </div>
);

// ✅ MAIN APP RENDER WITH ERROR HANDLING
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Setup responsive handlers
  setupViewportHandler();
  
  const root = createRoot(rootElement);
  
  root.render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
  
} catch (error) {
  console.error("Failed to render app:", error);
  
  // Show error UI if render fails
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
        <h2>Application Error</h2>
        <p>Please refresh the page or try again later.</p>
        <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}