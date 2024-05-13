import React from "react";
import { Route, Routes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import HelperNav from "./components/HelperNav";

// Lazy loaded pages
import Home from "./pages/Home";
import MultiCarrier from "./pages/MultiCarrier";
import ConventionCenter from "./pages/ConventionCenter";
import CashierlessCheckout from "./pages/CashierlessCheckout";
import AcceleratedAccess from "./pages/AcceleratedAccess";

// Fallback component

function App() {
  const routes = [
    {
      path: "/",
      component: Home,
    },
    // {
    //   path: "convention",
    //   component: ConventionCenter,
    // },
    // {
    //   path: "multi-carrier",
    //   component: MultiCarrier,
    // },
    // {
    //   path: "cashierless-checkout",
    //   component: CashierlessCheckout,
    // },
    // {
    //   path: 'accelerated-access',
    //   component: AcceleratedAccess,
    // }
  ];

  return (
    <>
     <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>

      <HelperNav />
    </>
  );
}

export default App;
