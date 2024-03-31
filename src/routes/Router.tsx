import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage/HomePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { ManualPage } from "../pages/ManualPage/ManualPage";
import { RefinfoPage } from "../pages/RefinfoPage/RefinfoPage";
import { RecordPage } from "../pages/RecordPage/RecordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "", element: <HomePage />},
      {path: "/home", element: <HomePage />},
      {path: "/history", element: <HistoryPage />},
      {path: "/manual", element: <ManualPage />},
      {path: "/refinfo", element: <RefinfoPage />},
      {path: "/calculation/:calculationId", element: <RecordPage />}
    ]
  },
]);