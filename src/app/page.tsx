"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/home" className={buttonVariants({})}>
        Go to Main Page
      </Link>
    </div>
  );
};

export default Home;
