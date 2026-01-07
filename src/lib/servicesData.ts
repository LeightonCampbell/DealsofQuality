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
  LucideIcon
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

import { 
  Wrench, 
  Home, 
  Wifi, 
  Shield, 
  Tv, 
  Droplets, 
  Plug, 
  Wind, 
  Lock, 
  Thermometer, 
  BellRing,
  Lightbulb, 
  AlertCircle, 
  Sprout, 
  Sparkles,
  LucideIcon,
  Droplet,
  Paintbrush,
  SquareStack,
  Window,
  Fence,
  Bath,
  ChefHat,
  Carpet,
  Trash2,
  TreePine
} from "lucide-react";

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
        icon: TreePine,
        description: "Landscape design and maintenance",
      },
      { 
        id: "window-cleaning", 
        label: "Window Cleaning", 
        href: "/window-cleaning", 
        icon: Window,
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
        icon: ChefHat,
        description: "Complete kitchen renovation services",
      },
      { 
        id: "bathroom-remodeling", 
        label: "Bathroom Remodeling", 
        href: "/bathroom-remodeling", 
        icon: Bath,
        description: "Bathroom renovation and remodeling",
      },
      { 
        id: "carpet-cleaning", 
        label: "Carpet Cleaning", 
        href: "/carpet-cleaning", 
        icon: Carpet,
        description: "Professional carpet cleaning services",
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
    ],
  },
];

// Flatten all services for search/filtering
export const allServices = serviceCategories.flatMap(category => category.services);
