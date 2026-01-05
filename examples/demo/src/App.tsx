import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DocsLayout from "./DocsLayout";
import { VersionProvider } from "./context/VersionContext";
import Home from "./pages/Home";
import Examples from "./pages/Examples";
import SimpleWizard from "./pages/SimpleWizard";
import LegacyWizard from "./pages/LegacyWizard";
import RHFZodWizard from "./pages/RHFZodWizard";
import FormikYupWizard from "./pages/FormikYupWizard";
import ConditionalWizard from "./pages/ConditionalWizard";
import ComplexDataWizard from "./pages/ComplexDataWizard";
import AdvancedDemo from "./pages/AdvancedDemo";
import EnterpriseWizardDemo from "./pages/EnterpriseWizardDemo";
import MiddlewareDemo from "./pages/MiddlewareDemo";
import OptimizationDemo from "./pages/OptimizationDemo";

import Introduction from "./pages/docs/Introduction";
import Installation from "./pages/docs/Installation";
import QuickStart from "./pages/docs/QuickStart";
import MigrationGuide from "./pages/docs/MigrationGuide";
import CoreConcepts from "./pages/docs/CoreConcepts";
import HooksApi from "./pages/docs/HooksApi";
import TypeReference from "./pages/docs/TypeReference";
import Validation from "./pages/docs/Validation";
import Persistence from "./pages/docs/Persistence";
import ConditionalLogic from "./pages/docs/ConditionalLogic";
import RoutingDocs from "./pages/docs/RoutingDocs";
import StepRendering from "./pages/docs/StepRendering";
import DeferredRendering from "./pages/docs/DeferredRendering";
import EnterpriseFeatures from "./pages/docs/EnterpriseFeatures";
import PerformanceDocs from "./pages/docs/Performance";
import MiddlewareDevTools from "./pages/docs/MiddlewareDevTools";

import ScrollToTop from "./components/ScrollToTop";
import RHFDocs from "./pages/docs/RHF";
import FormikDocs from "./pages/docs/Formik";
import SecurityDocs from "./pages/docs/Security";
import MantineDocs from "./pages/docs/MantineForm";
import TanStackDocs from "./pages/docs/TanStackForm";
import ValibotDocs from "./pages/docs/Valibot";

import { LanguageProvider } from "./context/LanguageContext";

// Test pages for E2E testing
import TestBasicNavigation from "./pages/test/TestBasicNavigation";
import TestArrayData from "./pages/test/TestArrayData";
import TestPersistence from "./pages/test/TestPersistence";
import TestValidation from "./pages/test/TestValidation";
import TestStepGuards from "./pages/test/TestStepGuards";
import TestDependency from "./pages/test/TestDependency";
import TestError from "./pages/test/TestError";
import TestNavigationControl from "./pages/test/TestNavigationControl";

function App() {
  return (
    <LanguageProvider>
      <VersionProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="examples" element={<Examples />} />

            {/* Flat paths for examples (backward compatibility/legacy support) */}
            <Route path="simple" element={<SimpleWizard />} />
            <Route path="legacy" element={<LegacyWizard />} />
            <Route path="rhf-zod" element={<RHFZodWizard />} />
            <Route path="formik-yup" element={<FormikYupWizard />} />
            <Route path="conditional" element={<ConditionalWizard />} />
            <Route path="complex" element={<ComplexDataWizard />} />
            <Route path="advanced" element={<AdvancedDemo />} />
            <Route
              path="enterprise-wizard"
              element={<EnterpriseWizardDemo />}
            />
            <Route path="test/middleware-demo" element={<MiddlewareDemo />} />
            <Route path="optimization" element={<OptimizationDemo />} />

            {/* Test Routes for E2E Testing */}
            <Route
              path="test/conditional-demo"
              element={<ConditionalWizard />}
            />
            <Route
              path="test/basic-navigation"
              element={<TestBasicNavigation />}
            />
            <Route path="test/array-data-demo" element={<TestArrayData />} />
            <Route path="test/persistence-demo" element={<TestPersistence />} />
            <Route path="test/validation-demo" element={<TestValidation />} />
            <Route path="test/guards-demo" element={<TestStepGuards />} />
            <Route path="test/dependency-demo" element={<TestDependency />} />
            <Route path="test/error-demo" element={<TestError />} />
            <Route path="test/navigation-control" element={<TestNavigationControl />} />

            {/* Documentation Section */}
            <Route path="docs" element={<DocsLayout />}>
              <Route index element={<Introduction />} />
              <Route path="introduction" element={<Introduction />} />
              <Route path="installation" element={<Installation />} />
              <Route path="migration" element={<MigrationGuide />} />
              <Route path="quickstart" element={<QuickStart />} />

              <Route path="concepts" element={<CoreConcepts />} />
              <Route path="hooks" element={<HooksApi />} />
              <Route path="types" element={<TypeReference />} />

              <Route path="persistence" element={<Persistence />} />
              <Route path="validation" element={<Validation />} />
              <Route path="conditional-logic" element={<ConditionalLogic />} />
              <Route path="routing" element={<RoutingDocs />} />
              <Route path="rendering" element={<StepRendering />} />
              <Route
                path="deferred-rendering"
                element={<DeferredRendering />}
              />
              <Route path="enterprise" element={<EnterpriseFeatures />} />
              <Route path="performance" element={<PerformanceDocs />} />
              <Route path="middleware" element={<MiddlewareDevTools />} />

              <Route path="rhf" element={<RHFDocs />} />
              <Route path="formik" element={<FormikDocs />} />
              <Route path="security" element={<SecurityDocs />} />
              <Route path="mantine" element={<MantineDocs />} />
              <Route path="tanstack" element={<TanStackDocs />} />
              <Route path="valibot" element={<ValibotDocs />} />

              <Route path="factory" element={<CoreConcepts />} />
              <Route path="steps" element={<CoreConcepts />} />

              {/* Placeholders for other docs */}
              <Route path="*" element={<Introduction />} />
            </Route>
          </Route>
        </Routes>
      </VersionProvider>
    </LanguageProvider>
  );
}

export default App;
