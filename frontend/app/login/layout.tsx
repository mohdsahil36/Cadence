"use client";

import { useEffect } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    const prevOverscroll = html.style.overscrollBehavior;

    html.style.backgroundColor = "#0a0a0a";
    body.style.backgroundColor = "#0a0a0a";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
      html.style.overscrollBehavior = prevOverscroll;
      body.style.overscrollBehavior = "";
    };
  }, []);

  return <div className="min-h-svh bg-[#0a0a0a]">{children}</div>;
}
