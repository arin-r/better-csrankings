"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  return (
    <div>
      <Link href="/home" className={buttonVariants({
      })}>
        Log In
      </Link>
      <Button onClick={() => {
        axios.get("/api/ranking-data").then((res) => {
          let {data} = res;
          console.log("data = ", data);
              // If data is an object with nested properties, stringify it
    console.log("data =", JSON.parse(data));

        });
      }}>
        Test API route
        </Button>
    </div>
  );
};

export default Home;
