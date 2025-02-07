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
import NewCampaign from "components/Constructor/Campaign/NewCampaign";
import Campaign from "components/Constructor/Campaign/Campaign";
import CampaignList from "components/Constructor/Campaign/CampaignList";
import PQRForm from "components/views/landingPage/PQRForm";
import Property from "components/Property/Property";
import { PropertyDataProvider } from "context/PropertyDataContext";
import AnalitycsAdmon from "components/Admon/Analitic/AnalitycsAdmon";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/project/:id"
            element={
              <RoleMiddleware
                allowedRoles={["constructor", "admon", "investor", "validator", "analyst"]}
                redirectPath="/"
              >
              <ProjectDataProvider>
                <ProjectPage />
              </ProjectDataProvider>
              </RoleMiddleware>
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
          <Route path="/PQRS" element={<PQRForm />} />
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
            path="/constructor"
            element={
              <RoleMiddleware allowedRoles={["constructor"]} redirectPath="/">
                <ConstructorAdmon />
              </RoleMiddleware>
            }
          />
            <Route
            path="/project_analyst"
            element={
              <RoleMiddleware allowedRoles={["analyst"]} redirectPath="/">
                <AnalitycsAdmon />
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
          <Route path="/new_campaign" element={<NewCampaign />} />
          <Route
            path="/property/:id"
            element={
              <RoleMiddleware
                allowedRoles={["constructor", "admon", "investor", "validator"]}
                redirectPath="/"
              >
                <PropertyDataProvider>
                  <Property/>
                </PropertyDataProvider>
              </RoleMiddleware>
            }
            exact
          />
          <Route path="/campaigns" element={<CampaignList/>} />
          <Route
            path="/campaign/:id"
            element={
                <Campaign />
            }
            exact
          />
          {/* <Route path="/lists3" element={<ListS3 />} /> */}
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
