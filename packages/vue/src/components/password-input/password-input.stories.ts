import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { PasswordInput } from ".";
import { Field } from "../field";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Password Input" };
export default meta;

function eye(open: boolean) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("path", {
        d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z",
      }),
      h("circle", { cx: 12, cy: 12, r: 3 }),
      ...(open ? [] : [h("path", { d: "M4 4l16 16" })]),
    ],
  );
}

function indicator() {
  return h(PasswordInput.Indicator, null, {
    default: () => eye(true),
    fallback: () => eye(false),
  });
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
  render: (args: any) =>
    withState(
      () => () =>
        h(PasswordInput.Root, { disabled: args.disabled }, () => [
          h(PasswordInput.Label, () => args.label),
          h(PasswordInput.Control, () => [
            h(PasswordInput.Input, { placeholder: args.placeholder }),
            h(PasswordInput.VisibilityTrigger, () => indicator()),
          ]),
        ]),
    ),
};

/** The reveal answers to the caller — the eye and the mask only mirror. */
export const ControlledVisibility = {
  render: () =>
    withState(() => {
      const state = reactive({ visible: false });
      return () =>
        h(
          PasswordInput.Root,
          {
            visible: state.visible,
            onVisibilityChange: (e: { visible: boolean }) => (state.visible = e.visible),
          } as any,
          () => [
            h(PasswordInput.Label, () =>
              state.visible ? "Password is visible" : "Password is hidden",
            ),
            h(PasswordInput.Control, () => [
              h(PasswordInput.Input),
              h(PasswordInput.VisibilityTrigger, () => indicator()),
            ]),
          ],
        );
    }),
};

/** The browser is told what kind of field this is: new-password steers
 * every password manager away. */
export const Autocomplete = {
  render: () =>
    h(PasswordInput.Root, { autoComplete: "new-password" } as any, () => [
      h(PasswordInput.Label, () => "Password"),
      h(PasswordInput.Control, () => [
        h(PasswordInput.Input),
        h(PasswordInput.VisibilityTrigger, () => indicator()),
      ]),
    ]),
};

/** An API key is not a password: the managers are dismissed outright. */
export const IgnorePasswordManager = {
  render: () =>
    h(PasswordInput.Root, { ignorePasswordManagers: true } as any, () => [
      h(PasswordInput.Label, () => "API Key"),
      h(PasswordInput.Control, () => [
        h(PasswordInput.Input, { defaultValue: "spd_1234567890" }),
        h(PasswordInput.VisibilityTrigger, () => indicator()),
      ]),
    ]),
};

/** A meter under the field grades the ink as you type — three rungs
 * from weak to strong. */
export const StrengthMeter = {
  render: () =>
    withState(() => {
      const state = reactive({ password: "asdfasdf" });
      const strength = () => strengthOf(state.password);
      return () =>
        h("div", { style: { display: "grid", gap: "0.25rem", justifyItems: "start" } }, [
          h(PasswordInput.Root, null, () => [
            h(PasswordInput.Label, () => "Password"),
            h(PasswordInput.Control, () => [
              h(PasswordInput.Input, {
                value: state.password,
                placeholder: "Enter your password",
                onInput: (e: Event) => (state.password = (e.target as HTMLInputElement).value),
              }),
              h(PasswordInput.VisibilityTrigger, () => indicator()),
            ]),
          ]),
          h("div", { style: meterStyle, "aria-hidden": true }, [
            ...[1, 2, 3].map((rung) =>
              h("span", {
                key: rung,
                style: {
                  width: "3rem",
                  height: "0.25rem",
                  borderRadius: "var(--bs-radius-sm)",
                  background:
                    rung <= strength()
                      ? rung >= 3
                        ? "var(--bs-color-success)"
                        : rung === 2
                          ? "var(--bs-color-warning)"
                          : "var(--bs-color-danger)"
                      : "var(--bs-color-border)",
                  transition: "background var(--bs-duration-fast) var(--bs-ease-default)",
                },
              }),
            ),
            h(
              "span",
              {
                style: {
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                },
              },
              STRENGTH_LABELS[strength()],
            ),
          ]),
        ]);
    }),
};

/** The field judges its own input: under eight characters, the hairline
 * turns cinnabar and says why. */
export const WithValidation = {
  render: () =>
    withState(() => {
      const state = reactive({ password: "" });
      const isValid = () => state.password.length >= 8;
      return () =>
        h(PasswordInput.Root, { invalid: state.password.length > 0 && !isValid() } as any, () => [
          h(PasswordInput.Label, () => "Password (min 8 characters)"),
          h(PasswordInput.Control, () => [
            h(PasswordInput.Input, {
              value: state.password,
              placeholder: "Enter your password",
              onInput: (e: Event) => (state.password = (e.target as HTMLInputElement).value),
            }),
            h(PasswordInput.VisibilityTrigger, () => indicator()),
          ]),
          state.password.length > 0 && !isValid()
            ? h(
                "p",
                { style: { fontSize: "var(--bs-font-size-xs)", color: "var(--bs-color-danger)" } },
                "Password must be at least 8 characters",
              )
            : null,
          isValid()
            ? h(
                "p",
                {
                  style: {
                    fontSize: "var(--bs-font-size-xs)",
                    color: "var(--bs-color-success)",
                  },
                },
                "Password looks good",
              )
            : null,
        ]);
    }),
};

/** Inside a field: helper text under the label, the reveal eye riding
 * the shared anatomy. */
export const WithField = {
  render: () =>
    h(Field.Root, () => [
      h(Field.Label, () => "Password"),
      h(PasswordInput.Root, null, () => [
        h(PasswordInput.Control, () => [
          h(PasswordInput.Input),
          h(PasswordInput.VisibilityTrigger, () => indicator()),
        ]),
      ]),
      h(Field.HelperText, () => "At least 8 characters, one number."),
      h(Field.ErrorText, () => "Password is too short."),
    ]),
};
