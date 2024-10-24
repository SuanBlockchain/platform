import React from "react";

// Components
import Admon from "./components/Admon/Admon";
import InvestorAdmon from "./components/Investor/InvestorAdmon";
import ConstructorAdmon from "./components/Constructor/ConstructorAdmon";
import Error from "./components/views/Error";
import LandingPage from "./components/views/landingPage/LandingPage.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ProjectDataProvider } from "./context/ProjectDataContext";
// Routing
// import { Auth } from 'aws-amplify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidatorAdmon from "./components/Validator/Validation/ValidatorAdmon.jsx";
import Footer from "./components/views/Footer/Footer";
import LogIn from "./components/views/Login/Login";
import RoleMiddleware from "./components/views/middlewareRoute/RoleMiddleware";
import SuccessOrder from "./components/views/successOrder/SuccessOrder";
import Product from "./components/views/Orders/Product";
import Products from "./components/views/Products";
import CreateWallet from "./components/views/createWallet/CreateWallet";
import TermCondition from "./components/views/terms&conditions/TermCondition";
import PrivacyPolicy from "./components/views/privacyPolicy/PrivacyPolicy";
import UseTerms from "./components/views/useTerms/UseTerms";
import ProjectPage from "./components/Constructor/ProjectPage/ProjectPage";
import ListS3 from "components/ListS3";
import NewProject from "components/Constructor/NewProject/NewProject";
import Dashboard from "components/Dashboard/Dashboard";
import BarGraphComponent from "components/Constructor/ProjectPage/ProjectAnalysis/BarGraphComponent";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/project/:id"
            element={
              <ProjectDataProvider>
                <ProjectPage />
              </ProjectDataProvider>
            }
            exact
          />
          <Route path="/admindash" element={<Dashboard />} exact />
          <Route
            path="/new_project"
            element={
              <RoleMiddleware
                allowedRoles={["constructor", "admon"]}
                redirectPath="/"
              >
                <NewProject />
              </RoleMiddleware>
            }
            exact
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={
              <RoleMiddleware
                allowedRoles={["constructor", "admon", "investor", "validator"]}
                redirectPath="/"
              >
                <Product />
              </RoleMiddleware>
            }
          />
          <Route path="/creating_wallet" element={<CreateWallet />} />
          <Route path="/terms_&_conditions" element={<TermCondition />} />
          <Route path="/use_terms" element={<UseTerms />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route
            path="/admon"
            element={
              <RoleMiddleware allowedRoles={["admon"]} redirectPath="/">
                <Admon />
              </RoleMiddleware>
            }
          />

          <Route
            path="/investor_admon"
            element={
              <RoleMiddleware allowedRoles={["investor"]} redirectPath="/">
                <InvestorAdmon />
              </RoleMiddleware>
            }
          />
           <Route
            path="/resultados"
            element={ <BarGraphComponent />}
          />
          <Route
            path="/constructor"
            element={
              <RoleMiddleware allowedRoles={["constructor"]} redirectPath="/">
                <ConstructorAdmon />
              </RoleMiddleware>
            }
          />
          <Route
            path="/validator_admon"
            element={
              <RoleMiddleware allowedRoles={["validator"]} redirectPath="/">
                <ValidatorAdmon />
              </RoleMiddleware>
            }
          />
          <Route
            path="/success_order"
            element={
              <RoleMiddleware allowedRoles={["investor"]} redirectPath="/">
                <SuccessOrder />
              </RoleMiddleware>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/lists3" element={<ListS3 />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
