// src/utils/parseNucleiResults.ts

export interface ParsedVuln {
    templateID: string;
    info: {
      name: string;
      severity: string;
      description?: string;
      reference?: string[];
    };
    host: string;
    matchedAt: string;
    timestamp: string;
  }
  
  export function parseNucleiResults(rawJson: string): ParsedVuln[] {
    const lines = rawJson.trim().split("\n");
    const results: ParsedVuln[] = [];
  
    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        results.push({
          templateID: json.templateID,
          info: {
            name: json.info.name,
            severity: json.info.severity,
            description: json.info.description,
            reference: json.info.reference,
          },
          host: json.host,
          matchedAt: json.matched,
          timestamp: json.timestamp,
        });
      } catch (err) {
        console.warn("Failed to parse line:", line);
      }
    }
  
    return results;
  }
  