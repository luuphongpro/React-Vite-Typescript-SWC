import { Outlet } from "react-router-dom";
import Header from "./component/header/Header";


function App() {
  return (
    <div className="">
      <Header />
      <Outlet /> {/* Hiển thị route con ở đây */}
    </div>
  )
}


export default App;
