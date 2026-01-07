import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Test pages for E2E testing
import TestBasicNavigation from "./pages/test/TestBasicNavigation";
import TestArrayData from "./pages/test/TestArrayData";
import TestPersistence from "./pages/test/TestPersistence";
import TestValidation from "./pages/test/TestValidation";
import TestStepGuards from "./pages/test/TestStepGuards";
import TestDependency from "./pages/test/TestDependency";
import TestError from "./pages/test/TestError";
import TestAdvancedValidation from "./pages/test/TestAdvancedValidation";
import TestNavigationControl from "./pages/test/TestNavigationControl";
import MiddlewareDemo from "./pages/test/MiddlewareDemo";
import TestConditional from "./pages/test/TestConditional";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div className="p-8 text-center text-gray-500">Wizzard E2E Test Suite</div>} />
        
        {/* Test Routes for E2E Testing */}
        <Route path="test/basic-navigation" element={<TestBasicNavigation />} />
        <Route path="test/array-data-demo" element={<TestArrayData />} />
        <Route path="test/persistence-demo" element={<TestPersistence />} />
        <Route path="test/validation-demo" element={<TestValidation />} />
        <Route path="test/guards-demo" element={<TestStepGuards />} />
        <Route path="test/dependency-demo" element={<TestDependency />} />
        <Route path="test/error-demo" element={<TestError />} />
        <Route path="test/advanced-validation-demo" element={<TestAdvancedValidation />} />
        <Route path="test/navigation-control" element={<TestNavigationControl />} />
        <Route path="test/middleware-demo" element={<MiddlewareDemo />} />
        <Route path="test/conditional-demo" element={<TestConditional />} />
      </Routes>
    </>
  );
}

export default App;
