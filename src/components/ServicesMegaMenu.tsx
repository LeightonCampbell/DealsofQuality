import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { megaMenuCategories } from "@/lib/servicesData";

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesMegaMenu = ({ isOpen, onClose }: ServicesMegaMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed left-0 right-0 top-[73px] bg-white border-t border-border shadow-lg z-50"
      onMouseLeave={onClose}
    >
      <div className="container-max max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {megaMenuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="font-display text-base font-bold text-foreground mb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.services.map((service, serviceIndex) => {
                  const Icon = service.icon;
                  return (
                    <li key={serviceIndex}>
                      <Link
                        to={service.href}
                        onClick={onClose}
                        className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex items-center gap-2">
                          {service.label}
                          {service.badge && (
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                                service.badge === "New"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {service.badge}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link
            to="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors group"
          >
            See All Solutions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
