"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center mb-6 space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">
            CS Rankings
          </h1>
          <h1 className="text-4xl font-bold tracking-tighter">
            But
          </h1>
          <h1 className="text-4xl font-bold tracking-tighter">
            Better
          </h1>
          <Link
          className={buttonVariants({
            className: "w-[20rem] mt-4",
          })}
            href="/home"
          >
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
