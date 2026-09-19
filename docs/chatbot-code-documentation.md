# Chatbot Code Documentation

This document explains the chatbot implementation in detail. It covers the UI component, the knowledge/prompt definitions, and the Groq API integration used to generate replies.

## Overview

The chatbot is built as a floating widget on the website. When a visitor clicks the widget, a chat panel opens. The visitor types a message, the app sends it to Groq together with a system prompt, and the assistant returns a response that is rendered in the chat window.

The implementation is split across three files:

- [src/components/site/ChatWidget.tsx](../src/components/site/ChatWidget.tsx): the visual chat widget UI and conversation state
- [src/lib/chatbotKnowledge.ts](../src/lib/chatbotKnowledge.ts): the assistant persona, company knowledge, and response style instructions
- [src/lib/groq.ts](../src/lib/groq.ts): the API wrapper that sends messages to the Groq model

---

## 1) File: [src/components/site/ChatWidget.tsx](../src/components/site/ChatWidget.tsx)

### Lines 1–8: imports

- Line 1 imports `useEffect`, `useRef`, and `useState` from React. These hooks manage side effects, references, and local component state.
- Line 2 imports `FormEvent` as a type from React. This is used for form submission typing.
- Line 3 imports `AnimatePresence` and `motion` from `framer-motion`. These are used to animate the chat panel opening and closing.
- Line 4 imports `ReactMarkdown` so assistant replies can be rendered as formatted markdown.
- Line 5 imports `remarkGfm`, which enables GitHub-flavored markdown support such as lists and tables inside the chat messages.
- Line 6 imports `Send` and `X` from `lucide-react` for the send and close icons.
- Line 7 imports `askGroq` and the `ChatMessage` type from the Groq helper module.
- Line 8 imports the greeting and system prompt constants from the chatbot knowledge module.

### Lines 10–30: the `RiaAvatar` component

- Line 10 defines a small component called `RiaAvatar` that receives an optional `className` prop.
- Line 11 creates a local state value called `broken` initialized to `false`. This is used to detect whether the avatar image failed to load.
- Line 13 checks whether the image failed to load.
- Line 14 starts a return block for the fallback UI.
- Line 15 renders a styled div with a gradient background and white text. It acts as a fallback avatar if the image cannot be displayed.
- Line 16 contains the fallback letter `R` displayed inside the circle.
- Line 17 closes the fallback content.
- Line 18 closes the fallback return.
- Line 20 returns to the normal render path.
- Line 21 opens the element tree for the image-based avatar.
- Line 22 renders an `<img>` element.
- Line 23 points the image source to `/ria-avatar.png`, which should exist in the public assets folder.
- Line 24 sets the alternative text to `Ria` for accessibility.
- Line 25 adds an `onError` handler that sets the `broken` state to `true` if the image fails to load.
- Line 26 sets the image focus position with a small inline style.
- Line 27 applies styling classes such as `object-cover` and any passed-in classes.
- Line 28 closes the `<img>` element.
- Line 29 closes the return block.
- Line 30 closes the component.

### Lines 32–39: state initialization inside `ChatWidget`

- Line 32 declares the main `ChatWidget` component.
- Line 33 creates a state variable `open` set to `false`. This controls whether the chat panel is visible.
- Line 34 creates a state array called `messages` with an initial assistant greeting message.
- Line 35 adds the initial assistant message using `RIA_GREETING`.
- Line 36 closes the initial array state.
- Line 37 creates a state value `input` to hold the current text in the message box.
- Line 38 creates a `loading` state value used to disable the input and show a typing indicator while waiting for a reply.
- Line 39 creates a `scrollRef` reference attached to the chat message container so the UI can scroll down automatically.

### Lines 41–43: auto-scroll effect

- Line 41 starts a `useEffect` hook, which runs whenever the messages, loading state, or open state changes.
- Line 42 checks whether the scroll container exists and then scrolls it to the bottom smoothly.
- Line 43 closes the effect and lists the dependencies that trigger it.

### Lines 45–70: `sendMessage` logic

