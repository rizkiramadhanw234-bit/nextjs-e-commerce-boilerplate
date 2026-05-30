"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { updateUser } from "@/types/userType";
import { useUpdateUser } from "@/hooks/userQuery";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function UserModal() {
  const { user } = useAuthStore();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [form, setForm] = useState<updateUser>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.username,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (user) {
      await updateUser({ id: user.id, data: form });
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger
            render={<Button variant="outline">Open Dialog</Button>}
          />
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={user?.firstName}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={user?.lastName}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue={user?.username}
                  onChange={handleChange}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit" onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
