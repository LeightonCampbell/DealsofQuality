import { 
  Wrench, 
  Home, 
  Wifi, 
  Shield, 
  Tv, 
  Droplets, 
  Plug, 
  Wind, 
  Hammer, 
  Lock, 
  Thermometer, 
  Video, 
  BellRing,
  Lightbulb, 
  AlertCircle, 
  Sprout, 
  Sparkles,
  LucideIcon,
  Droplet,
  Paintbrush,
  SquareStack,
  Square,
  Fence,
  Bath,
  Layers,
  Trash2,
  Globe,
  Speaker,
  Headphones,
  Gamepad2,
  HardDrive,
  ShieldAlert,
  Server,
  Building2,
  Monitor,
  Printer,
  Cable
} from "lucide-react";

export interface ServiceItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: "New" | "Hot";
  price?: string;
  description?: string;
  image?: string;
}

export interface Category {
  title: string;
  services: ServiceItem[];
}

export const serviceCategories: Category[] = [
  {
    title: "Home & Property Maintenance",
    services: [
      { 
        id: "house-cleaning", 
        label: "House Cleaning / Maid Service", 
        href: "/house-cleaning", 
        icon: Home,
        description: "Professional house cleaning and maid services",
      },
      { 
        id: "landscaping", 
        label: "Landscaping", 
        href: "/landscaping", 
        icon: Sprout,
        description: "Landscape design and maintenance",
      },
      { 
        id: "window-cleaning", 
        label: "Window Cleaning", 
        href: "/window-cleaning", 
        icon: Square,
        description: "Interior and exterior window cleaning",
      },
      { 
        id: "gutter-cleaning", 
        label: "Gutter Cleaning", 
        href: "/gutter-cleaning", 
        icon: Wrench,
        description: "Professional gutter cleaning services",
      },
      { 
        id: "junk-removal", 
        label: "Junk Removal", 
        href: "/junk-removal", 
        icon: Trash2,
        description: "Junk and debris removal services",
      },
      { 
        id: "pressure-washing", 
        label: "Pressure Washing", 
        href: "/pressure-washing", 
        icon: Droplet,
        description: "Exterior cleaning & maintenance",
      },
      { 
        id: "carpet-cleaning", 
        label: "Carpet Cleaning", 
        href: "/carpet-cleaning", 
        icon: Layers,
        description: "Professional carpet cleaning services",
      },
    ],
  },
  {
    title: "Repairs & Installation",
    services: [
      { 
        id: "hvac", 
        label: "HVAC (Heating & Air Conditioning)", 
        href: "/hvac", 
        icon: Wind,
        description: "HVAC installation, repair, and maintenance",
      },
      { 
        id: "plumbing", 
        label: "Plumbing Services", 
        href: "/plumbing", 
        icon: Droplets,
        description: "Repairs, installations & emergencies",
      },
      { 
        id: "electrical", 
        label: "Electrical", 
        href: "/electrical", 
        icon: Plug,
        description: "Safe, licensed electrical work",
      },
      { 
        id: "roofing", 
        label: "Roofing", 
        href: "/roofing", 
        icon: Home,
        description: "Roofing installation and repair",
      },
      { 
        id: "appliance-repair", 
        label: "Appliance Repair", 
        href: "/appliance-repair", 
        icon: Home,
        description: "Professional appliance repair services",
      },
      { 
        id: "drywall-repair", 
        label: "Drywall Repair", 
        href: "/drywall-installation", 
        icon: SquareStack,
        description: "Drywall installation and repair",
      },
      { 
        id: "fence-gate", 
        label: "Fence & Gate Installation", 
        href: "/fence-installation", 
        icon: Fence,
        description: "Fence and gate installation services",
      },
    ],
  },
  {
    title: "Home Improvement & Renovation",
    services: [
      { 
        id: "painting", 
        label: "Painting (Interior & Exterior)", 
        href: "/painting", 
        icon: Paintbrush,
        description: "Interior and exterior painting services",
      },
      { 
        id: "handyman", 
        label: "Handyman Services", 
        href: "/handyman-services", 
        icon: Wrench,
        description: "Furniture assembly, repairs & odd jobs",
      },
      { 
        id: "kitchen-remodeling", 
        label: "Kitchen Remodeling", 
        href: "/kitchen-remodeling", 
        icon: Home,
        description: "Complete kitchen renovation services",
      },
      { 
        id: "bathroom-remodeling", 
        label: "Bathroom Remodeling", 
        href: "/bathroom-remodeling", 
        icon: Bath,
        description: "Bathroom renovation and remodeling",
      },
    ],
  },
  {
    title: "Smart Home & Tech",
    services: [
      { 
        id: "wifi-networking", 
        label: "Wi-Fi & Networking", 
        href: "/router-setup", 
        icon: Wifi, 
        badge: "Hot",
        description: "Setup, optimization & dead zones",
      },
      { 
        id: "security-cameras", 
        label: "Security Camera Setup", 
        href: "/security-cameras", 
        icon: Shield,
        description: "Professional camera installation",
      },
      { 
        id: "smart-lock", 
        label: "Smart Lock Install", 
        href: "/smart-locks", 
        icon: Lock,
        description: "Smart lock installation and setup",
      },
      { 
        id: "smart-thermostats", 
        label: "Smart Thermostats", 
        href: "/smart-thermostats", 
        icon: Thermometer,
        description: "Smart thermostat installation",
      },
      { 
        id: "home-theater", 
        label: "Home Theater Setup", 
        href: "/home-theater", 
        icon: Tv,
        description: "Surround sound & streaming setup",
      },
      { 
        id: "video-doorbell", 
        label: "Video Doorbell Setup", 
        href: "/video-doorbells", 
        icon: BellRing,
        description: "Video doorbell installation",
      },
      { 
        id: "smart-home-integration", 
        label: "Smart Home Integration", 
        href: "/smart-home-integration", 
        icon: Home,
        description: "Complete smart home system integration",
      },
      { 
        id: "gaming-setup", 
        label: "Gaming Setup", 
        href: "/gaming-setup", 
        icon: Gamepad2,
        description: "Gaming console setup and optimization",
      },
      { 
        id: "streaming-setup", 
        label: "Streaming Setup", 
        href: "/streaming-setup", 
        icon: Video,
        description: "Streaming device setup and configuration",
      },
      { 
        id: "surround-sound", 
        label: "Surround Sound", 
        href: "/surround-sound", 
        icon: Speaker,
        description: "Surround sound system installation",
      },
      { 
        id: "motion-sensors", 
        label: "Motion Sensors", 
        href: "/motion-sensors", 
        icon: AlertCircle,
        description: "Motion sensor installation and setup",
      },
    ],
  },
  {
    title: "Electrical & Safety",
    services: [
      { 
        id: "light-fixture", 
        label: "Light Fixture Replace", 
        href: "/light-fixture-replacement", 
        icon: Lightbulb,
        description: "Safe, licensed electrical work",
      },
      { 
        id: "smoke-detector", 
        label: "Smoke Detector Install", 
        href: "/smoke-detector-installation", 
        icon: AlertCircle,
        description: "Smoke detector installation and testing",
      },
    ],
  },
  {
    title: "Outdoor & TV Mounting",
    services: [
      { 
        id: "smart-irrigation", 
        label: "Smart Irrigation", 
        href: "/smart-irrigation-installation", 
        icon: Sprout,
        description: "Smart irrigation system installation",
      },
      { 
        id: "holiday-lighting", 
        label: "Holiday Lighting", 
        href: "/holiday-lighting-installation", 
        icon: Sparkles,
        description: "Holiday lighting installation and removal",
      },
      { 
        id: "tv-mounting-small", 
        label: "TV Mounting (up to 50\")", 
        href: "/tv-mounting-up-to-50", 
        icon: Tv,
        description: "Professional TV mounting for TVs up to 50 inches",
      },
      { 
        id: "tv-mounting-medium", 
        label: "TV Mounting (51\" to 65\")", 
        href: "/tv-mounting-51-to-65", 
        icon: Tv,
        description: "Professional TV mounting for 51 to 65 inch TVs",
      },
      { 
        id: "tv-mounting-large", 
        label: "TV Mounting (over 65\")", 
        href: "/tv-mounting-over-65", 
        icon: Tv,
        description: "Professional TV mounting for large TVs over 65 inches",
      },
      { 
        id: "tv-cable-concealment", 
        label: "TV Cable Concealment", 
        href: "/tv-cable-concealment", 
        icon: Cable,
        description: "Hide and organize TV cables professionally",
      },
      { 
        id: "soundbar-installation", 
        label: "Soundbar Installation", 
        href: "/soundbar-installation", 
        icon: Speaker,
        description: "Professional soundbar installation and setup",
      },
      { 
        id: "tv-dismount-remount", 
        label: "TV Dismount & Remount", 
        href: "/tv-dismount-remount", 
        icon: Tv,
        description: "TV removal and reinstallation services",
      },
    ],
  },
  {
    title: "Computers & Printers",
    services: [
      { 
        id: "computer-repair", 
        label: "Computer Repair", 
        href: "/computer-repair", 
        icon: Wrench,
        description: "PC and Mac repair services",
      },
      { 
        id: "virus-removal", 
        label: "Virus Removal", 
        href: "/virus-removal", 
        icon: ShieldAlert,
        description: "Virus and malware removal services",
      },
      { 
        id: "printer-setup", 
        label: "Printer Setup", 
        href: "/printer-setup", 
        icon: Printer,
        description: "Printer installation and configuration",
      },
      { 
        id: "data-backup", 
        label: "Data Backup", 
        href: "/data-backup", 
        icon: HardDrive,
        description: "Data backup and recovery services",
      },
    ],
  },
  {
    title: "Business Services",
    services: [
      { 
        id: "website-design", 
        label: "Website Design", 
        href: "/website-design", 
        icon: Globe,
        description: "Professional website design for businesses",
      },
      { 
        id: "remote-support", 
        label: "Remote Support", 
        href: "/remote-support-service", 
        icon: Headphones,
        description: "Remote technical support services",
      },
      { 
        id: "business-it-solutions", 
        label: "Business IT Solutions", 
        href: "/business-it-solutions", 
        icon: Server,
        description: "Complete IT solutions for businesses",
      },
      { 
        id: "custom-solutions", 
        label: "Custom Solutions", 
        href: "/custom-solutions", 
        icon: Wrench,
        description: "Custom technology solutions",
      },
    ],
  },
];

// Flatten all services for search/filtering
export const allServices = serviceCategories.flatMap(category => category.services);