- Line 45 defines an async function called `sendMessage` that accepts an optional form event.
- Line 46 calls `preventDefault()` if an event exists so the page does not reload when the form is submitted.
- Line 47 trims whitespace from the current input and stores it in `text`.
- Line 48 stops the function if the input is empty or if a request is already in progress.
- Line 50 creates `next` as a new array containing all existing messages plus the new user message.
- Line 51 updates the chat history with the user message immediately so the UI feels responsive.
- Line 52 clears the input field.
- Line 53 sets `loading` to `true` to show a spinner and prevent duplicate requests.
- Line 55 starts a `try` block for the API request.
- Line 56 sends the system prompt and the full message history to `askGroq`.
- Line 57 adds the assistant’s reply to the message list once the request succeeds.
- Line 58 begins the catch block for any errors.
- Line 59 appends a fallback assistant message when the request fails.
- Line 60 continues the array update.
- Line 61 starts an object for the error message.
- Line 62 marks the role as assistant.
- Line 63 stores a friendly fallback reply that explains the error and provides contact details.
- Line 64 contains the fallback message text.
- Line 65 closes the object.
- Line 66 closes the state update.
- Line 67 starts the `finally` block.
- Line 68 resets `loading` to `false` regardless of success or failure.
- Line 69 closes the `finally` block.
- Line 70 closes the function.

### Lines 72–98: floating launch button

- Line 72 starts the JSX return block.
- Line 73 opens a fragment so multiple top-level elements can be returned.
- Line 74 renders a motion button that acts as the floating chat launcher.
- Line 75 toggles the `open` state when clicked.
- Line 76 sets the initial scale to `0` and opacity to `0` for a subtle entrance animation.
- Line 77 animates the button to full size and opacity, also applying a small vertical bobbing motion.
- Line 78 starts the transition definition.
- Line 79 sets the scale animation duration.
- Line 80 sets the opacity animation duration.
- Line 81 configures the bobbing movement over time.
- Line 82 closes the transition configuration.
- Line 83 adds a hover animation that slightly enlarges the button.
- Line 84 adds a tap animation that shrinks the button briefly.
- Line 85 sets the button’s visual styling, including size, rounded shape, shadow, border, and background color.
- Line 86 defines the accessible aria-label text based on whether the chat is open.
- Line 87 opens the button element.
- Line 88 checks whether the chat is open.
- Line 89 renders a close icon inside the button when the panel is open.
- Line 90 displays the X icon.
- Line 91 closes the span.
- Line 92 handles the closed state.
- Line 93 renders the avatar image when the panel is closed.
- Line 94 closes the condition.
- Line 95 shows a small online indicator dot when the panel is closed.
- Line 96 renders the green dot.
- Line 97 closes the condition and the button.
- Line 98 closes the button element.

### Lines 100–211: the chat panel UI

