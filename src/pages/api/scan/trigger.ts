import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { runRemoteScan } from "../../../lib/scanner/remoteScan";
import { parseNucleiResults } from "../../../utils/parseNucleiResults";
import { checkEmailSecurity } from "../../../utils/checkEmailSecurity";
// import { explainScan } from "../../../utils/explainScan"; // GPT - enable when ready

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) return res.status(401).json({ error: "Unauthorized" });

  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: "Missing domain" });

  try {
    // 1. Run scan
    const rawJSON = await runRemoteScan({ domain });
    const parsed = parseNucleiResults(rawJSON);

    // 2. Email security check
    const emailSecurity = await checkEmailSecurity(domain);

    // 3. (Optional) GPT explanation (disabled by default)
    // const summary = await explainScan(parsed);

    // 4. Get user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    // 5. Store in DB
    await prisma.scan.create({
      data: {
        domain,
        result: JSON.parse(JSON.stringify({
          vulnerabilities: parsed,
          emailSecurity,
        })),
        userId: user.id,
      },
    });
    

    // 6. Return to UI
    res.status(200).json({
      success: true,
      results: parsed,
      emailSecurity,
      // summary, // return if GPT enabled
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Failed to run scan" });
  }
}
