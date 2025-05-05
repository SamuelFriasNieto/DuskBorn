import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const newsletterFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
type NewsletterForm = z.infer<typeof newsletterFormSchema>;

const NewsletterForm = () => {
  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: NewsletterForm) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="w-3/4 sm:-w-1/2 flex items-start gap-3 mx-auto my-6   p-3"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-3">
              <FormControl>
                <Input
                  className="w-full sm:flex-1 "
                  // type="email"
                  placeholder="Email"
                  // required
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-crimson-dark flex-1 border-2 border-crimson-dark hover:bg-midnight hover:text-crimson-bright transition-all shadow-none"
        >
          Subscribe
        </Button>
      </form>
    </Form>
  );
};

export default NewsletterForm;
