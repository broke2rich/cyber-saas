import dns from "dns/promises";

export async function checkEmailSecurity(domain: string) {
  const results = {
    spf: false,
    dkim: false,
    dmarc: false,
  };

  try {
    const txtRecords = await dns.resolveTxt(domain);

    for (const entry of txtRecords) {
      const record = entry.join("").toLowerCase();

      if (record.startsWith("v=spf1")) results.spf = true;
    }

    try {
      const dmarc = await dns.resolveTxt(`_dmarc.${domain}`);
      results.dmarc = dmarc.some((entry) => entry.join("").toLowerCase().includes("v=dmarc"));
    } catch {
      // No DMARC
    }

    try {
      const dkim = await dns.resolveTxt(`default._domainkey.${domain}`);
      results.dkim = dkim.length > 0;
    } catch {
      // No DKIM
    }

  } catch (err) {
    console.error("DNS lookup error:", err);
  }

  return results;
}
