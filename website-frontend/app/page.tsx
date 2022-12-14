import { IconMenu2 } from "@tabler/icons";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <title>CareersGO</title>

      <Link
        href={"/companies"}
        className="btn btn-circle btn-ghost fixed top-4 right-4"
      >
        <div className="tooltip tooltip-left" data-tip="All Companies">
          <IconMenu2 size={28} />
        </div>
      </Link>

      <div className="p-8">
        <h1 className="text-6xl text-center font-libre font-bold">
          CareersGO Admin Panel
        </h1>
        <div className="grid place-items-center mt-40">
          <Link
            href={"/company/9r8qr69qsdsh2vs"}
            className="font-arimo font-bold text-xl btn btn-outline btn-info btn-lg btn-wide my-2"
          >
            Microsoft
          </Link>
          <Link
            href={"/company/6b3vbgtll1tzh1a"}
            className="font-arimo font-bold text-xl btn btn-outline btn-info btn-lg btn-wide my-2"
          >
            Nintendo
          </Link>
          <Link
            href={"/company/hwkwxepimftwegd"}
            className="font-arimo font-bold text-xl btn btn-outline btn-info btn-lg btn-wide my-2"
          >
            Sony
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
