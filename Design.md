# 🎀 Project PRD – Design System & Guidelines

**System Name Suggestion**: ✨ _PayFairy_ / _GirlyPay_ / _PayBlush_

This document defines the **design rules, color palette, typography, spacing, and UI components** to maintain consistency across the app.  
The overall theme is **modern, girly, smooth, playful, and responsive.**

---

## ⚠️ Important Rule

🚫 **Do not touch or modify the functions that connect to the backend.**

- Frontend work should only cover **UI/UX design, styling, and layout**.
- Data fetching, saving, and backend logic must remain untouched.
- If a UI change requires backend adjustments, consult before modifying.
- **Design decisions should prioritize clarity and usability**.

---

## 🎨 Color Palette

We’ll focus on a **pink-dominant look** with supportive pastel tones.

- **Primary Colors**

  - 🌸 Pink Blush: `#F9A8D4`
  - 💖 Hot Pink: `#EC4899`
  - 🌷 Rose Pink: `#F472B6`

- **Secondary Colors**

  - 💜 Lavender: `#C4B5FD`
  - 🌿 Mint Green: `#A7F3D0`
  - ☁️ Off-White: `#FAFAFA`

- **Neutrals**

  - 🖤 Charcoal Gray: `#1F2937`
  - 🤍 Cream: `#FFF7ED`

- **Accent Colors**
  - ✨ Gold: `#FBBF24`
  - 🌊 Aqua: `#22D3EE`

> **Pink** should dominate CTAs, highlights, and key elements.  
> Lavender & Mint should act as subtle accents.

---

## 🖋 Typography

- **Font Family**: **Poppins** (playful, modern) or **Inter** (clean, balanced)
- **Headings**: Bold, clear, standout
- **Body Text**: Clean, easy to read

| Text Type | Font Size | Weight |
| --------- | --------- | ------ |
| H1        | 32px      | 700    |
| H2        | 24px      | 600    |
| Body      | 16px      | 400    |
| Small     | 14px      | 400    |

---

## 📏 Spacing & Layout

- **Base spacing unit**: `4px`
- **Button padding**: `px-5 py-2.5`
- **Card padding**: `p-6`
- **Section padding**: `py-12 md:py-16`
- **Rounded corners**: `rounded-3xl` for a soft feminine feel
- **Shadows**: Light, soft (`shadow-pink-100/40`) to keep it smooth

> Layout should always be **responsive-first** (mobile → desktop).  
> Keep spacing generous and clean for a breathable feel.

---

## 🧩 Components & UI Patterns

### Buttons

- **Primary**: Pink Gradient (`from-pink-400 to-pink-600`)
- **Secondary**: Lavender background, charcoal text
- **Hover**: Simple color darkening (`hover:bg-pink-500`)
- **Shape**: `rounded-3xl`, bold text

### Cards

- Background: White or Cream
- Borders: `rounded-3xl`, pastel accent borders
- Shadows: Light pink shadow for depth
- Content: Clear headings + readable details

### Modals

- Pastel backgrounds (Pink/Lavender/Cream)
- Rounded edges (`rounded-3xl`)
- Light drop shadows for focus

### Feedback

- Use **react-hot-toast**
  - Success: Mint Green with 🌸 checkmark
  - Error: Hot Pink with 💔 cross
- Toast position: **Top-center**

---

## 🖼 Cute Icons

Use **lucide-react** + girly emojis when appropriate. Examples:

- Dashboard → `LayoutDashboard` ✨
- Profile → `UserCircle` 💕
- Agreements → `FileText` 📜
- Payments → `CreditCard` 💳
- Success → `CheckCircle` 🌸
- Error → `XCircle` 💔
- Rewards → `Star` 🎀
- Progress → `Heart` ❤️

---

## ✨ Interaction Guidelines (Simplified)

- **Minimal animations** → prioritize speed & usability
- **Buttons**: Subtle hover color change
- **Cards**: Light shadow lift on hover
- **Modals**: Fade in (no bounce)
- **Navigation**: Clear and quick transitions
- **No heavy effects** (confetti, floating hearts, etc.) → focus on clean UX

---

## 📝 Example Tailwind Snippets

### Gradient Button

```jsx
<button className="px-5 py-2.5 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-md hover:bg-pink-500 transition-colors duration-200">
  💕 Pay Now
</button>
```

<div className="p-6 bg-white rounded-3xl shadow-md border border-pink-200">
  <h2 className="text-lg font-semibold text-gray-800">✨ Agreement Title</h2>
  <p className="text-sm text-gray-500">Details go here...</p>
</div>

Future Considerations

Optional Dark Mode → Pink + Lavender on Charcoal base

Cute progress stickers 🎀 for achievements

Profile avatars with girly frames 💎

Consistent mobile-first responsiveness

💡 Note

Focus on clean, modern, girly design.

Backend logic must not be touched.

Prioritize usability, clarity, and responsiveness over flashy effects.
