export function highlightKeywords(text: string | null | undefined): string {
  if (!text) return "";
  // Zjednoti konce riadkov, aby zvýraznenie fungovalo rovnako po úprave z Windows aj z webu.
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const highlightedLines = lines.map((line) => {
    if (line.trimStart().endsWith(":") || line.trimStart().endsWith("?")) {
      return `<strong>${line}</strong>`;
    }
    return line;
  });
  return highlightedLines.join("\n");
}

// Prejde text riadok po riadku — ak riadok začína ✓, zabalí ho do <li>
// Keď skupina ✓ riadkov skončí, celú skupinu zabalí do <ul>
export function wrapChecklistInUl(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let checklistBuffer: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("✓")) {
      // Riadok patrí do zoznamu — odlož ho
      checklistBuffer.push(`<li>${line.trim()}</li>`);
    } else {
      // Riadok nie je ✓ — ak bol pred ním zoznam, uzavri ho
      if (checklistBuffer.length > 0) {
        result.push(
          `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
        );
        checklistBuffer = [];
      }
      result.push(line);
    }
  }

  // Ak text končí ✓ riadkami, uzavri zoznam na konci
  if (checklistBuffer.length > 0) {
    result.push(
      `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
    );
  }

  return result.join("\n");
}
