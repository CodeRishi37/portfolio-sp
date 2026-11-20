'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoUrl?: string;
  projectTitle: string;
}

export default function LiveDemoModal({
  isOpen,
  onClose,
  demoUrl,
  projectTitle,
}: LiveDemoModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !demoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0b0d14] rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Browser Header */}
        <div className="px-4 py-3 bg-[#111420] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <span
              id="demo-modal-title"
              className="font-mono text-xs text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-md"
            >
              Demo: {projectTitle}
            </span>
          </div>

          {/* Browser Address Bar / Action Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/10 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate max-w-xs">{demoUrl}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setIframeKey((prev) => prev + 1);
              }}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Reload sandbox iframe"
              aria-label="Reload preview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="hidden sm:inline">Open New Tab</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close demo modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* X-Frame-Options Safety Fallback Notification */}
        <div className="bg-[#141724] px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Sandboxed preview. If the remote service restricts embedding (X-Frame-Options), use the
              Open New Tab link.
            </span>
          </div>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline shrink-0 ml-2"
          >
            Direct URL →
          </a>
        </div>

        {/* Iframe Sandbox Container */}
        <div className="relative flex-1 bg-black overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090b10] z-10 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <p className="font-mono text-xs text-slate-400">
                Initializing sandboxed environment...
              </p>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={demoUrl}
            title={`Live demo of ${projectTitle}`}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
