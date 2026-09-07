# EcoLens AI 🌿

> **Turning Photos into Climate Action**  
> An AI-powered environmental audit tool built with Next.js 16 + OpenRouter Vision AI.

---

## What It Does

Upload any photo of your environment — a rooftop, a street, your vehicle, home appliances, a backyard, or an industrial building — and EcoLens AI delivers an immediate, data-driven environmental analysis:

| Section | What you get |
|---------|-------------|
| 🔬 **Visual Audit** | Identified subject, observed environmental issues, and climate significance |
| ⚡ **Mitigation** | Tailored, high-impact recommendations to reduce emissions and waste |
| 🛡️ **Adaptation** | Climate resilience and risk adaptation strategies |
| 💰 **ROI Analysis** | Implementation cost level, payback timeline, and a 0–100 climate impact score |

**No tedious surveys. No manual data entry. Just upload an image.**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router with Turbopack) |
| **Language** | TypeScript |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + Custom Glassmorphism CSS Tokens |
| **AI Vision Engine** | OpenRouter API (`google/gemma-4-31b-it:free` / Vision Models) |
| **Animations** | Framer Motion |
| **File Handling** | react-dropzone |
| **Schema Validation** | Zod |
| **Icons** | Lucide React |

---

## Prerequisites

- **Node.js**: 18.x or 20+ (LTS recommended)
- **npm**: 9+
- **OpenRouter API Key**: Obtain a free API key at [openrouter.ai/keys](https://openrouter.ai/keys)

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Debjanimandal/EcoLens-AI.git
cd EcoLens-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the sample environment file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> 🔒 **Security Notice:** The API key is utilized exclusively on the server side (`lib/openrouter.ts` and `app/api/audit/route.ts`) and is never leaked to the client browser.

### 4. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```
ecolens-ai/
├── app/
│   ├── layout.tsx              # Root HTML layout, metadata & fonts
│   ├── page.tsx                # Cinematic landing page with HeroSection
│   ├── globals.css             # Design tokens, liquid glass, and animations
│   ├── audit/
│   │   └── page.tsx            # Interactive climate audit workspace
│   └── api/
│       └── audit/
│           └── route.ts        # POST /api/audit (vision analysis endpoint)
├── components/
│   ├── HeroSection.tsx         # Full-screen video hero & glassmorphic nav
│   ├── ImageUploader.tsx       # Drag-and-drop file upload with preview
│   ├── AnalyzeButton.tsx       # Audit trigger with animated state
│   ├── ResultsDashboard.tsx     # Comprehensive climate report dashboard
│   ├── AuditCard.tsx           # Identified subject & environmental issue card
│   ├── MitigationCard.tsx      # Mitigation recommendations card
│   ├── AdaptationCard.tsx      # Climate resilience card
│   ├── RoiCard.tsx             # ROI analysis and circular impact score ring
│   ├── SummaryBanner.tsx       # High-level AI summary banner
│   ├── StatusBadge.tsx         # Reusable risk/priority badge
│   ├── LoadingOverlay.tsx      # Multi-step progress animation
│   └── ErrorBanner.tsx         # User-friendly error alert with retry
├── lib/
│   ├── openrouter.ts           # OpenRouter client & structured audit prompt
│   └── schema.ts               # Zod validation schemas and TypeScript types
├── types/
│   └── audit.ts                # Audit data type definitions
├── .env.local.example          # Environment variables template
└── README.md                   # Documentation
```

---

## How It Works

```
1. User uploads image on /audit
       ↓
2. Browser submits FormData to POST /api/audit
       ↓
3. Server validates image MIME type and file size (< 10MB)
       ↓
4. Image is encoded to base64 and sent to OpenRouter Vision API
       ↓
5. AI processes image with structured environmental audit prompt
       ↓
6. Output is parsed and validated against Zod schema
       ↓
7. Structured audit data returned to client and rendered in interactive cards
```

---

## API Reference

### `POST /api/audit`

Uploads an image for AI environmental analysis.

- **Content-Type:** `multipart/form-data`
- **Body:** `image` (JPEG, PNG, WebP, GIF; max 10MB)

#### Success Response (`200 OK`)

```json
{
  "data": {
    "audit": {
      "identified_subject": "Commercial flat roof with black bitumen membrane",
      "observed_issue": "High solar heat absorption contributing to urban heat island effect",
      "why_it_matters": "Increases building cooling loads and ambient neighborhood temperatures",
      "confidence": "high"
    },
    "mitigation": {
      "recommendations": [
        "Apply high-albedo reflective cool roof coating",
        "Install modular solar PV arrays on unshaded areas"
      ],
      "expected_benefit": "Up to 25% reduction in cooling energy demand",
      "effort_level": "medium"
    },
    "adaptation": {
      "recommendations": [
        "Incorporate extensive sedum green roofing in load-bearing zones"
      ],
      "risk_addressed": "Severe heatwaves and stormwater runoff surge",
      "resilience_benefit": "Lowers peak roof surface temperatures by 30°F"
    },
    "roi": {
      "cost_level": "medium",
      "payback_or_value": "3 to 5 years via electricity savings",
      "impact_score": 85
    },
    "summary": "High-impact opportunity to cool building envelope and generate on-site solar power."
  }
}
```

---

## Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `OPENROUTER_API_KEY` = your OpenRouter API key
4. Click **Deploy**. Next.js App Router will be configured automatically.

---

## License

MIT License — free for educational, personal, and hackathon use.
