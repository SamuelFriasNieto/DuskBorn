import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewsletterForm from "./NewsletterForm";

const Newsletter = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-crimson-bright ">
        Subscribe now & get 20% off
      </p>
      <p className="text-broken-white mt-3 px-10">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
        aperiam doloremque odio sunt voluptatum voluptatem, velit expedita ullam
        sit ratione doloribus maiores officia harum, ut dolorem tenetur eum quod
        deserunt.
      </p>
      <NewsletterForm />
    </div>
  );
};

export default Newsletter;
