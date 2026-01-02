import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Terminal, 
  Loader2, 
  ArrowLeft, 
  Paperclip, 
  Search, 
  User, 
  History, 
  ChevronDown,
  X,
  MessageSquare,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: FileAttachment[];
}

interface FileAttachment {
  name: string;
  type: string;
  size: number;
  url: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/axiom-chat`;

const ChatPage: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromptNav, setShowPromptNav] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Get user prompts for navigation
  const userPrompts = messages
    .filter(m => m.role === 'user')
    .map((m, idx) => ({ id: m.id, content: m.content, index: idx }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-message');
      setTimeout(() => element.classList.remove('highlight-message'), 2000);
    }
    setShowPromptNav(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Load sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('axiom-chat-sessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      })));
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('axiom-chat-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
    setShowHistory(false);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const updateCurrentSession = (newMessages: Message[]) => {
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: generateId(),
        title: newMessages[0]?.content.slice(0, 30) + '...' || 'New Chat',
        messages: newMessages,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    } else {
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { 
              ...s, 
              messages: newMessages, 
              updatedAt: new Date(),
              title: s.title === 'New Chat' && newMessages[0]?.content 
                ? newMessages[0].content.slice(0, 30) + '...' 
                : s.title
            }
          : s
      ));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: FileAttachment[] = [];
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      newAttachments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url
      });
    });

    setAttachedFiles(prev => [...prev, ...newAttachments]);
    toast({
      title: 'Files attached',
      description: `${files.length} file(s) ready to send`,
    });
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const streamChat = async (userMessages: { role: string; content: string }[]) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${resp.status}`);
    }

    if (!resp.body) {
      throw new Error('No response body');
    }

    return resp;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      id: generateId(),
      role: 'user', 
      content: input.trim(),
      timestamp: new Date(),
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    let assistantContent = '';

    try {
      const chatMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const resp = await streamChat(chatMessages);
      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      const assistantId = generateId();
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  id: assistantId,
                  role: 'assistant', 
                  content: assistantContent,
                  timestamp: new Date()
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                  id: generateId(),
                  role: 'assistant', 
                  content: assistantContent,
                  timestamp: new Date()
                };
                return updated;
              });
            }
          } catch { /* ignore */ }
        }
      }

      // Update session
      setMessages(prev => {
        updateCurrentSession(prev);
        return prev;
      });

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get response',
        variant: 'destructive',
      });
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Filter messages based on search query
  const filteredMessages = searchQuery
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-primary/30 text-primary">{part}</mark>
        : part
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Chat History */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ${showHistory ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:${showHistory ? 'block' : 'hidden'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-pixel text-sm text-primary">Chat History</h2>
            <button onClick={() => setShowHistory(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          
          <button
            onClick={createNewSession}
            className="m-4 p-3 border border-dashed border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare size={16} />
            New Chat
          </button>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map(session => (
              <button
                key={session.id}
                onClick={() => loadSession(session)}
                className={`w-full text-left p-3 rounded-sm transition-colors ${
                  currentSessionId === session.id 
                    ? 'bg-primary/10 text-primary border border-primary/30' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="text-sm truncate">{session.title}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock size={10} />
                  {session.updatedAt.toLocaleDateString()}
                </div>
              </button>
            ))}
            {sessions.length === 0 && (
              <p className="text-center text-muted-foreground text-sm p-4">
                No chat history yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="cursor-target text-muted-foreground hover:text-primary transition-colors lg:hidden"
            >
              <History size={20} />
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="cursor-target text-muted-foreground hover:text-primary transition-colors hidden lg:block"
              title="Toggle history"
            >
              <History size={20} />
            </button>
            <Link 
              to="/" 
              className="cursor-target text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <h1 className="font-pixel text-sm text-primary">AXIOM</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Prompt Navigation Dropdown */}
            {userPrompts.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPromptNav(!showPromptNav)}
                  className="cursor-target text-muted-foreground hover:text-primary"
                  title="Navigate prompts"
                >
                  <ChevronDown size={18} />
                </Button>
                {showPromptNav && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-sm shadow-lg z-50 max-h-64 overflow-y-auto">
                    <div className="p-2 border-b border-border">
                      <span className="text-xs text-muted-foreground font-mono">Your Prompts</span>
                    </div>
                    {userPrompts.map((prompt, idx) => (
                      <button
                        key={prompt.id}
                        onClick={() => scrollToMessage(prompt.id)}
                        className="w-full text-left p-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                      >
                        <div className="text-xs text-primary font-mono mb-1">Prompt {idx + 1}</div>
                        <div className="text-sm text-foreground truncate">{prompt.content}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="cursor-target text-muted-foreground hover:text-primary"
              title="Search chat"
            >
              <Search size={18} />
            </Button>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(!showProfile)}
              className="cursor-target text-muted-foreground hover:text-primary"
              title="Profile"
            >
              <User size={18} />
            </Button>

            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              v0.1-alpha
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="cursor-target text-muted-foreground hover:text-destructive"
              title="Clear chat"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-b border-border p-3 bg-card/50">
            <div className="max-w-4xl mx-auto flex items-center gap-2">
              <Search size={16} className="text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in chat..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <span className="text-xs text-muted-foreground">
                  {filteredMessages.length} results
                </span>
              )}
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Profile Panel */}
        {showProfile && (
          <div className="border-b border-border p-4 bg-card/50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <User size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">AXIOM User</div>
                  <div className="text-sm text-muted-foreground">Active Session</div>
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>Sessions: {sessions.length}</div>
                <div>Messages: {messages.length}</div>
              </div>
              <button onClick={() => setShowProfile(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="font-pixel text-2xl md:text-4xl text-primary mb-4 glitch-text">
                  AXIOM
                </div>
                <p className="text-muted-foreground max-w-md mb-8">
                  Operational Reasoning & Intelligence Optimization Model.
                  <br />
                  Ask anything. Decisions are backed by evidence.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    'Explain your decision-making process',
                    'How do you handle uncertainty?',
                    'What makes you different from prediction models?',
                    'When do you choose to abstain?',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="cursor-target p-3 rounded-sm border border-border bg-card/50 text-left text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(searchQuery ? filteredMessages : messages).map((message, index) => (
              <div
                key={message.id}
                id={`message-${message.id}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-sm p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-primary font-mono">
                      <Terminal size={12} />
                      <span>AXIOM</span>
                    </div>
                  )}
                  
                  {/* File attachments */}
                  {message.files && message.files.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {message.files.map((file, idx) => (
                        <div key={idx} className="text-xs bg-background/20 px-2 py-1 rounded flex items-center gap-1">
                          <Paperclip size={10} />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`whitespace-pre-wrap ${message.role === 'assistant' ? 'prose prose-invert prose-sm max-w-none' : ''}`}>
                    {message.content ? (
                      searchQuery ? highlightText(message.content, searchQuery) : message.content
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" />
                        Processing...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border p-4 shrink-0">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* Attached files preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-card border border-border rounded-sm px-3 py-2 text-sm">
                    <Paperclip size={14} className="text-primary" />
                    <span className="text-foreground">{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-muted-foreground hover:text-destructive">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2 items-end">
              {/* File upload button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-target h-12 text-muted-foreground hover:text-primary shrink-0"
                title="Attach files"
              >
                <Paperclip size={18} />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.txt,.doc,.docx,.md"
              />
              
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AXIOM..."
                  rows={1}
                  className="cursor-target w-full resize-none bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{
                    minHeight: '48px',
                    maxHeight: '200px',
                  }}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="cursor-target h-12 px-4"
                variant="hero"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              AXIOM explanations are grounded in evidence. Decisions are immutable.
            </p>
          </form>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showPromptNav || showProfile) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setShowPromptNav(false); setShowProfile(false); }}
        />
      )}

      {/* Highlight animation style */}
      <style>{`
        .highlight-message {
          animation: highlight-pulse 2s ease-out;
        }
        @keyframes highlight-pulse {
          0%, 100% { box-shadow: none; }
          50% { box-shadow: 0 0 0 3px hsl(var(--primary) / 0.5); }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;