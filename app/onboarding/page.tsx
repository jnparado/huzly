"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type StepKey = "personal" | "facility" | "billing";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type FacilityInfo = {
  businessName: string;
  industry: string;
  facilityType: string;
  country: string;
  city: string;
  address: string;
};

type BillingInfo = {
  bankName: string;
  bankAccountNumber: string;
  bankSwiftCode: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-zinc-700">{label}</div>
      {children}
      {hint ? <div className="mt-1 text-xs text-zinc-500">{hint}</div> : null}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cx(
        "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
        "focus:border-[#2F6FDB] focus:ring-2 focus:ring-[#2F6FDB]/20",
        "disabled:bg-zinc-100",
        className
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={cx(
        "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
        "focus:border-[#2F6FDB] focus:ring-2 focus:ring-[#2F6FDB]/20",
        className
      )}
    />
  );
}

function validatePersonal(p: PersonalInfo) {
  if (!p.firstName.trim()) return "First name is required.";
  if (!p.lastName.trim()) return "Last name is required.";
  if (!p.email.trim()) return "Email is required.";
  if (!p.phone.trim()) return "Phone is required.";
  return null;
}

function validateFacility(f: FacilityInfo) {
  if (!f.businessName.trim()) return "Business name is required.";
  if (!f.industry.trim()) return "Industry is required.";
  if (!f.facilityType.trim()) return "Facility type is required.";
  if (!f.country.trim()) return "Country is required.";
  if (!f.city.trim()) return "City is required.";
  if (!f.address.trim()) return "Address is required.";
  return null;
}

function validateBilling(b: BillingInfo) {
  if (!b.bankName.trim()) return "Bank name is required.";
  if (!b.bankAccountNumber.trim()) return "Bank account number is required.";
  if (!b.bankSwiftCode.trim()) return "SWIFT code is required.";
  return null;
}

