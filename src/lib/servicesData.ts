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

export const serviceCategories: Category[] = [
  {
    title: "Installations",
    services: [
      { 
        id: "appliance-install", 
        label: "Appliance Install", 
        href: "/appliance-installation", 
        icon: Home,
        price: "$149",
        description: "Professional installation of major appliances",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
      },
      { 
        id: "cabinet-hardware", 
        label: "Cabinet Hardware", 
        href: "/cabinet-hardware-installation", 
        icon: Wrench,
        price: "$99",
        description: "Cabinet hardware installation and repair",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
      },
      { 
        id: "furniture-assembly", 
        label: "Furniture Assembly", 
        href: "/furniture-assembly", 
        icon: Hammer,
        price: "$75",
        description: "Expert furniture assembly services",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
      },
      { 
        id: "ac-tune-up", 
        label: "AC Tune-Up", 
        href: "/ac-tune-up", 
        icon: Wind,
        price: "$149",
        description: "HVAC maintenance and tune-ups",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
      },
    ],
  },
  {
    title: "Repair & Maintenance",
    services: [
      { 
        id: "plumbing-repair", 
        label: "Plumbing Repair", 
        href: "/plumbing", 
        icon: Droplets,
        price: "$99",
        description: "Repairs, installations & emergencies",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
      },
      { 
        id: "handyman", 
        label: "Handyman Services", 
        href: "/handyman-services", 
        icon: Wrench,
        price: "$75",
        description: "Furniture assembly, repairs & odd jobs",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
      },
      { 
        id: "leak-detection", 
        label: "Leak Detection", 
        href: "/leak-detection", 
        icon: Droplets,
        price: "$125",
        description: "Professional leak detection and repair",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
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
        price: "$99",
        description: "Setup, optimization & dead zones",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
      },
      { 
        id: "security-cameras", 
        label: "Security Camera Setup", 
        href: "/security-cameras", 
        icon: Shield,
        price: "$199",
        description: "Professional camera installation",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
      },
      { 
        id: "smart-lock", 
        label: "Smart Lock Install", 
        href: "/smart-lock-installation", 
        icon: Lock,
        price: "$149",
        description: "Smart lock installation and setup",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
      },
      { 
        id: "smart-thermostats", 
        label: "Smart Thermostats", 
        href: "/smart-thermostats", 
        icon: Thermometer,
        price: "$149",
        description: "Smart thermostat installation",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
      },
      { 
        id: "home-theater", 
        label: "Home Theater Setup", 
        href: "/home-theater", 
        icon: Tv,
        price: "$249",
        description: "Surround sound & streaming setup",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"
      },
      { 
        id: "video-doorbell", 
        label: "Video Doorbell Setup", 
        href: "/video-doorbell-installation", 
        icon: BellRing,
        price: "$149",
        description: "Video doorbell installation",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
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
        price: "$125",
        description: "Safe, licensed electrical work",
        image: "https://images.unsplash.com/photo-1621905252472-3af65b8c3dd8?w=800"
      },
      { 
        id: "smoke-detector", 
        label: "Smoke Detector Install", 
        href: "/smoke-detector-installation", 
        icon: AlertCircle,
        price: "$99",
        description: "Smoke detector installation and testing",
        image: "https://images.unsplash.com/photo-1621905252472-3af65b8c3dd8?w=800"
      },
    ],
  },
  {
    title: "Outdoor & TV Mounting",
    services: [
      { 
        id: "tv-mounting", 
        label: "TV Mounting", 
        href: "/tv-mounting-up-to-50", 
        icon: Tv, 
        badge: "Hot",
        price: "$99",
        description: "Professional wall mounting for any TV size",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"
      },
      { 
        id: "pressure-washing", 
        label: "Pressure Washing", 
        href: "/pressure-washing", 
        icon: Droplets,
        price: "$149",
        description: "Exterior cleaning & maintenance",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
      },
      { 
        id: "smart-irrigation", 
        label: "Smart Irrigation", 
        href: "/smart-irrigation-installation", 
        icon: Sprout,
        price: "$299",
        description: "Smart irrigation system installation",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"
      },
      { 
        id: "gutter-cleaning", 
        label: "Gutter Cleaning", 
        href: "/gutter-cleaning", 
        icon: Wrench,
        price: "$149",
        description: "Professional gutter cleaning services",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
      },
      { 
        id: "holiday-lighting", 
        label: "Holiday Lighting", 
        href: "/holiday-lighting-installation", 
        icon: Sparkles,
        price: "$199",
        description: "Holiday lighting installation and removal",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
      },
    ],
  },
];

// Flatten all services for search/filtering
export const allServices = serviceCategories.flatMap(category => category.services);
