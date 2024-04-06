import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/home" className={buttonVariants({
      })}>
        Log In
      </Link>
    </div>
  );
};

export default Home;
