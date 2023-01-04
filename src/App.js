import BookingHeader from "./BookingHeader/BookingHeader";
import BookingMain from "./BookingMain/BookingMain";

import "./App.css";

function App() {
  return (
    <>
      <div className="appContainer">
        <div className="appContainerContentsWidthProvider">
          <BookingHeader />
          <BookingMain />
        </div>
      </div>
    </>
  );
}

export default App;
