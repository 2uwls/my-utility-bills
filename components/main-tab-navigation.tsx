"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { value: "home", label: "홈", href: "/" },
  { value: "analysis", label: "분석", href: "/analysis" },
  { value: "savings", label: "절약", href: "/savings" },
  { value: "benefits", label: "혜택", href: "/benefits" },
  { value: "esg", label: "ESG", href: "/esg" },
];

export default function MainTabNavigation({ active }: { active: string }) {
  return (
    <Tabs value={active} className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-white rounded-2xl p-1 h-12">
        {tabs.map((tab) => (
          <Link key={tab.value} href={tab.href} className="contents">
            <TabsTrigger
              value={tab.value}
              className="rounded-xl text-sm data-[state=active]:bg-[#FFE300] data-[state=active]:text-gray-900">
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
