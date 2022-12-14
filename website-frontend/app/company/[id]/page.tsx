import { IconHome } from "@tabler/icons";
import Link from "next/link";
import { Suspense } from "react";
import DeleteInformation from "./deleteMockInfo";
import Loading from "./loading";
import RefreshButton from "./refreshButton";
import UploadInformation from "./uploadMockInfo";

const apiLink = "https://fall22-bt-productivity.namanarora.studio";

type companyInfo = {
  name: string;
  ids: any[];
};

async function getData(id: string | string[] | undefined) {
  const res = await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`
  );
  const data = await res.json();
  return data as companyInfo;
}

async function CompanyPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const promises = await Promise.all(
    data["ids"].map((id: string) =>
      fetch(`${apiLink}/api/collections/userInformation/records/${id}`)
    )
  );
  const userInfoArr = await Promise.all(promises.map((p: any) => p.json()));
  const info = userInfoArr.map((item: any, index: number) => {
    return (
      <tr key={index} className="hover">
        <th className="text-center border-b-white font-arimo font-bold text-lg">
          {index + 1}
        </th>
        <td className="text-left text-lg border-b-white font-arimo">
          {item.firstName} {item.lastName}
        </td>
        <td className="text-left border-b-white font-arimo">
          <a className="underline" href={`mailto:${item.email}`}>
            {item.email.toLowerCase()} &#8594;
          </a>
        </td>
        <td className="text-left border-b-white font-arimo">
          <a
            href={`${apiLink}/api/files/${item["@collectionId"]}/${item.id}/${item.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-s font-arimo"
          >
            {item.firstName}'s Resume &#8599;
          </a>
        </td>
      </tr>
    );
  });

  return (
    <>
      <title>Candidate Panel</title>
      <Suspense fallback={<Loading />}>
        <Link
          href={"/"}
          className="btn btn-circle btn-ghost fixed top-4 left-4"
        >
          <div className="tooltip tooltip-right" data-tip="Return Home">
            <IconHome stroke={2} size={28} />
          </div>
        </Link>
        <RefreshButton />
        <div className="mx-16 my-8">
          <h1 className="text-5xl text-center font-bold font-libre">
            Candidates interested in <span className="italic">{data.name}</span>
          </h1>
          <div className="grid place-items-center">
            <table className="table table-compact w-5/6 mt-10 border border-1 rounded-md">
              <thead className="border border-white">
                <tr className="border-b-white">
                  <th className="border-b-white font-arimo"></th>
                  <th className="text-left text-lg border-b-white font-arimo">
                    Name
                  </th>
                  <th className="text-left text-lg border-b-white font-arimo">
                    Email
                  </th>
                  <th className="text-left text-lg border-b-white font-arimo">
                    Resume
                  </th>
                </tr>
              </thead>
              <tbody>{info}</tbody>
            </table>
          </div>
          <div className="grid place-items-center mt-4">
            <div>
              <UploadInformation id={params.id} />
              <DeleteInformation id={params.id} />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default CompanyPage;
