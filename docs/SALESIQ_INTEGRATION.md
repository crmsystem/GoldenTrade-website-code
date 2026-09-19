# Zoho SalesIQ Integration

## Overview

The website now uses a hybrid chatbot flow: the existing Ria widget remains the first point of contact, and Zoho SalesIQ is used for the live handoff experience when the visitor needs a human or a live conversation.

The current implementation is focused on:
- loading the SalesIQ widget script safely
- syncing discovered visitor details into SalesIQ visitor fields
- escalating from AI chat to a human handoff when the conversation indicates a live-support need
- tracking chat and handoff analytics for follow-up reporting

This does not replace the SalesIQ dashboard or operator workspace. It adds a front-end handoff path that uses the SalesIQ widget APIs from the site.

## Current Architecture

```text
Visitor
  │
  ▼
Ria Chat Widget
  │
  ├─ Groq reply generation
  ├─ intent detection + lead qualification
  └─ analytics + conversation summary
         │
         ├─ normal conversation
         │
         └─ human escalation
                │
                ▼
            Zoho SalesIQ
                │
                ▼
         Live chat / operator handoff
```

## Key Files

The current flow is implemented across these modules:
- [src/components/site/ChatWidget.tsx](../src/components/site/ChatWidget.tsx): chat UI, visitor extraction, escalation button, handoff trigger
- [src/services/salesiq.service.ts](../src/services/salesiq.service.ts): SalesIQ script loading, readiness handling, visitor sync, chat start/open actions
- [src/hooks/useSalesIQ.ts](../src/hooks/useSalesIQ.ts): hook wrapper around the SalesIQ service
- [src/utils/intentDetection.ts](../src/utils/intentDetection.ts): intent classification for human escalation and routing
- [src/utils/leadQualification.ts](../src/utils/leadQualification.ts): simple lead scoring from chat data
- [src/utils/aiSummary.ts](../src/utils/aiSummary.ts): conversation summary generation and local persistence
- [src/types/salesiq.d.ts](../src/types/salesiq.d.ts): declaration file for SalesIQ APIs and related structures

## Script Load and Readiness Handling

The SalesIQ loader protects the app from duplicate script injection and waits for the widget to become ready before invoking SalesIQ methods.

It currently handles:
1. checking whether SalesIQ is already loaded
2. preventing repeated script injection
3. waiting for the widget to report readiness
4. failing gracefully if the script cannot be loaded

## Visitor Context Sync

When the chatbot detects values such as name, email, phone, or company from the user message, the app updates the SalesIQ visitor profile.

The supported visitor APIs are:
- visitor.name()
- visitor.email()
- visitor.contactnumber()
- visitor.info()

Values are only sent when they are present and pass basic validation, which helps avoid malformed data reaching the widget.

## Human Handoff Flow

The chatbot stays in place as the front-end experience, but it can escalate to a live SalesIQ chat when needed.

The handoff is triggered when:
- the visitor explicitly asks for a human or a consultant
- the detected intent is low-confidence or points to support/sales escalation

When that happens, the app:
1. builds a conversation summary from the latest exchange
2. persists the summary in local storage for continuity
3. shows a handoff action in the chat UI
4. starts the SalesIQ chat only after the visitor confirms the handoff

## Conversation Intelligence

The new flow also adds lightweight AI-assisted context:
- the widget extracts possible visitor details from the conversation
- intent detection classifies requests such as pricing, demo, support, or human escalation
- lead qualification scores the conversation based on captured details and buying signals
- the summary is passed to the SalesIQ handoff path so a human agent has context immediately

## Configuration

SalesIQ is enabled through environment variables:

```env
VITE_ZOHO_SALESIQ_ENABLED=false
VITE_ZOHO_SALESIQ_SCRIPT_URL=https://salesiq.zoho.com/widget/your-script.js
VITE_ZOHO_SALESIQ_WIDGET_CODE=your-widget-code
```

## Analytics and Persistence

The app tracks a small suite of analytics events for the chatbot and handoff flow, including:
- chat_opened
- chat_closed
- message_sent
- message_received
- human_requested
- live_chat_started
- email_collected
- phone_collected
- lead_qualified

Conversation summaries are also stored in browser local storage under the key `salesiq-conversation-summary` so the handoff can retain context across refreshes.

## Current Limitations

The implementation is intentionally lightweight and depends on the configured SalesIQ environment for deeper capabilities.

Current limitations include:
- no server-side persistence or operator-side CRM sync beyond the client-side handoff path
- routing is based on the app’s intent logic, not yet hard-wired to specific SalesIQ department IDs unless configured externally
- the integration does not recreate the full SalesIQ operator experience or dashboard features

## Manual Setup in Zoho SalesIQ

The following still needs to be configured in the Zoho SalesIQ dashboard or widget settings:
- the real widget script URL and brand settings
- any required pre-chat fields or validation rules
- department mapping if you want routed handoffs to specific teams
- CRM field mapping if visitor data should sync into Zoho CRM

## Deployment Checklist

- Configure the SalesIQ widget code and script URL in the deployment environment
- Verify the script loads correctly in a production build
- Test the full handoff experience from an incognito browser with an operator account available
- Confirm that visitor context appears in the SalesIQ chat session after the handoff

## Troubleshooting

- If the widget does not appear, verify the script URL and widget code
- If visitor details do not show up, confirm the SalesIQ widget is ready and the browser is not blocking the script
- If the handoff does not start, verify that the interaction came from a valid user action and that the SalesIQ widget is initialized

## Recommended Next Steps

Possible improvements include:
- forwarding conversation summaries to a server-side endpoint for operator review
- mapping the handoff logic to real SalesIQ departments once they are configured
- adding richer analytics and event forwarding
- extending the context payload when the SalesIQ platform exposes additional session metadata
