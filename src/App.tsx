import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load pages for better code splitting
const Services = lazy(() => import("./pages/Services"));
const FAQs = lazy(() => import("./pages/FAQs"));
const ContactSales = lazy(() => import("./pages/ContactSales"));
const Contact = lazy(() => import("./pages/Contact"));
const JoinAsPro = lazy(() => import("./pages/JoinAsPro"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const RemoteSupportPage = lazy(() => import("./pages/RemoteSupport"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const ModernWebsite2026 = lazy(() => import("./pages/blog/ModernWebsite2026"));
const ComputerNeedsSupport = lazy(() => import("./pages/blog/ComputerNeedsSupport"));
const TVMountingDoneRight = lazy(() => import("./pages/blog/TVMountingDoneRight"));
const TVMountingMistakes = lazy(() => import("./pages/blog/TVMountingMistakes"));
const TVMountingLosAngeles = lazy(() => import("./pages/blog/TVMountingLosAngeles"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const QuoteSuccess = lazy(() => import("./pages/QuoteSuccess"));

// Admin Pages (lazy loaded to avoid React instance conflicts)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// Category Pages (lazy loaded)
const TVMountingCategory = lazy(() => import("./pages/category/TVMountingCategory"));
const SmartHomeCategory = lazy(() => import("./pages/category/SmartHomeCategory"));
const AudioVideoCategory = lazy(() => import("./pages/category/AudioVideoCategory"));
const WifiNetworkCategory = lazy(() => import("./pages/category/WifiNetworkCategory"));
const HomeSecurityCategory = lazy(() => import("./pages/category/HomeSecurityCategory"));
const ComputersPrintersCategory = lazy(() => import("./pages/category/ComputersPrintersCategory"));
const BusinessCategory = lazy(() => import("./pages/category/BusinessCategory"));
const HomeServicesCategory = lazy(() => import("./pages/category/HomeServicesCategory"));

// Service Pages (lazy loaded for better performance)
const TVMountingSmall = lazy(() => import("./pages/service/TVMountingSmall"));
const TVMountingMedium = lazy(() => import("./pages/service/TVMountingMedium"));
const TVMountingLarge = lazy(() => import("./pages/service/TVMountingLarge"));
const TVCableConcealment = lazy(() => import("./pages/service/TVCableConcealment"));
const SoundbarInstallation = lazy(() => import("./pages/service/SoundbarInstallation"));
const TVDismountRemount = lazy(() => import("./pages/service/TVDismountRemount"));
const SmartThermostats = lazy(() => import("./pages/service/SmartThermostats"));
const VideoDoorbells = lazy(() => import("./pages/service/VideoDoorbells"));
const SmartLocks = lazy(() => import("./pages/service/SmartLocks"));
const SmartHomeIntegration = lazy(() => import("./pages/service/SmartHomeIntegration"));
const HomeTheater = lazy(() => import("./pages/service/HomeTheater"));
const SurroundSound = lazy(() => import("./pages/service/SurroundSound"));
const StreamingSetup = lazy(() => import("./pages/service/StreamingSetup"));
const GamingSetup = lazy(() => import("./pages/service/GamingSetup"));
const RouterSetup = lazy(() => import("./pages/service/RouterSetup"));
const NetworkOptimization = lazy(() => import("./pages/service/NetworkOptimization"));
const DeadZoneElimination = lazy(() => import("./pages/service/DeadZoneElimination"));
const BusinessNetworks = lazy(() => import("./pages/service/BusinessNetworks"));
const SecurityCameras = lazy(() => import("./pages/service/SecurityCameras"));
const MotionSensors = lazy(() => import("./pages/service/MotionSensors"));
const ComputerRepair = lazy(() => import("./pages/service/ComputerRepair"));
const VirusRemoval = lazy(() => import("./pages/service/VirusRemoval"));
const PrinterSetup = lazy(() => import("./pages/service/PrinterSetup"));
const DataBackup = lazy(() => import("./pages/service/DataBackup"));
const WebsiteDesign = lazy(() => import("./pages/service/WebsiteDesign"));
const RemoteSupport = lazy(() => import("./pages/service/RemoteSupport"));
const ITSolutions = lazy(() => import("./pages/service/ITSolutions"));
const CustomSolutions = lazy(() => import("./pages/service/CustomSolutions"));
// New Home Service Pages (lazy loaded)
const HandymanServices = lazy(() => import("./pages/service/HandymanServices"));
const Painting = lazy(() => import("./pages/service/Painting"));
const FlooringInstallation = lazy(() => import("./pages/service/FlooringInstallation"));
const DrywallInstallation = lazy(() => import("./pages/service/DrywallInstallation"));
const CabinetInstallation = lazy(() => import("./pages/service/CabinetInstallation"));
const TileWork = lazy(() => import("./pages/service/TileWork"));
const WindowDoorReplacement = lazy(() => import("./pages/service/WindowDoorReplacement"));
const WindowCleaning = lazy(() => import("./pages/service/WindowCleaning"));
const DeckPatioBuilding = lazy(() => import("./pages/service/DeckPatioBuilding"));
const FenceInstallation = lazy(() => import("./pages/service/FenceInstallation"));
const BathroomRemodeling = lazy(() => import("./pages/service/BathroomRemodeling"));
const KitchenRemodeling = lazy(() => import("./pages/service/KitchenRemodeling"));
const Plumbing = lazy(() => import("./pages/service/Plumbing"));
const Electrical = lazy(() => import("./pages/service/Electrical"));
const HVAC = lazy(() => import("./pages/service/HVAC"));
const Roofing = lazy(() => import("./pages/service/Roofing"));
const ApplianceRepair = lazy(() => import("./pages/service/ApplianceRepair"));
const WaterHeaterInstallation = lazy(() => import("./pages/service/WaterHeaterInstallation"));
const GutterInstallation = lazy(() => import("./pages/service/GutterInstallation"));
const SidingInstallation = lazy(() => import("./pages/service/SidingInstallation"));
const GarageDoorInstallation = lazy(() => import("./pages/service/GarageDoorInstallation"));
const SolarPanelInstallation = lazy(() => import("./pages/service/SolarPanelInstallation"));
const HouseCleaning = lazy(() => import("./pages/service/HouseCleaning"));
const CarpetCleaning = lazy(() => import("./pages/service/CarpetCleaning"));
const JunkRemoval = lazy(() => import("./pages/service/JunkRemoval"));
const PressureWashing = lazy(() => import("./pages/service/PressureWashing"));
const GutterCleaning = lazy(() => import("./pages/service/GutterCleaning"));
const PestControl = lazy(() => import("./pages/service/PestControl"));
const OrganizationServices = lazy(() => import("./pages/service/OrganizationServices"));
const Landscaping = lazy(() => import("./pages/service/Landscaping"));
const SnowRemoval = lazy(() => import("./pages/service/SnowRemoval"));
const FurnitureAssembly = lazy(() => import("./pages/service/FurnitureAssembly"));
const ACTuneUp = lazy(() => import("./pages/service/ACTuneUp"));
const LeakDetection = lazy(() => import("./pages/service/LeakDetection"));
const LightFixtureReplacement = lazy(() => import("./pages/service/LightFixtureReplacement"));
const SmokeDetectorInstallation = lazy(() => import("./pages/service/SmokeDetectorInstallation"));
const SmartIrrigationInstallation = lazy(() => import("./pages/service/SmartIrrigationInstallation"));
const HolidayLightingInstallation = lazy(() => import("./pages/service/HolidayLightingInstallation"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
          <Route path="/blog/tv-mounting-services-los-angeles" element={<TVMountingLosAngeles />} />
          
          {/* Success Pages */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/booking-confirmed" element={<SuccessPage />} />
          <Route path="/quote-received" element={<QuoteSuccess />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
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
          <Route path="/window-cleaning" element={<WindowCleaning />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
