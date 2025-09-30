// Frontend-only notice component
import { Card } from "./ui/card";

// Component to inform about frontend-only architecture
export function BackendDemo() {
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frontend-Only Architecture</h2>
      
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Project Converted to Frontend-Only!</h4>
        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
          <li>✅ localStorage-based user authentication</li>
          <li>✅ Client-side data persistence</li>
          <li>✅ Mock course data and progress tracking</li>
          <li>✅ Simulated payment flow</li>
          <li>✅ Complete student portal experience</li>
          <li>✅ Responsive design with animations</li>
          <li>✅ No backend setup required!</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Features Working:</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>🎓 Course enrollment and management</li>
          <li>📊 Student dashboard with progress tracking</li>
          <li>💳 Payment simulation with success animations</li>
          <li>🔐 User authentication and profiles</li>
          <li>📱 Fully responsive mobile-first design</li>
          <li>🎨 Beautiful animations and transitions</li>
        </ul>
      </div>
    </Card>
  );
}