import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, role: "assistant", text: "Hello 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);
  useEffect(() => {
    loadOldMessages();
  }, []);
  const loadOldMessages = async () => {
    try {
      const res = await fetch(
        `https://whcz52k4-8000.euw.devtunnels.ms/api/chat/messages`,
        {
          headers: {
            "accept-language": "en",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (data?.success) {
        const loaded = data.message.map((m, index) => ({
          id: index + 1000,
          role: m.role,
          text: m.content,
        }));
        setMessages((prev) => [...prev, ...loaded]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: idRef.current++, role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://whcz52k4-8000.euw.devtunnels.ms/api/chat/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept-language": "en",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            message: userMsg.text,
          }),
        }
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const botMsg = {
        id: idRef.current++,
        role: "assistant",
        text: data?.reply ?? data?.message ?? "No reply from server",
      };

      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "assistant",
          text: "Error contacting server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((s) => !s)}
        className="fixed cursor-pointer bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center !rounded-full bg-gradient-to-br from-[#036874] to-[#1CA5B4] shadow-xl ring-2 ring-white transition-transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.85L3 20l1.15-3.8A7.968 7.968 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-82  max-w-full !rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#1CA5B4] to-[#036874] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center !rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4"
                  />
                </svg>
              </div>

              <div>
                <div className="text-sm font-semibold">Site Assistant</div>
                <div className="text-xs opacity-80">Online now</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="!rounded-md cursor-pointer bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
            >
              Close
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-64 overflow-y-auto space-y-3 px-3 py-3 break-words"
            role="log"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] ${
                  m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
                }`}
              >
                <div
                  className={`inline-block !rounded-xl px-3 py-2 text-sm break-words  whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="mr-auto text-left">
                <div className="inline-block !rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-600">
                  ... typing
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-xs text-red-600">{error}</div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Type your message..."
              className="h-10 flex-1 resize-none !rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`
            !rounded-lg bg-[#1CA5B4] px-3 py-2 text-sm font-medium text-white
            disabled:opacity-60
            ${input.trim() ? "cursor-pointer" : "cursor-default"}
            `}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
