import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import FAQs from "./pages/FAQs";
import ContactSales from "./pages/ContactSales";
import Contact from "./pages/Contact";
import JoinAsPro from "./pages/JoinAsPro";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RemoteSupportPage from "./pages/RemoteSupport";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import ModernWebsite2026 from "./pages/blog/ModernWebsite2026";
import ComputerNeedsSupport from "./pages/blog/ComputerNeedsSupport";
import TVMountingDoneRight from "./pages/blog/TVMountingDoneRight";
import TVMountingMistakes from "./pages/blog/TVMountingMistakes";
import SuccessPage from "./pages/SuccessPage";

// Admin Pages (lazy loaded to avoid React instance conflicts)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// Category Pages
import TVMountingCategory from "./pages/category/TVMountingCategory";
import SmartHomeCategory from "./pages/category/SmartHomeCategory";
import AudioVideoCategory from "./pages/category/AudioVideoCategory";
import WifiNetworkCategory from "./pages/category/WifiNetworkCategory";
import HomeSecurityCategory from "./pages/category/HomeSecurityCategory";
import ComputersPrintersCategory from "./pages/category/ComputersPrintersCategory";
import BusinessCategory from "./pages/category/BusinessCategory";
import HomeServicesCategory from "./pages/category/HomeServicesCategory";

