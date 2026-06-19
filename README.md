# EcoLens AI 🌿

> **Turning Photos into Climate Action**  
> An AI-powered environmental audit tool built with Next.js + Google Gemini Vision.

---

## What It Does

Upload any photo of your environment — a rooftop, a street, your car, appliances, a backyard, or a building — and EcoLens AI instantly delivers:

| Section | What you get |
|---------|-------------|
| 🔬 **Visual Audit** | Identified subject, observed climate issue, and why it matters |
| ⚡ **Mitigation** | Practical steps to reduce emissions, tailored to your image |
| 🛡️ **Adaptation** | Strategies to build climate resilience against specific risks |
| 💰 **ROI Analysis** | Cost level, payback estimate, and 0-100 impact score |

**No forms. No manual data entry. Just a photo.**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| AI | Google Gemini 2.0 Flash (Vision) |
| Animations | Framer Motion |
| Upload | react-dropzone |
| Validation | Zod |
| Icons | lucide-react |

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)

---

## Quick Start

### 1. Clone / download the project

```bash
git clone <your-repo-url>
cd ecolens-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> 🔒 The API key lives **only on the server**. It is never sent to the browser.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
ecolens-ai/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Main page — all app states
│   ├── globals.css         # Design system, tokens, animations
│   └── api/
│       └── audit/
│           └── route.ts    # POST /api/audit — backend route
├── components/
│   ├── HeroSection.tsx     # Landing hero with CTA
│   ├── ImageUploader.tsx   # Drag-and-drop + click upload
│   ├── AnalyzeButton.tsx   # Submit button with loading state
│   ├── ResultsDashboard.tsx # Orchestrates result cards
│   ├── AuditCard.tsx       # Visual audit card
│   ├── MitigationCard.tsx  # Mitigation strategies card
│   ├── AdaptationCard.tsx  # Adaptation strategies card
│   ├── RoiCard.tsx         # ROI + animated impact score ring
│   ├── SummaryBanner.tsx   # AI one-line summary
│   ├── StatusBadge.tsx     # Reusable low/medium/high badge
│   ├── LoadingOverlay.tsx  # Animated loading screen
│   └── ErrorBanner.tsx     # Error display with retry
├── lib/
│   ├── gemini.ts           # Gemini client + system prompt
│   └── schema.ts           # Zod schema + TypeScript types
├── types/
│   └── audit.ts            # Re-exported types
├── .env.local.example      # Environment variable template
└── README.md
```

---

## How It Works

```
User uploads image
       ↓
Browser sends FormData → POST /api/audit
       ↓
Server validates file (type + size)
       ↓
Convert buffer → base64
       ↓
Send to Gemini Vision with strict system prompt
       ↓
Parse + Zod-validate JSON response
       ↓
Return structured data to browser
       ↓
React renders 4 result cards
```

---

## API Route

`POST /api/audit`

**Request:** `multipart/form-data` with field `image` (JPEG/PNG/WebP/GIF, max 10 MB)

**Success response:**
```json
{
  "data": {
    "audit": { "identified_subject": "...", "observed_issue": "...", "why_it_matters": "...", "confidence": "high" },
    "mitigation": { "recommendations": ["..."], "expected_benefit": "...", "effort_level": "medium" },
    "adaptation": { "recommendations": ["..."], "risk_addressed": "...", "resilience_benefit": "..." },
    "roi": { "cost_level": "low", "payback_or_value": "...", "impact_score": 78 },
    "summary": "..."
  }
}
```

**Error response:**
```json
{ "error": "Human-friendly error message" }
```

---