export default function OnboardingPage() {
  const router = useRouter();
  const steps = useMemo(
    () =>
      [
        { key: "personal" as const, label: "Personal Info" },
        { key: "facility" as const, label: "Business Info" },
        { key: "billing" as const, label: "Billing Info" },
      ] as const,
    []
  );

  const [step, setStep] = useState<StepKey>("personal");
  const [error, setError] = useState<string | null>(null);

  const [personal, setPersonal] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [facility, setFacility] = useState<FacilityInfo>({
    businessName: "",
    industry: "",
    facilityType: "",
    country: "",
    city: "",
    address: "",
  });

  const [billing, setBilling] = useState<BillingInfo>({
    bankName: "",
    bankAccountNumber: "",
    bankSwiftCode: "",
  });

  function goNext() {
    setError(null);
    if (step === "personal") {
      const e = validatePersonal(personal);
      if (e) return setError(e);
      setStep("facility");
      return;
    }

    if (step === "facility") {
      const e = validateFacility(facility);
      if (e) return setError(e);
      setStep("billing");
      return;
    }

    const e = validateBilling(billing);
    if (e) return setError(e);

    // For now: treat onboarding as complete and go to the success screen.
    router.push("/dashboard/account-created");
  }

  function goBack() {
    setError(null);
    if (step === "facility") setStep("personal");
    if (step === "billing") setStep("facility");
  }

  return (
    <div className="min-h-full flex flex-1 items-stretch bg-[#103B74]">
      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-4 text-white/90">
            <div className="text-sm font-semibold tracking-wide">
              Onboarding &amp; Facility Setup
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="border-b border-zinc-100 px-6 pt-5 pb-4">
              <div className="text-xs font-semibold text-zinc-500">
                Step{" "}
                {step === "personal" ? "1" : step === "facility" ? "2" : "3"} of
                3
              </div>
              <div className="mt-2 flex items-center gap-3">
                {steps.map((s) => {
                  const isActive = s.key === step;
                  const isDone =
                    (step === "facility" && s.key === "personal") ||
                    (step === "billing" && (s.key === "personal" || s.key === "facility"));
                  return (
                    <div key={s.key} className="flex items-center gap-3">
                      <div
                        className={cx(
                          "h-7 w-7 rounded-full grid place-items-center text-xs font-bold",
                          isActive
                            ? "bg-[#2F6FDB] text-white"
                            : isDone
                              ? "bg-[#E8F0FF] text-[#2F6FDB]"
                              : "bg-zinc-100 text-zinc-500"
                        )}
                      >
                        {s.key === "personal" ? "1" : s.key === "facility" ? "2" : "3"}
                      </div>
                      <div
                        className={cx(
                          "text-sm font-semibold",
                          isActive ? "text-zinc-900" : "text-zinc-500"
                        )}
                      >
                        {s.label}
                      </div>
                      {s.key !== "billing" ? (
                        <div className="h-px w-10 bg-zinc-200" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 py-6">
              {step === "personal" ? (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    Step 1. Personal Info
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="First name">
                      <TextInput
                        value={personal.firstName}
                        onChange={(e) =>
                          setPersonal((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="First name"
                      />
                    </Field>
                    <Field label="Last name">
                      <TextInput
                        value={personal.lastName}
                        onChange={(e) =>
                          setPersonal((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Last name"
                      />
                    </Field>
                    <Field label="Email">
                      <TextInput
                        value={personal.email}
                        onChange={(e) =>
                          setPersonal((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                      />
                    </Field>
                    <Field label="Phone">
                      <TextInput
                        value={personal.phone}
                        onChange={(e) =>
                          setPersonal((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+63 9xx xxx xxxx"
                      />
                    </Field>
                  </div>
                </div>
              ) : step === "facility" ? (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    Step 2. Business Info
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Business name">
                      <TextInput
                        value={facility.businessName}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            businessName: e.target.value,
                          }))
                        }
                        placeholder="Company name"
                      />
                    </Field>
                    <Field label="Industry type">
                      <Select
                        value={facility.industry}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            industry: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select…</option>
                        <option value="construction">Construction</option>
                        <option value="facility_management">
                          Facility management
                        </option>
                        <option value="real_estate">Real estate</option>
                        <option value="other">Other</option>
                      </Select>
                    </Field>
                    <Field label="Facility type">
                      <Select
                        value={facility.facilityType}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            facilityType: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select…</option>
                        <option value="office">Office</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="retail">Retail</option>
                        <option value="residential">Residential</option>
                        <option value="other">Other</option>
                      </Select>
                    </Field>
                    <Field label="Country">
                      <TextInput
                        value={facility.country}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            country: e.target.value,
                          }))
                        }
                        placeholder="Country"
                      />
                    </Field>
                    <Field label="City">
                      <TextInput
                        value={facility.city}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            city: e.target.value,
                          }))
                        }
                        placeholder="City"
                      />
                    </Field>
                    <Field label="Address" hint="Street, building, unit, etc.">
                      <TextInput
                        value={facility.address}
                        onChange={(e) =>
                          setFacility((f) => ({
                            ...f,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Address"
                        className="sm:col-span-2"
                      />
                    </Field>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    Step 3. Billing Info
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Bank account">
                      <TextInput
                        value={billing.bankAccountNumber}
                        onChange={(e) =>
                          setBilling((b) => ({
                            ...b,
                            bankAccountNumber: e.target.value,
                          }))
                        }
                        placeholder="XXXX XXXX XXXX"
                      />
                    </Field>
                    <Field label="Bank name">
                      <TextInput
                        value={billing.bankName}
                        onChange={(e) =>
                          setBilling((b) => ({
                            ...b,
                            bankName: e.target.value,
                          }))
                        }
                        placeholder="Bank name"
                      />
                    </Field>
                    <Field label="SWIFT code" hint="For international transfers">
                      <TextInput
                        value={billing.bankSwiftCode}
                        onChange={(e) =>
                          setBilling((b) => ({
                            ...b,
                            bankSwiftCode: e.target.value,
                          }))
                        }
                        placeholder="ABCDEF12"
                        className="sm:col-span-2"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {error ? (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-6 py-4">
              <button
                onClick={goBack}
                disabled={step === "personal"}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 disabled:opacity-40"
              >
                Back
              </button>

              <button
                onClick={goNext}
                className="rounded-xl bg-[#2F6FDB] px-4 py-2 text-sm font-semibold text-white"
              >
                {step === "personal"
                  ? "Save & Continue"
                  : step === "facility"
                    ? "Save & Continue"
                    : "Save & Finish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

