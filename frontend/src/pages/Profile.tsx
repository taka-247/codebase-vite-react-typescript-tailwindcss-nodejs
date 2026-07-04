import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shared } from "@app/shared";
import PageTitle from "../components/ui/PageTitle";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";
import { useConfirm } from "../hooks/useConfirm";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

type FormData = z.infer<typeof Shared.validation.profileSchema>;

export default function Profile() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const session = useAuthStore((state) => state.session);
  const updateEmail = useAuthStore((state) => state.updateEmail);
  const addToast = useToastStore((state) => state.addToast);

  const email = session?.user.email ?? "";
  // Supabase sets new_email while an email change is awaiting confirmation.
  const pendingEmail = session?.user.new_email;

  const { confirm, confirmationDialog } = useConfirm();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(Shared.validation.profileSchema),
    // `values` keeps the form in sync once the async data arrives
    values: {
      display_name: profile?.display_name ?? "",
      email,
      role: profile?.role ?? "",
      created_at: profile?.created_at ?? "",
    },
  });

  // True while the typed email differs from the current one (change not submitted yet).
  const emailWillChange = watch("email") !== email;

  async function onSubmit(data: FormData) {
    // Interrupt here and wait for the user's Yes/No before proceeding.
    const ok = await confirm({
      title: "Save changes?",
      message: "Are you sure to update your profile?",
      ...(data.email !== email && {warning: 'You need to confirm for email update. Please confirm in the confirmation email.'})
    });
    if (!ok) return;

    try {
      // display_name → profiles table (mutation invalidates the profile query on success)
      if (data.display_name !== (profile?.display_name ?? "")) {
        await updateProfile.mutateAsync({ display_name: data.display_name });
      }

      // email → auth (only if changed); Supabase emails a confirmation link
      let emailChanged = false;
      if (data.email !== email) {
        await updateEmail(data.email);
        emailChanged = true;
      }

      addToast(
        emailChanged
          ? "Saved. Check your inbox to confirm the new email."
          : "Profile updated.",
        "success"
      );
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Update failed", "error");
    }
  }

  if (isLoading) return <p className="text-text">Loading…</p>;

  return (
    <>
      <PageTitle>Profile</PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md"
      >
        <Field label="Display name" error={errors.display_name?.message}>
          <input type="text" {...register("display_name")} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register("email")} />
        </Field>
        {emailWillChange && !errors.email && (
          <p className="-mt-2 text-sm text-accent">
            You need to confirm for email update. Please confirm in the confirmation email.
          </p>
        )}
        {/* Note: Edge Function is needed for cancellation against email update request as Supabase client have a feature to initiate email change but doesn't have for cancellation, i.e. need backend function */}
        {pendingEmail && (
          <p className="-mt-2 text-sm text-accent">
            ⏳ Change to <strong>{pendingEmail}</strong> pending — confirm via the emails we sent.
          </p>
        )}

        <Field label="Role" note="* read-only">
          <input type="text" disabled {...register("role")} />
        </Field>

        <Field label="Created at" note="* read-only">
          <input type="text" disabled {...register("created_at")} />
        </Field>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>

      {confirmationDialog}
    </>
  );
}
