import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Main from "@/pages/Main";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

export default function RouterProviderWrapper() {
  return <RouterProvider router={router} />;
}
