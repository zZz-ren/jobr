import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./pages/Homepage";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);

  return (
    <>
      <img src="/1.png" alt="jpg image" />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
