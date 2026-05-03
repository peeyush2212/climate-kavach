"use client";

import * as React from "react";
import { Copy, Download, GitCompareArrows, Lock, RotateCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIndiaRoadsStore } from "@/lib/store";
import { encodeScenario } from "@/lib/scenarioCodec";
import { downloadText } from "@/lib/utils";
import { toCsv } from "@/lib/simulator";

export function ScenarioControls() {
  const scenario = useIndiaRoadsStore((s) => s.scenario);
  const sim = useIndiaRoadsStore((s) => s.sim);
  const premium = useIndiaRoadsStore((s) => s.premiumUnlocked);
  const openPaywall = useIndiaRoadsStore((s) => s.openPaywall);
  const resetScenario = useIndiaRoadsStore((s) => s.resetScenario);
  const saveScenario = useIndiaRoadsStore((s) => s.saveScenario);
  const saved = useIndiaRoadsStore((s) => s.saved);
  const loadScenario = useIndiaRoadsStore((s) => s.loadScenario);
  const deleteScenario = useIndiaRoadsStore((s) => s.deleteScenario);
  const compareIds = useIndiaRoadsStore((s) => s.compareIds);
  const toggleCompare = useIndiaRoadsStore((s) => s.toggleCompare);

  const [name, setName] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  function doCopyLink() {
    if (!scenario) return;
    const encoded = encodeScenario(scenario);
    const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function doExportCsv() {
    if (!sim) return;
    downloadText("india_roads_scenario.csv", toCsv(sim.rows), "text/csv");
  }

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/55 p-4 shadow-[0_0_50px_rgba(8,145,178,.10)] backdrop-blur-xl">
      <div className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">Scenario tools</div>
      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-black text-slate-100">Data packs</div>
              <div className="text-xs font-semibold text-slate-400">Sample is free. Premium is server-locked.</div>
            </div>
            <div className="flex shrink-0 gap-2">
              <a href="/api/download/sample"><Button variant="outline" size="sm"><Download className="h-4 w-4" /> Sample</Button></a>
              {premium ? (
                <a href="/api/download/premium"><Button size="sm"><Download className="h-4 w-4" /> Premium</Button></a>
              ) : (
                <Button size="sm" onClick={openPaywall}><Lock className="h-4 w-4" /> Unlock</Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={resetScenario}><RotateCcw className="h-4 w-4" /> Reset</Button>
          <Button variant="outline" onClick={doCopyLink}><Copy className="h-4 w-4" /> {copied ? "Copied" : "Share"}</Button>
          <Button variant="outline" onClick={doExportCsv}><Download className="h-4 w-4" /> CSV</Button>
        </div>

        <div className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name this scenario…"
            className="h-10 w-full rounded-lg border border-cyan-300/15 bg-slate-950/70 px-3 text-sm text-slate-100 placeholder:text-slate-500"
          />
          <Button onClick={() => { saveScenario(name); setName(""); }}><Save className="h-4 w-4" /> Save</Button>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Saved scenarios (compare up to 3)</div>
          {saved.length === 0 ? (
            <div className="rounded-lg border border-cyan-300/10 bg-slate-950/40 p-3 text-sm text-slate-500">No saved scenarios yet.</div>
          ) : (
            <div className="space-y-2">
              {saved.slice(0, 10).map((s) => {
                const inCompare = compareIds.includes(s.id);
                return (
                  <div key={s.id} className="flex items-center justify-between gap-2 rounded-lg border border-cyan-300/10 bg-slate-950/45 px-3 py-2">
                    <button className="flex-1 truncate text-left text-sm font-bold text-slate-200 hover:text-cyan-200" onClick={() => loadScenario(s.id)}>{s.name}</button>
                    <Button variant={inCompare ? "secondary" : "outline"} size="icon" onClick={() => toggleCompare(s.id)} title="Compare"><GitCompareArrows className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => deleteScenario(s.id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