// Service Pages
import TVMountingSmall from "./pages/service/TVMountingSmall";
import TVMountingMedium from "./pages/service/TVMountingMedium";
import TVMountingLarge from "./pages/service/TVMountingLarge";
import TVCableConcealment from "./pages/service/TVCableConcealment";
import SoundbarInstallation from "./pages/service/SoundbarInstallation";
import TVDismountRemount from "./pages/service/TVDismountRemount";
import SmartThermostats from "./pages/service/SmartThermostats";
import VideoDoorbells from "./pages/service/VideoDoorbells";
import SmartLocks from "./pages/service/SmartLocks";
import SmartHomeIntegration from "./pages/service/SmartHomeIntegration";
import HomeTheater from "./pages/service/HomeTheater";
import SurroundSound from "./pages/service/SurroundSound";
import StreamingSetup from "./pages/service/StreamingSetup";
import GamingSetup from "./pages/service/GamingSetup";
import RouterSetup from "./pages/service/RouterSetup";
import NetworkOptimization from "./pages/service/NetworkOptimization";
import DeadZoneElimination from "./pages/service/DeadZoneElimination";
import BusinessNetworks from "./pages/service/BusinessNetworks";
import SecurityCameras from "./pages/service/SecurityCameras";
import MotionSensors from "./pages/service/MotionSensors";
import ComputerRepair from "./pages/service/ComputerRepair";
import VirusRemoval from "./pages/service/VirusRemoval";
import PrinterSetup from "./pages/service/PrinterSetup";
import DataBackup from "./pages/service/DataBackup";
import WebsiteDesign from "./pages/service/WebsiteDesign";
import RemoteSupport from "./pages/service/RemoteSupport";
import ITSolutions from "./pages/service/ITSolutions";
import CustomSolutions from "./pages/service/CustomSolutions";
// New Home Service Pages
import HandymanServices from "./pages/service/HandymanServices";
import Painting from "./pages/service/Painting";
import FlooringInstallation from "./pages/service/FlooringInstallation";
import DrywallInstallation from "./pages/service/DrywallInstallation";
import CabinetInstallation from "./pages/service/CabinetInstallation";
import TileWork from "./pages/service/TileWork";
import WindowDoorReplacement from "./pages/service/WindowDoorReplacement";
import DeckPatioBuilding from "./pages/service/DeckPatioBuilding";
import FenceInstallation from "./pages/service/FenceInstallation";
import BathroomRemodeling from "./pages/service/BathroomRemodeling";
import KitchenRemodeling from "./pages/service/KitchenRemodeling";
import Plumbing from "./pages/service/Plumbing";
import Electrical from "./pages/service/Electrical";
import HVAC from "./pages/service/HVAC";
import Roofing from "./pages/service/Roofing";
import ApplianceRepair from "./pages/service/ApplianceRepair";
import WaterHeaterInstallation from "./pages/service/WaterHeaterInstallation";
import GutterInstallation from "./pages/service/GutterInstallation";
import SidingInstallation from "./pages/service/SidingInstallation";
import GarageDoorInstallation from "./pages/service/GarageDoorInstallation";
import SolarPanelInstallation from "./pages/service/SolarPanelInstallation";
import HouseCleaning from "./pages/service/HouseCleaning";
import CarpetCleaning from "./pages/service/CarpetCleaning";
import JunkRemoval from "./pages/service/JunkRemoval";
import PressureWashing from "./pages/service/PressureWashing";
import GutterCleaning from "./pages/service/GutterCleaning";
import PestControl from "./pages/service/PestControl";
import OrganizationServices from "./pages/service/OrganizationServices";
import Landscaping from "./pages/service/Landscaping";
import SnowRemoval from "./pages/service/SnowRemoval";
import FurnitureAssembly from "./pages/service/FurnitureAssembly";
import ACTuneUp from "./pages/service/ACTuneUp";
import LeakDetection from "./pages/service/LeakDetection";
import LightFixtureReplacement from "./pages/service/LightFixtureReplacement";
import SmokeDetectorInstallation from "./pages/service/SmokeDetectorInstallation";
import SmartIrrigationInstallation from "./pages/service/SmartIrrigationInstallation";
import HolidayLightingInstallation from "./pages/service/HolidayLightingInstallation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/join-as-pro" element={<JoinAsPro />} />
          <Route path="/services/contact-sales" element={<ContactSales />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/remote-support" element={<RemoteSupportPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/7-reasons-why-your-local-business-needs-modern-website-2026" element={<ModernWebsite2026 />} />
          <Route path="/blog/signs-your-computer-needs-professional-support" element={<ComputerNeedsSupport />} />
          <Route path="/blog/tv-mounting-done-right-why-professional-installation-matters" element={<TVMountingDoneRight />} />
          <Route path="/blog/top-5-mistakes-to-avoid-when-mounting-your-tv" element={<TVMountingMistakes />} />
          
          {/* Success Page */}
          <Route path="/success" element={<SuccessPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><AdminLogin /></Suspense>} />
          <Route path="/admin/dashboard" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><AdminDashboard /></Suspense>} />
          
          {/* Category Pages - Keep for backward compatibility but redirect will be handled */}
          <Route path="/services/home-services" element={<HomeServicesCategory />} />
          <Route path="/services/tv-mounting" element={<TVMountingCategory />} />
          <Route path="/services/smart-home" element={<SmartHomeCategory />} />
          <Route path="/services/audio-video" element={<AudioVideoCategory />} />
          <Route path="/services/wifi-network" element={<WifiNetworkCategory />} />
          <Route path="/services/home-security" element={<HomeSecurityCategory />} />
          <Route path="/services/computers-printers" element={<ComputersPrintersCategory />} />
          <Route path="/services/business" element={<BusinessCategory />} />
          
          {/* Home Services - Root Level */}
          <Route path="/handyman-services" element={<HandymanServices />} />
          <Route path="/painting" element={<Painting />} />
          <Route path="/flooring-installation" element={<FlooringInstallation />} />
          <Route path="/drywall-installation" element={<DrywallInstallation />} />
          <Route path="/cabinet-installation" element={<CabinetInstallation />} />
          <Route path="/tile-work" element={<TileWork />} />
          <Route path="/window-door-replacement" element={<WindowDoorReplacement />} />
          <Route path="/deck-patio-building" element={<DeckPatioBuilding />} />
          <Route path="/fence-installation" element={<FenceInstallation />} />
          <Route path="/bathroom-remodeling" element={<BathroomRemodeling />} />
          <Route path="/kitchen-remodeling" element={<KitchenRemodeling />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/hvac" element={<HVAC />} />
          <Route path="/roofing" element={<Roofing />} />
          <Route path="/appliance-repair" element={<ApplianceRepair />} />
          <Route path="/water-heater-installation" element={<WaterHeaterInstallation />} />
          <Route path="/gutter-installation" element={<GutterInstallation />} />
          <Route path="/siding-installation" element={<SidingInstallation />} />
          <Route path="/garage-door-installation" element={<GarageDoorInstallation />} />
          <Route path="/solar-panel-installation" element={<SolarPanelInstallation />} />
          <Route path="/house-cleaning" element={<HouseCleaning />} />
          <Route path="/carpet-cleaning" element={<CarpetCleaning />} />
          <Route path="/junk-removal" element={<JunkRemoval />} />
          <Route path="/pressure-washing" element={<PressureWashing />} />
          <Route path="/gutter-cleaning" element={<GutterCleaning />} />
          <Route path="/pest-control" element={<PestControl />} />
          <Route path="/organization-services" element={<OrganizationServices />} />
          <Route path="/landscaping" element={<Landscaping />} />
          <Route path="/snow-removal" element={<SnowRemoval />} />
          <Route path="/furniture-assembly" element={<FurnitureAssembly />} />
          <Route path="/ac-tune-up" element={<ACTuneUp />} />
          <Route path="/leak-detection" element={<LeakDetection />} />
          <Route path="/light-fixture-replacement" element={<LightFixtureReplacement />} />
          <Route path="/smoke-detector-installation" element={<SmokeDetectorInstallation />} />
          <Route path="/smart-irrigation-installation" element={<SmartIrrigationInstallation />} />
          <Route path="/holiday-lighting-installation" element={<HolidayLightingInstallation />} />
          
          {/* TV Mounting Services - Root Level */}
          <Route path="/tv-mounting-up-to-50" element={<TVMountingSmall />} />
          <Route path="/tv-mounting-51-to-65" element={<TVMountingMedium />} />
          <Route path="/tv-mounting-over-65" element={<TVMountingLarge />} />
          <Route path="/tv-cable-concealment" element={<TVCableConcealment />} />
          <Route path="/soundbar-installation" element={<SoundbarInstallation />} />
          <Route path="/tv-dismount-remount" element={<TVDismountRemount />} />
          
          {/* Smart Home Services - Root Level */}
          <Route path="/smart-thermostats" element={<SmartThermostats />} />
          <Route path="/video-doorbells" element={<VideoDoorbells />} />
          <Route path="/smart-locks" element={<SmartLocks />} />
          <Route path="/smart-home-integration" element={<SmartHomeIntegration />} />
          
          {/* Audio & Video Services - Root Level */}
          <Route path="/home-theater" element={<HomeTheater />} />
          <Route path="/surround-sound" element={<SurroundSound />} />
          <Route path="/streaming-setup" element={<StreamingSetup />} />
          <Route path="/gaming-setup" element={<GamingSetup />} />
          
          {/* WiFi & Network Services - Root Level */}
          <Route path="/router-setup" element={<RouterSetup />} />
          <Route path="/network-optimization" element={<NetworkOptimization />} />
          <Route path="/dead-zone-elimination" element={<DeadZoneElimination />} />
          <Route path="/business-networks" element={<BusinessNetworks />} />
          
          {/* Home Security Services - Root Level */}
          <Route path="/security-cameras" element={<SecurityCameras />} />
          <Route path="/motion-sensors" element={<MotionSensors />} />
          
          {/* Computers & Printers Services - Root Level */}
          <Route path="/computer-repair" element={<ComputerRepair />} />
          <Route path="/virus-removal" element={<VirusRemoval />} />
          <Route path="/printer-setup" element={<PrinterSetup />} />
          <Route path="/data-backup" element={<DataBackup />} />
          
          {/* Business Services - Root Level */}
          <Route path="/website-design" element={<WebsiteDesign />} />
          <Route path="/remote-support-service" element={<RemoteSupport />} />
          <Route path="/business-it-solutions" element={<ITSolutions />} />
          <Route path="/custom-solutions" element={<CustomSolutions />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
