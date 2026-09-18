# CiptadraSoft Enterprise Web Prototype with Generative AI Chatbot

An enterprise-grade B2B web prototype for **CiptadraSoft**, featuring a modern corporate landing page and an integrated floating Generative AI chatbot grounded in a local knowledge base.

---

## Features

- **Enterprise B2B Landing Page**:
  - Sticky corporate navbar with quick-launch AI triggers and consultation CTA.
  - Large hero section with modern enterprise distributed systems visual.
  - 6 Core Solutions cards with detailed modal previews.
  - Tabbed Product Capabilities suite (CRM, Omnichannel Service Desk, Flow BPM, Insight BI, AI Assistant, Integration Gateway).
  - 7 Industry-specific solution deep dives (Banking & Finance, Retail, Telco, Manufacturing, Government, Healthcare, Enterprise).
  - "Why CiptadraSoft" value pillars and compliance highlights (ISO 27001, OJK/BI, UU PDP).
  - Conversion CTA banner with direct consultation scheduling.
  - Comprehensive corporate footer.

- **Floating Generative AI Chatbot ("Ciptadra AI")**:
  - Fixed bottom-right circular launcher (`bottom: 24px, right: 24px`).
  - Subtle floating animation, soft glow, hover tooltip ("Ask Ciptadra AI"), and unread indicator.
  - Smooth 250–350ms Framer Motion open/close transitions (scale, opacity, translateY).
  - Transitions into close button (`X`) when open.
  - Clear conversation button, online status dot, and minimize controls.
  - Grounded in local enterprise knowledge base (`/data/ciptadra-knowledge.json`).
  - Structured 4-step business problem diagnosis framework.
  - Smart intent detection: automatically presents an inline lead capture form when sales, demo, or pricing interest is detected.
  - Interactive suggested prompts and dynamic follow-up chips.
  - Robust error handling: gracefully displays fallback status when offline or API is unconfigured without crashing.

- **Local Analytics & Lead Management**:
  - Client-side event tracking (`chatbot_opened`, `chatbot_closed`, `message_sent`, `message_received`, `suggested_prompt_clicked`, `lead_form_opened`, `lead_submitted`).
  - Local lead capture logging to server console and memory store.

---

## 1. Installation

Ensure **Node.js** (v18 or newer) is installed on your system.

```bash
# Clone or open the project folder
cd d:\Coding\ciptadrasoft_chatbot

# Install dependencies (if not already installed)
npm install
```

---

## 2. Environment Variables & AI Configuration

The application reads API credentials securely on the server via `.env.local`. **API keys are never exposed to the frontend browser.**

Copy the example file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your preferred provider:

### Option A: Google Gemini (Recommended)

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Set the following in `.env.local`:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### Option B: OpenAI

1. Obtain an API key from [OpenAI Platform](https://platform.openai.com/api-keys).
2. Set the following in `.env.local`:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_actual_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

> **Note on Missing or Invalid API Keys**:
> If no API key is provided, the chatbot will not crash. It will gracefully display:
> *"Ciptadra AI is temporarily unavailable. Please try again or contact our team directly at info@ciptadrasoft.com or +62 21 555 0192."*
> with a retry option.

---

## 3. How to Run Locally

Start the local Next.js development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 4. How to Change AI Provider

The backend uses a clean provider abstraction located in `lib/ai.ts`.

To switch between Gemini and OpenAI, simply update `AI_PROVIDER` in `.env.local`:

```env
# Switch to OpenAI:
AI_PROVIDER=openai

# Or switch back to Gemini:
AI_PROVIDER=gemini
```

Restart your development server after updating environment variables.

---

## 5. How to Edit the Knowledge Base

All grounding information resides in a structured JSON file at:

```
data/ciptadra-knowledge.json
```

It contains:
- `company`: Official profile, values, headquarters, and contact info.
- `solutions`: Enterprise solutions with descriptions and target audiences.
- `products`: Product suites with feature lists and deployment models.
- `industries`: Specific sector challenges and recommended packages.
- `services`: Professional consulting and SLA services.
- `capabilities`: Architecture, security, and integration competencies.
- `faq`: Answers to frequent operational, compliance, and deployment questions.

The retrieval layer in `lib/retrieval.ts` automatically indexes and searches these sections using relevance scoring and keyword tokenization. It is architected so it can be upgraded to vector search (e.g., Pinecone, pgvector, or LangChain RAG) with minimal changes.

---

## 6. How to Customize Chatbot Appearance

- **Colors & Branding**: Modify Tailwind colors in `components/chatbot/ChatWindow.tsx` and `components/chatbot/AIChatbot.tsx`. The default palette uses deep navy (`#0f172a`), royal blue (`#2563eb`), and emerald (`#10b981`).
- **Position & Dimensions**:
  - The floating launcher position is defined in `components/chatbot/AIChatbot.tsx` (`bottom: 24px; right: 24px;`).
  - Desktop chat window size is configured in `components/chatbot/ChatWindow.tsx` (`w-[410px] h-[620px]`).
- **Welcome Message & Initial Prompts**: Edit the `WELCOME_MESSAGE` and `DEFAULT_PROMPTS` constants in `components/chatbot/ChatWindow.tsx` and `components/chatbot/SuggestedPrompts.tsx`.
- **System Prompt & Guardrails**: Customize `lib/chatbotPrompt.ts` to adjust persona guidelines, business diagnosis format, or lead qualification triggers.

---

## 7. Security Best Practices

1. **Server-Side API Handling**: All requests to Gemini or OpenAI are executed exclusively inside Next.js Route Handlers (`app/api/chat/route.ts`).
2. **Key Isolation**: `.env.local` is added to `.gitignore` to prevent leaking API secrets.
3. **Prompt Injection Guardrails**: The system prompt instructs the AI never to fabricate claims, expose internal system prompts, or hallucinate credentials.
4. **Session-Only Memory**: Conversations are held in client state during the browser session and are not permanently stored by default. Users can reset state at any time via the "Clear conversation" button.
