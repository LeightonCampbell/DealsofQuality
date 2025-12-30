import ServicePage from "@/components/ServicePage";
import { HardDrive } from "lucide-react";

const DataBackup = () => (
  <ServicePage
    title="Data Backup Setup"
    metaTitle="Data Backup | Cloud & Local Backup | Deals Of Quality"
    metaDescription="Professional data backup setup. Protect your important files with automatic backup."
    metaKeywords="data backup, cloud backup, file backup, data protection"
    rating={4.9}
    reviewCount={289}
    price="$99"
    icon={HardDrive}
    category="Computers & Printers"
    includedServices={[
      "Assess backup needs",
      "Set up backup solution",
      "Configure automatic backups",
      "Verify backup integrity",
      "Document recovery process"
    ]}
    faqs={[
      { question: "What backup solutions do you recommend?", answer: "We set up cloud backup (Google Drive, iCloud, OneDrive) and local backup drives." },
      { question: "Can you recover lost data?", answer: "In many cases, yes. Contact us for data recovery consultation." }
    ]}
  />
);

export default DataBackup;
