import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { PasswordInput } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Password Input" };
export default meta;

function eye(open: boolean) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx={12} cy={12} r={3} />
      {!open && <path d="M4 4l16 16" />}
    </svg>
  );
}

function indicator() {
  return <PasswordInput.Indicator fallback={eye(false)}>{eye(true)}</PasswordInput.Indicator>;
}

function strengthOf(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0;
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) =>
    r.test(password),
  ).length;
  if (password.length >= 12 && classes >= 3) return 3;
  if (password.length >= 8 && classes >= 2) return 2;
  return 1;
}

const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong"] as const;

const meterStyle = { display: "flex", gap: "0.25rem", marginTop: "0.375rem" };

/** The masked field with its reveal eye — the indicator swaps eye for
 * eye-off in the same seat. */
export const Basic = {
  args: {
    label: "Password",
    placeholder: "Enter a password",
    disabled: false,
  },
  render: (args: any) => (
    <PasswordInput.Root disabled={args.disabled}>
      <PasswordInput.Label>{args.label}</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder={args.placeholder} />
        <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  ),
};

/** The reveal answers to the caller — the eye and the mask only mirror. */
export const ControlledVisibility = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <PasswordInput.Root
        visible={visible}
        onVisibilityChange={(e: { visible: boolean }) => setVisible(e.visible)}
      >
        <PasswordInput.Label>
          {visible ? "Password is visible" : "Password is hidden"}
        </PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input />
          <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.Root>
    );
  },
};

/** The browser is told what kind of field this is: new-password steers
 * every password manager away. */
export const Autocomplete = {
  render: () => (
    <PasswordInput.Root autoComplete="new-password">
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input />
        <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  ),
};

/** An API key is not a password: the managers are dismissed outright. */
export const IgnorePasswordManager = {
  render: () => (
    <PasswordInput.Root ignorePasswordManagers>
      <PasswordInput.Label>API Key</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="spd_1234567890" />
        <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  ),
};

/** A meter under the field grades the ink as you type — three rungs
 * from weak to strong. */
export const StrengthMeter = {
  render: () => {
    const [password, setPassword] = useState("asdfasdf");
    const strength = strengthOf(password);
    return (
      <div style={{ display: "grid", gap: "0.25rem", justifyItems: "start" }}>
        <PasswordInput.Root>
          <PasswordInput.Label>Password</PasswordInput.Label>
          <PasswordInput.Control>
            <PasswordInput.Input
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
          </PasswordInput.Control>
        </PasswordInput.Root>
        <div style={meterStyle} aria-hidden="true">
          {[1, 2, 3].map((rung) => (
            <span
              key={rung}
              style={{
                width: "3rem",
                height: "0.25rem",
                borderRadius: "var(--bs-radius-sm)",
                background:
                  rung <= strength
                    ? rung >= 3
                      ? "var(--bs-color-success)"
                      : rung === 2
                        ? "var(--bs-color-warning)"
                        : "var(--bs-color-danger)"
                    : "var(--bs-color-border)",
                transition: "background var(--bs-duration-fast) var(--bs-ease-default)",
              }}
            />
          ))}
          <span
            style={{
              fontSize: "var(--bs-font-size-xs)",
              color: "var(--bs-color-text-tertiary)",
            }}
          >
            {STRENGTH_LABELS[strength]}
          </span>
        </div>
      </div>
    );
  },
};

/** The field judges its own input: under eight characters, the hairline
 * turns cinnabar and says why. */
export const WithValidation = {
  render: () => {
    const [password, setPassword] = useState("");
    const isValid = password.length >= 8;
    return (
      <PasswordInput.Root invalid={password.length > 0 && !isValid}>
        <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
        {password.length > 0 && !isValid ? (
          <p style={{ fontSize: "var(--bs-font-size-xs)", color: "var(--bs-color-danger)" }}>
            Password must be at least 8 characters
          </p>
        ) : null}
        {isValid ? (
          <p
            style={{
              fontSize: "var(--bs-font-size-xs)",
              color: "var(--bs-color-success)",
            }}
          >
            Password looks good
          </p>
        ) : null}
      </PasswordInput.Root>
    );
  },
};

/** Inside a field: helper text under the label, the reveal eye riding
 * the shared anatomy. */
export const WithField = {
  render: () => (
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <PasswordInput.Root>
        <PasswordInput.Control>
          <PasswordInput.Input />
          <PasswordInput.VisibilityTrigger>{indicator()}</PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.Root>
      <Field.HelperText>At least 8 characters, one number.</Field.HelperText>
      <Field.ErrorText>Password is too short.</Field.ErrorText>
    </Field.Root>
  ),
};
