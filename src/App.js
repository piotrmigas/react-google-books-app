import { Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Route exact path="/" component={Home} location={background || location} />
      {background && <Route path="/book/:id" component={Book} />}
    </>
  );
}

export default App;
