import LicenceView from "./components/LicenceView.tsx";
import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="title">Visual Events Planner</h1>
        <div className="profile-circle">Profile</div>
      </header>
      <LicenceView />
    </>
  );
}

export default App;
