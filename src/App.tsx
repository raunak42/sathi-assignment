import { MainContent } from "./components/MainContent";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:h-screen lg:w-screen lg:flex-row">
      <Sidebar />
      <MainContent />
    </div>
  );
}
