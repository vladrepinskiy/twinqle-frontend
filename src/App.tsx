import { Toaster } from "sonner";
import { OrdersProvider } from "./providers/orders.provider";
import { Dashboard } from "./components/Dashboard";

export const App = () => {
  return (
    <>
      <Toaster />
      <OrdersProvider>
        <Dashboard />
      </OrdersProvider>
    </>
  );
};
