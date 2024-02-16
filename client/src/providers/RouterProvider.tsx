import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";

const router = createRouter({ routeTree });

export default function RouterProviderWrapper() {
  return <RouterProvider router={router} />;
}
