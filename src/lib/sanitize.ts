import DOMPurify from "dompurify";

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Use this whenever rendering user-generated HTML content.
 * 
 * @param dirty - The potentially unsafe HTML string
 * @param options - Optional DOMPurify configuration
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (dirty: string | null | undefined): string => {
  if (!dirty) return "";
  
  // Configure DOMPurify to be strict by default
  return DOMPurify.sanitize(dirty, {
    // Allow safe tags for formatted content
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u", "s",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "a", "blockquote", "pre", "code",
      "span", "div"
    ],
    // Allow safe attributes
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
    // Force all links to open in new tab safely
    ADD_ATTR: ["target", "rel"],
    // Prevent dangerous protocols
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });
};

/**
 * Formats plain text content for safe HTML display.
 * Converts newlines to <br/> and escapes HTML entities.
 * 
 * @param text - Plain text content
 * @returns Safe HTML string with line breaks preserved
 */
export const formatTextToHtml = (text: string | null | undefined): string => {
  if (!text) return "";
  
  // Escape HTML entities first, then convert newlines
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  
  return escaped.replace(/\n/g, "<br/>");
};