- Line 100 begins the animation wrapper for the chat panel.
- Line 101 checks whether the `open` state is true.
- Line 102 starts the animated panel container.
- Line 103 defines the entrance animation starting with a slightly lowered and scaled-down position.
- Line 104 animates the panel into view.
- Line 105 defines the exit animation when the panel closes.
- Line 106 sets the duration and easing of the transition.
- Line 107 sets the frame styling, size, color, rounding, shadow, and layout properties.
- Line 108 closes the panel container.
- Line 109 starts the header bar for the chat window.
- Line 110 renders the avatar inside the header.
- Line 111 opens a container for the title and status text.
- Line 112 renders the visible name `Ria`.
- Line 113 opens the status text container.
- Line 114 renders an online indicator and label.
- Line 115 closes the status container.
- Line 116 closes the header text wrapper.
- Line 117 starts the close button in the header.
- Line 118 closes the panel when clicked.
- Line 119 styles the close button.
- Line 120 adds an accessible label.
- Line 121 opens the button content.
- Line 122 renders the close icon.
- Line 123 closes the button.
- Line 124 closes the header.
- Line 126 starts the scrollable message list area.
- Line 127 maps through the `messages` array and renders each message.
- Line 128 sets the alignment based on whether the message is from the user or assistant.
- Line 129 opens the message bubble container.
- Line 130 sets bubble styling and width constraints.
- Line 131 checks whether the message is from the user.
- Line 132 sets the user bubble to a blue background with white text.
- Line 133 sets assistant bubbles to a light background with a border and shadow.
- Line 134 closes the class selection logic.
- Line 135 closes the bubble container opening.
- Line 136 checks whether the message is from the assistant.
- Line 137 renders the assistant content using `ReactMarkdown` so markdown formatting is displayed.
- Line 138 enables GitHub-flavored markdown support.
- Line 139 begins the component override map for markdown elements.
- Line 140 defines how paragraph tags are rendered inside the chat bubble.
- Line 141 defines list rendering for unordered lists.
- Line 142 defines list rendering for ordered lists.
- Line 143 defines list item rendering.
- Line 144 makes bold text appear stronger and more branded.
- Line 145 starts the custom link renderer.
- Line 146 renders anchor tags with a branded link style and opens them in a new tab.
- Line 147 displays the link content.
- Line 148 closes the anchor element.
- Line 149 closes the link renderer.
- Line 150–166 define how headings, code blocks, tables, and cells are rendered so assistant replies look polished in the widget.
- Line 167 closes the `components` object.
- Line 168 opens the markdown content body.
- Line 169 renders the message text.
- Line 170 closes the `ReactMarkdown` component.
- Line 171 handles the user message path.
- Line 172 renders the user text with whitespace preserved.
- Line 173 closes the user branch.
- Line 174 closes the bubble container.
- Line 175 closes the message wrapper.
- Line 176 closes the messages list mapping.
- Line 177 handles the loading state.
- Line 178 opens the loading indicator container.
- Line 179 renders the three-dot typing indicator bubble.
- Line 180 maps over the three dots.
- Line 181 starts each dot as a motion span.
- Line 182 assigns a key to the dot.
- Line 183 animates the dot vertically up and down.
- Line 184 sets the timing and stagger for the animation.
- Line 185 sets the dot’s visual appearance.
- Line 186 closes the dot component.
- Line 187 closes the mapping.
- Line 188 closes the typing indicator bubble.
- Line 189 closes the loading container.
- Line 190 closes the loading block.
- Line 191 closes the message list container.
- Line 193 starts the input form at the bottom of the panel.
- Line 194 renders the text input.
- Line 195 binds the input value to the `input` state.
- Line 196 updates the state whenever the user types.
- Line 197 sets placeholder text to guide the user.
- Line 198 applies styling for the input field.
- Line 199 closes the input.
- Line 200 starts the send button.
- Line 201 sets the button type to submit.
- Line 202 disables the button when loading is active or there is no input.
- Line 203 styles the send button and adds hover states.
- Line 204 sets the button’s accessible label.
- Line 205 opens the button content.
- Line 206 renders the send icon.
- Line 207 closes the button.
- Line 208 closes the form.
- Line 209 closes the chat panel.
- Line 210 closes the `open` conditional.
- Line 211 closes the animation wrapper.
- Line 212 closes the fragment.
- Line 213 closes the JSX return.
- Line 214 closes the component.

---

## 2) File: [src/lib/chatbotKnowledge.ts](../src/lib/chatbotKnowledge.ts)

### Lines 1–59: the assistant system prompt and greeting

- Line 1 defines the main prompt string for the assistant. It tells the model to act as Ria, a friendly assistant for Goldentrade Solutions.
- Line 2 leaves a blank line for readability.
- Line 3 marks the beginning of the company overview section.
- Line 4 describes Goldentrade Solutions as a Zoho Authorized Partner and Zoho Certified Developer team.
- Line 5 provides the company location.
- Line 6 lists the contact email and phone number.
- Line 7 explains the core value proposition.
- Line 8 lists company values such as certification, outcomes, enterprise-grade delivery, and lifetime support.
- Line 9 explains the full project lifecycle handled by the team.
- Line 10 adds spacing between sections.
- Line 11 starts the services section.
- Line 12 describes Zoho CRM and its main capabilities.
- Line 13 describes Zoho People and workforce features.
- Line 14 describes Zoho Books and finance features.
- Line 15 describes Zoho Creator and low-code app development.
- Line 16 describes Zoho SalesIQ and visitor intelligence.
- Line 17 describes Zoho Recruit and talent acquisition.
- Line 18 adds spacing.
- Line 19 states that the team can implement the Zoho One suite when needed.
- Line 20 adds spacing.
- Line 21 begins the methodology section.
- Line 22 describes the consulting and strategy phase.
- Line 23 describes implementation and build.
- Line 24 describes integration and connection.
- Line 25 describes training and adoption.
- Line 26 describes support and optimization.
- Line 27 provides the expected go-live acceleration figure.
- Line 28 adds spacing.
- Line 29 begins the pricing section.
- Line 30 explains the pricing structure.
- Line 31 lists the initial deposit stage.
- Line 32 lists the milestone payment phase.
- Line 33 lists the final payment phase.
- Line 34 explains that retainer packages are available and that exact quotes depend on scope.
- Line 35 adds spacing.
- Line 36 starts the case studies section.
- Line 37 lists an enterprise SaaS result.
- Line 38 lists a manufacturing result.
- Line 39 lists a logistics result.
- Line 40 lists a professional services result.
- Line 41 lists a hospitality result.
- Line 42 lists a healthcare result.
- Line 43 adds spacing.
- Line 44 begins the section on how visitors can engage.
- Line 45 explains the discovery call option.
- Line 46 explains the CRM discovery form option.
- Line 47 explains the free trial option.
- Line 48 gives direct contact information.
- Line 49 adds spacing.
- Line 50 begins the guidance for response behavior.
- Line 51 tells the model to write for a narrow chat widget rather than a full webpage.
- Line 52 instructs the assistant to keep responses short.
- Line 53 tells the assistant to use light markdown formatting.
- Line 54 asks the assistant to avoid heavy headings in small chat bubbles.
- Line 55 instructs the assistant to stay warm and professional.
- Line 56 tells the assistant how to answer pricing questions.
- Line 57 tells the assistant how to route users who want to start a project or talk to a human.
- Line 58 tells the assistant to stay within known company and Zoho topics.
- Line 59 tells the assistant never to invent facts.
- Line 61 defines the greeting message shown when the widget first opens.
- Line 62 creates the actual greeting string and introduces Ria.

