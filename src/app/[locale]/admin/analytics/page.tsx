"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { supabase } from "@/helper/supabase";
import { 
  IoAnalytics, 
  IoChatbubbles, 
  IoLogOutOutline, 
  IoRefresh, 
  IoMegaphone, 
  IoCompass, 
  IoPerson,
  IoLogoWhatsapp,
  IoMailOpen
} from "react-icons/io5";

interface Lead {
  id: string;
  name: string;
  institution: string;
  whatsapp: string;
  email: string | null;
  app_type: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  created_at: string;
}

export default function AnalyticsDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"all" | "30" | "90">("all");

  // Auth Guard
  useEffect(() => {
    let active = true;
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!active) return;
        if (!session) {
          router.replace("/admin/login");
        } else {
          setIsAuthenticated(true);
          setAuthLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (active) {
          router.replace("/admin/login");
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    let subscription: any = null;
    try {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (!active) return;
        if (!session) {
          router.replace("/admin/login");
        } else {
          setIsAuthenticated(true);
          setAuthLoading(false);
        }
      });
      subscription = data?.subscription;
    } catch (err) {
      console.error("Auth listener registration failed:", err);
    }

    return () => {
      active = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router, locale]);

  // Fetch Leads
  const fetchLeads = async () => {
    if (authLoading || !isAuthenticated) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // Safe check for missing table - will return empty array if not migrated yet
        if (error.message.includes("does not exist")) {
          setLeads([]);
        } else {
          throw error;
        }
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error("Fetch Leads Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [authLoading, isAuthenticated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Filter Leads by Timeframe
  const filteredLeads = leads.filter((lead) => {
    if (timeframe === "all") return true;
    const leadDate = new Date(lead.created_at);
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - parseInt(timeframe, 10));
    return leadDate >= limitDate;
  });

  // Analytics Math
  const totalLeads = filteredLeads.length;

  const appTypeCounts = filteredLeads.reduce((acc: Record<string, number>, lead) => {
    acc[lead.app_type] = (acc[lead.app_type] || 0) + 1;
    return acc;
  }, {});

  const utmSourceCounts = filteredLeads.reduce((acc: Record<string, number>, lead) => {
    const src = lead.utm_source || "Direct / Organic";
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  const referrerCounts = filteredLeads.reduce((acc: Record<string, number>, lead) => {
    let ref = lead.referrer || "Direct Visit";
    if (ref !== "Direct Visit") {
      try {
        ref = new URL(ref).hostname;
      } catch (e) {
        ref = ref.substring(0, 30);
      }
    }
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {});

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <IoAnalytics className="text-3xl text-primary-600 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold">Analytics & Leads Dashboard</h1>
            <p className="text-xs text-neutral-500">Track user acquisition and strategic consultation leads</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/admin/chat")}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-semibold rounded-xl transition-all"
          >
            <IoChatbubbles />
            {locale === "en" ? "Chat Panel" : "Panel Obrolan"}
          </button>
          <button
            onClick={handleLogout}
            className="p-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl text-neutral-600 dark:text-neutral-300 transition-all"
            title={locale === "en" ? "Sign Out" : "Keluar"}
          >
            <IoLogOutOutline size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Controls */}
        <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex gap-2">
            {(["all", "30", "90"] as const).map((tFrame) => (
              <button
                key={tFrame}
                onClick={() => setTimeframe(tFrame)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  timeframe === tFrame
                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/20"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {tFrame === "all" ? "All Time" : `Last ${tFrame} Days`}
              </button>
            ))}
          </div>
          <button
            onClick={fetchLeads}
            className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
            title="Refresh Data"
          >
            <IoRefresh size={20} />
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-16 text-center shadow-sm">
            <IoAnalytics size={64} className="mx-auto mb-4 opacity-20 text-primary-500" />
            <h3 className="text-lg font-bold">No Leads Data Found</h3>
            <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Once visitors submit the Consultation / Contact Form, and the Supabase `leads` table is migrated, submissions will show up here.
            </p>
          </div>
        ) : (
          <>
            {/* Stats Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Total Leads</span>
                <span className="text-4xl font-extrabold mt-4 text-primary-600">{totalLeads}</span>
                <span className="text-xs text-neutral-400 mt-2">Form inquiries captured</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Top Application</span>
                <span className="text-2xl font-extrabold mt-4 truncate">
                  {Object.entries(appTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                </span>
                <span className="text-xs text-neutral-400 mt-2">Most requested application type</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Top UTM Source</span>
                <span className="text-2xl font-extrabold mt-4 truncate">
                  {Object.entries(utmSourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                </span>
                <span className="text-xs text-neutral-400 mt-2">Highest performing campaign channel</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">UTM Traffic Ratio</span>
                <span className="text-2xl font-extrabold mt-4">
                  {totalLeads > 0 
                    ? `${Math.round(((totalLeads - (utmSourceCounts["Direct / Organic"] || 0)) / totalLeads) * 100)}%` 
                    : "0%"}
                </span>
                <span className="text-xs text-neutral-400 mt-2">Leads generated via campaigns</span>
              </div>
            </div>

            {/* Breakdowns section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Application Type Breakdown */}
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6">Application Type</h3>
                <div className="space-y-4">
                  {Object.entries(appTypeCounts).sort((a,b) => b[1] - a[1]).map(([type, count]) => {
                    const pct = Math.round((count / totalLeads) * 100);
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{type}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-primary-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* UTM Campaign Source */}
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6 flex items-center gap-2">
                  <IoMegaphone className="text-primary-500" />
                  Acquisition Sources
                </h3>
                <div className="space-y-4">
                  {Object.entries(utmSourceCounts).sort((a,b) => b[1] - a[1]).map(([source, count]) => {
                    const pct = Math.round((count / totalLeads) * 100);
                    return (
                      <div key={source} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="truncate max-w-[200px]">{source}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Referrers */}
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6 flex items-center gap-2">
                  <IoCompass className="text-primary-500" />
                  Referrer Hostnames
                </h3>
                <div className="space-y-4">
                  {Object.entries(referrerCounts).sort((a,b) => b[1] - a[1]).map(([ref, count]) => {
                    const pct = Math.round((count / totalLeads) * 100);
                    return (
                      <div key={ref} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="truncate max-w-[200px]">{ref}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Leads Inquiries */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Recent Leads List</h3>
                <span className="text-xs text-neutral-400">Sorted by newest</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Institution</th>
                      <th className="p-4">Application</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">UTM Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-all">
                        <td className="p-4 whitespace-nowrap text-xs text-neutral-500">
                          {new Date(lead.created_at).toLocaleString()}
                        </td>
                        <td className="p-4 font-semibold flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                            {lead.name.substring(0, 2).toUpperCase()}
                          </div>
                          {lead.name}
                        </td>
                        <td className="p-4 text-neutral-600 dark:text-neutral-300 font-medium">
                          {lead.institution}
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-semibold">
                            {lead.app_type}
                          </span>
                        </td>
                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <IoLogoWhatsapp className="text-green-500 shrink-0" />
                            <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-600 dark:text-primary-400">
                              {lead.whatsapp}
                            </a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                              <IoMailOpen className="shrink-0" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-xs space-y-1">
                          {lead.utm_source ? (
                            <div className="flex flex-wrap gap-1">
                              <span className="bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded text-[10px] font-semibold border border-primary-200/30">
                                src: {lead.utm_source}
                              </span>
                              {lead.utm_campaign && (
                                <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-200/30">
                                  cmp: {lead.utm_campaign}
                                </span>
                              )}
                              {lead.utm_medium && (
                                <span className="bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-semibold border border-blue-200/30">
                                  med: {lead.utm_medium}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-neutral-400 italic">Organic</span>
                          )}
                          {lead.referrer && (
                            <div className="text-[10px] text-neutral-400 truncate max-w-[200px]" title={lead.referrer}>
                              ref: {lead.referrer}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
