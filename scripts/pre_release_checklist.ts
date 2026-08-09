import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Automatically parse and load .env file for CLI runner
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      if (key && vals.length > 0) {
        const val = vals.join("=").replace(/^["']|["']$/g, "");
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  }
}

async function runPreReleaseChecklist() {
  console.log("=========================================================================");
  console.log("=== PITRAYA RITUALS — PRE-RELEASE AUTOMATED CHECKLIST RUNNER ===");
  console.log("=========================================================================\n");

  const cwd = process.cwd();

  // 1. TYPESCRIPT TYPE CHECK
  console.log("[Step 1/3] Running TypeScript Compilation Check (npx tsc --noEmit)...");
  try {
    execSync("npx tsc --noEmit", { cwd, stdio: "inherit" });
    console.log("  ✓ [PASS] Zero TypeScript compilation errors\n");
  } catch (err) {
    console.error("  ❌ [FAIL] TypeScript compilation check failed!");
    process.exit(1);
  }

  // 2. ENVIRONMENT CONFIGURATION CHECK
  console.log("[Step 2/3] Running Environment Variable Validation Check...");
  const requiredEnvs = ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXT_PUBLIC_SITE_URL"];
  const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);

  if (missingEnvs.length > 0) {
    console.error(`  ❌ [FAIL] Missing required environment variables: ${missingEnvs.join(", ")}`);
    process.exit(1);
  }
  console.log(`  ✓ [PASS] All required environment variables present (${requiredEnvs.length}/${requiredEnvs.length})\n`);

  // 3. UNIFIED AUTOMATED TEST SUITE RUN
  console.log("[Step 3/3] Running Phase 9 Unified Automated Test Engine...");
  try {
    const suitePath = path.join(cwd, "scratch", "phase9_automated_testing_suite.ts");
    execSync(`npx tsx "${suitePath}"`, { cwd, stdio: "inherit", env: process.env });
  } catch (err) {
    console.error("  ❌ [FAIL] Automated test suite failed!");
    process.exit(1);
  }

  console.log("\n=========================================================================");
  console.log("=== PRE-RELEASE CHECKLIST COMPLETE: READY FOR PRODUCTION DEPLOYMENT! ===");
  console.log("=========================================================================");
}

runPreReleaseChecklist();
