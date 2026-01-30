import { Activity, FileText, Shield, User, Heart, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

export interface UserProfile {
  name: string;
  avatar: string;
  age: number;
  bloodGroup: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  labName: string;
  category: "Bloodwork" | "Imaging" | "Vitals" | "Other";
  status: "Normal" | "Attention" | "Critical";
  summary: string;
  parameters: ReportParameter[];
}

export interface ReportParameter {
  name: string;
  value: string;
  unit: string;
  range: string;
  status: "Normal" | "Low" | "High";
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  timing: "Morning" | "Afternoon" | "Night" | "As Needed";
  taken: boolean;
  type: "Pill" | "Liquid" | "Injection";
}

export interface TimelineEvent {
  date: string;
  type: "Report" | "Vitals" | "Visit";
  title: string;
  description: string;
}

export const currentUser: UserProfile = {
  name: "Alex Morgan",
  avatar: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTgwMjYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  age: 34,
  bloodGroup: "O+",
};

export const reports: MedicalReport[] = [
  {
    id: "r1",
    title: "Complete Blood Count",
    date: "Jan 28, 2026",
    labName: "Quest Diagnostics",
    category: "Bloodwork",
    status: "Attention",
    summary: "Hemoglobin levels are slightly low. White blood cell count is normal, indicating no active infection.",
    parameters: [
      { name: "Hemoglobin", value: "11.2", unit: "g/dL", range: "13.5 - 17.5", status: "Low" },
      { name: "WBC", value: "6.5", unit: "K/uL", range: "4.5 - 11.0", status: "Normal" },
      { name: "Platelets", value: "250", unit: "K/uL", range: "150 - 450", status: "Normal" },
    ],
  },
  {
    id: "r2",
    title: "Lipid Profile",
    date: "Dec 15, 2025",
    labName: "LabCorp",
    category: "Bloodwork",
    status: "Normal",
    summary: "All lipid levels are within the healthy range. Keep up the good diet.",
    parameters: [
      { name: "Total Cholesterol", value: "185", unit: "mg/dL", range: "< 200", status: "Normal" },
      { name: "LDL", value: "95", unit: "mg/dL", range: "< 100", status: "Normal" },
      { name: "HDL", value: "55", unit: "mg/dL", range: "> 40", status: "Normal" },
    ],
  },
  {
    id: "r3",
    title: "Liver Function Test",
    date: "Nov 02, 2025",
    labName: "City Hospital",
    category: "Bloodwork",
    status: "Normal",
    summary: "Liver enzymes are stable.",
    parameters: [
      { name: "ALT", value: "22", unit: "U/L", range: "7 - 56", status: "Normal" },
      { name: "AST", value: "20", unit: "U/L", range: "10 - 40", status: "Normal" },
    ],
  },
];

export const medications: Medication[] = [
  { id: "m1", name: "Amoxicillin", dosage: "500mg", timing: "Morning", taken: true, type: "Pill" },
  { id: "m2", name: "Vitamin D3", dosage: "1000IU", timing: "Morning", taken: true, type: "Pill" },
  { id: "m3", name: "Ibuprofen", dosage: "400mg", timing: "As Needed", taken: false, type: "Pill" },
];

export const timelineEvents: TimelineEvent[] = [
  { date: "Jan 28", type: "Report", title: "New Lab Results", description: "CBC Report uploaded from Quest Diagnostics" },
  { date: "Jan 25", type: "Vitals", title: "Blood Pressure Spike", description: "Recorded 140/90 mmHg after exercise" },
  { date: "Jan 10", type: "Visit", title: "Dr. Smith Consultation", description: "Annual physical checkup" },
];
