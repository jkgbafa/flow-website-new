"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  const fetchToken = useCallback(async () => {
    if (token) return token;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/bot-token");
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        return data.token as string;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setLoading(false);
    return null;
  }, [token]);

  const loadWebChat = useCallback(
    async (tkn: string) => {
      if (renderedRef.current || !chatRef.current) return;

      const w = window as unknown as Record<string, unknown>;
      if (!w.WebChat) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src =
            "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      const WebChat = w.WebChat as {
        createDirectLine: (opts: { token: string }) => unknown;
        renderWebChat: (
          opts: Record<string, unknown>,
          el: HTMLDivElement
        ) => void;
      };

      const directLine = WebChat.createDirectLine({ token: tkn });

      WebChat.renderWebChat(
        {
          directLine,
          styleOptions: {
            backgroundColor: "rgba(0,0,0,0.95)",
            bubbleBackground: "rgba(255,255,255,0.08)",
            bubbleBorderColor: "rgba(255,255,255,0.1)",
            bubbleBorderRadius: 16,
            bubbleTextColor: "#ffffff",
            bubbleFromUserBackground: "#E2231A",
            bubbleFromUserBorderColor: "#E2231A",
            bubbleFromUserBorderRadius: 16,
            bubbleFromUserTextColor: "#ffffff",
            sendBoxBackground: "rgba(255,255,255,0.05)",
            sendBoxTextColor: "#ffffff",
            sendBoxBorderTop: "1px solid rgba(255,255,255,0.1)",
            sendBoxButtonColor: "#E2231A",
            sendBoxButtonColorOnHover: "#FF4D45",
            sendBoxPlaceholderColor: "rgba(255,255,255,0.3)",
            rootHeight: "100%",
            rootWidth: "100%",
            hideUploadButton: true,
            suggestedActionBackground: "rgba(226,35,26,0.15)",
            suggestedActionBorderColor: "#E2231A",
            suggestedActionTextColor: "#E2231A",
          },
        },
        chatRef.current
      );

      renderedRef.current = true;
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    if (open && !renderedRef.current) {
      fetchToken().then((tkn) => {
        if (tkn) loadWebChat(tkn);
      });
    }
  }, [open, fetchToken, loadWebChat]);

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-[60] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ width: "min(380px, calc(100vw - 32px))", height: "min(560px, calc(100vh - 140px))" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 flex flex-col bg-black">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent to-accent-dark">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">DagGPT</p>
                <p className="text-[10px] text-white/70">Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat body */}
          <div ref={chatRef} className="flex-1 overflow-hidden">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center h-full px-6 text-center">
                <p className="text-white/40 text-sm">Unable to connect to DagGPT. Please try again later.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 sm:right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open
            ? "bg-white/10 backdrop-blur-md border border-white/20 rotate-0"
            : "bg-accent hover:bg-accent-light shadow-accent/30 hover:scale-110"
        }`}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
