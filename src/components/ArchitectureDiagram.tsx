'use client';

import { useState } from 'react';
import {
  ArchitectureDiagramData,
  ArchitectureNode,
  ArchitectureNodeType,
} from '@/types';
import {
  Laptop,
  Shield,
  Cpu,
  Database,
  Zap,
  Cog,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';

interface ArchitectureDiagramProps {
  data: ArchitectureDiagramData;
  projectTitle: string;
}

const typeConfig: Record<
  ArchitectureNodeType,
  { label: string; icon: any; color: string; border: string; bg: string }
> = {
  client: {
    label: 'Client / Ingress',
    icon: Laptop,
    color: 'text-sky-400',
    border: 'border-sky-500/30 hover:border-sky-400',
    bg: 'bg-sky-950/20',
  },
  gateway: {
    label: 'Gateway / Ingress',
    icon: Shield,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30 hover:border-cyan-400',
    bg: 'bg-cyan-950/20',
  },
  service: {
    label: 'Core Service / Logic',
    icon: Cpu,
    color: 'text-indigo-400',
    border: 'border-indigo-500/30 hover:border-indigo-400',
    bg: 'bg-indigo-950/20',
  },
  database: {
    label: 'Storage / Database',
    icon: Database,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    bg: 'bg-emerald-950/20',
  },
  cache: {
    label: 'In-Memory Cache',
    icon: Zap,
    color: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-400',
    bg: 'bg-amber-950/20',
  },
  worker: {
    label: 'Background Worker',
    icon: Cog,
    color: 'text-purple-400',
    border: 'border-purple-500/30 hover:border-purple-400',
    bg: 'bg-purple-950/20',
  },
  external: {
    label: 'External System',
    icon: Layers,
    color: 'text-rose-400',
    border: 'border-rose-500/30 hover:border-rose-400',
    bg: 'bg-rose-950/20',
  },
};

export default function ArchitectureDiagram({ data, projectTitle }: ArchitectureDiagramProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(data.nodes[0]?.id || '');

  const selectedNode = data.nodes.find((n) => n.id === selectedNodeId) || data.nodes[0];

  // Group nodes into pipeline stages if desired, or render as responsive node grid with connection tags
  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#0b0d14] overflow-hidden text-slate-200">
      {/* Header Bar */}
      <div className="px-4 py-3 border-b border-white/10 bg-[#10131e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Interactive Architecture Diagram
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">
          Click any component node to inspect rationale & trade-offs
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Overview text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-l-2 border-cyan-500/50 pl-3">
          {data.overview}
        </p>

        {/* Nodes Visual Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SYSTEM TOPOLOGY ({data.nodes.length} NODES)</span>
            <span className="text-[11px] text-cyan-400">Select node for deep dive</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.nodes.map((node, index) => {
              const isSelected = node.id === selectedNode?.id;
              const config = typeConfig[node.type] || typeConfig.service;
              const Icon = config.icon;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/25 shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-cyan-400/50'
                      : `${config.border} ${config.bg} hover:bg-white/[0.04]`
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded bg-black/40 ${config.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        {config.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">#{index + 1}</span>
                  </div>

                  <h4 className="font-mono text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {node.label}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-400/90 truncate max-w-[180px] bg-black/30 px-2 py-0.5 rounded border border-white/5">
                      {node.tech}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Flow & Protocols Pipeline */}
        {data.edges && data.edges.length > 0 && (
          <div className="pt-2">
            <span className="block text-xs font-mono text-slate-400 mb-2.5">
              COMMUNICATION PROTOCOLS & INTERFACES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {data.edges.map((edge, idx) => {
                const fromNode = data.nodes.find((n) => n.id === edge.from);
                const toNode = data.nodes.find((n) => n.id === edge.to);

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 text-[11px]"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-slate-300 font-medium truncate max-w-[90px] sm:max-w-[110px]">
                        {fromNode?.label.split(':')[0] || edge.from}
                      </span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="text-slate-300 font-medium truncate max-w-[90px] sm:max-w-[110px]">
                        {toNode?.label.split(':')[0] || edge.to}
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 shrink-0 text-[10px]">
                      {edge.protocol}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Node Deep-Dive Inspector */}
        {selectedNode && (
          <div className="mt-4 p-4 rounded-xl border border-cyan-500/30 bg-[#0d101a] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <h5 className="font-mono text-sm font-semibold text-slate-100">
                  Node Inspection: {selectedNode.label}
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium">
                  {selectedNode.tech}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Responsibility in System:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Why Chosen */}
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-emerald-300">
                  Why this technology was chosen:
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {selectedNode.whyChosen}
              </p>
            </div>

            {/* Trade-offs */}
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono font-semibold text-amber-300">
                  Key Architectural Trade-offs:
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {selectedNode.tradeOffs}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
