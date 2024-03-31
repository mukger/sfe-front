import { Outlet } from "react-router";
import { Menu } from "./components/Menu/Menu";
import './App.css';

function App() {
  return (
    <>
      <div>
        <div className="paper">
          <div className="lines">
            <div className="text" spellCheck="false">
              <Outlet />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    </>
  );
}

export default App;