---

## 3) File: [src/lib/groq.ts](../src/lib/groq.ts)

### Lines 1–7: configuration values

- Line 1 is a comment explaining that the API key is embedded client-side because the site is static.
- Line 2 explains that the key can be seen in the browser bundle and that it should be rotated if misused.
- Line 3 continues the security note and suggests moving the call behind a server-side proxy in the future.
- Line 4 closes the comment block.
- Line 5 stores the Groq API key in a constant.
- Line 6 stores the specific model name to use.
- Line 7 stores the endpoint URL for the Groq chat completions API.

### Lines 9–10: message types

- Line 9 defines a `ChatRole` type that allows only `system`, `user`, or `assistant` roles.
- Line 10 defines a `ChatMessage` type containing a role and content string.

### Lines 12–36: the `askGroq` function

- Line 12 declares an async function named `askGroq` that accepts an array of chat messages and returns a string reply.
- Line 13 sends a POST request to the Groq endpoint.
- Line 14 sets the HTTP method to `POST`.
- Line 15 starts the request headers block.
- Line 16 sets the content type to JSON.
- Line 17 adds the authorization header using the API key.
- Line 18 closes the headers block.
- Line 19 starts the request body.
- Line 20 includes the selected model.
- Line 21 includes the message history.
- Line 22 sets the temperature to `0.4` to keep replies balanced and not too random.
- Line 23 begins a comment explaining that the model is reasoning-based and may need extra token budget.
- Line 24 continues the comment about internal reasoning and response size.
- Line 25 sets `max_tokens` to `600` to give the model enough room to respond.
- Line 26 closes the request body.
- Line 27 closes the `fetch` call.
- Line 29 checks whether the HTTP response was successful.
- Line 30 throws an error if the API returned a non-success status.
- Line 31 closes the error block.
- Line 33 parses the response JSON body.
- Line 34 extracts the first assistant reply content from the response structure.
- Line 35 throws an error if no reply text is returned.
- Line 36 returns the assistant response text.
- Line 37 closes the function.

---

## How the chatbot works end to end

1. The user clicks the floating button and opens the chat widget.
2. The widget displays the initial greeting from the knowledge module.
3. The user types a message into the input box.
4. The app adds the new user message to the existing conversation state.
5. The app sends the full message history and the system prompt to Groq.
6. Groq returns a reply based on the prompt and the company knowledge.
7. The app appends the reply to the message list and renders it in the UI.
8. If the request fails, the app shows a fallback message with contact details.

---

## Important implementation notes

- The assistant is guided by a carefully crafted system prompt rather than by hard-coded replies.
- The UI uses local React state rather than a backend database.
- The current setup uses a client-side API key, which is convenient but not ideal for production security.
- The markdown renderer makes the assistant replies look richer and more readable than plain text.

## Suggested next improvements

- Move the Groq call behind a serverless proxy to protect the API key.
- Add conversation persistence so chat history remains after refresh.
- Add analytics to track common visitor questions.
- Add a fallback knowledge base for questions outside the current prompt scope.
