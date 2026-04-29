import { MainContent } from "./components/MainContent";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <MainContent />
    </div>
  );
}
